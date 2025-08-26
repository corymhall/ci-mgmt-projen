import { Component, Project } from 'projen/lib';
import { GitHub, GithubWorkflow } from 'projen/lib/github';
import { ProviderWorkflowOptions } from './common';
import { BuildProviderJob } from './jobs/build-provider-job';
import { BuildSdkJob } from './jobs/build-sdk-job';
import {
  PrerequisitesJob,
  PrerequisitesJobOptions,
} from './jobs/prerequisites-job';
import { TestJob, TestJobOptions } from './jobs/test-job';

export interface RunAcceptanceTestsWorkflowOptions
  extends ProviderWorkflowOptions {
  /**
   * organization is the name of the Github organization the repository lives in.
   *
   * @default pulumi
   */
  readonly organization?: string;

  /**
   * major version of the current provider - used in make files
   * This should always be set by all providers as this is key to go module paths.
   *
   * @default 2
   */
  readonly majorVersion?: number;

  /**
   * Options for the test job
   */
  readonly testOptions?: TestJobOptions;

  /**
   * Options for the prereq job
   */
  readonly prerequisiteJobOptions?: PrerequisitesJobOptions;

  readonly enableConfigurationCheck?: boolean;

  /**
   * Environment variables for the job
   */
  readonly env?: Record<string, string>;
  /**
   * Whether or not to run the free disk space action before the build step
   *
   * @default false
   */
  readonly freeDiskSpaceBeforeBuild?: boolean;
}

export class RunAcceptanceTestsWorkflow extends Component {
  private readonly workflow: GithubWorkflow;
  constructor(
    scope: Project,
    name: string,
    options: RunAcceptanceTestsWorkflowOptions,
  ) {
    super(scope, name);
    const github = GitHub.of(this.project.root)!;
    if (!github) {
      throw new Error(
        'RunAcceptanceTestsWorkflow is currently only supported for GitHub projects',
      );
    }
    const languages = options.languages ?? [
      'nodejs',
      'python',
      'dotnet',
      'go',
      'java',
    ];
    const majorVersion = options.majorVersion ?? 2;
    const organization = options.organization ?? 'pulumi';

    this.workflow = new GithubWorkflow(github, 'run-acceptance-tests2');
    this.workflow.on({
      pullRequest: {},
      repositoryDispatch: {
        types: ['run-acceptance-tests-command'],
      },
    });

    const prerequisites = PrerequisitesJob.render({
      organization: organization,
      provider: options.provider,
      majorVersion: majorVersion,
      noSchema: options.noSchema,
      env: options.env,
      freeDiskSpaceBeforeBuild: options.freeDiskSpaceBeforeBuild,
      checkoutSubmodules: options.checkoutSubmodules,
      ...options.prerequisiteJobOptions,
    });

    this.workflow.addJob(PrerequisitesJob.id, prerequisites);

    this.workflow.addJob(
      BuildProviderJob.id,
      BuildProviderJob.render({
        provider: options.provider,
        modulePath: 'provider',
        providerVersion: PrerequisitesJob.outputs().version,
        noSchema: options.noSchema,
        checkoutSubmodules: options.checkoutSubmodules,
        needs: [PrerequisitesJob.id],
      }),
    );

    if (!options.noSchema) {
      this.workflow.addJob(
        BuildSdkJob.id,
        BuildSdkJob.render({
          needs: [PrerequisitesJob.id],
          providerVersion: PrerequisitesJob.outputs().version,
          env: options.env,
          provider: options.provider,
          checkoutSubmodules: options.checkoutSubmodules,
          freeDiskSpaceBeforeBuild: options.freeDiskSpaceBeforeBuild,
        }),
      );
    }

    this.workflow.addJob(
      TestJob.id,
      TestJob.render({
        provider: options.provider,
        needs: [
          PrerequisitesJob.id,
          BuildProviderJob.id,
          ...(!options.noSchema ? [BuildSdkJob.id] : []),
        ],
        checkoutSubmodules: options.checkoutSubmodules,
        env: options.env,
        freeDiskSpaceBeforeBuild: options.freeDiskSpaceBeforeBuild,
        languages,
        noSchema: options.noSchema,
        ...options.testOptions,
      }),
    );
  }
}

export interface ProviderProjectOptions {
  readonly name: string;
  readonly acceptanceTestsWorkflowOptions: RunAcceptanceTestsWorkflowOptions;
}

export class ProviderProject extends Project {
  constructor(options: ProviderProjectOptions) {
    super({
      name: options.name,
    });
    new GitHub(this, {
      mergify: false,
      pullRequestLint: false,
    });
    new RunAcceptanceTestsWorkflow(
      this,
      'run-acceptance-tests',
      options.acceptanceTestsWorkflowOptions,
    );
  }
}
