import { Component, Project } from 'projen/lib';
import {
  GitHub,
  GitHubProject,
  GitHubProjectOptions,
  GithubWorkflow,
} from 'projen/lib/github';
import { prerequisitesJob } from './jobs/PrerequisitesJob';

export interface RunAcceptanceTestsWorkflowOptions {
  readonly organization?: string;
  readonly provider: string;
  readonly majorVersion?: string;
  readonly noSchema?: boolean;
  readonly registryDocs?: boolean;
  readonly enableConfigurationCheck?: boolean;
  readonly actionVersions?: {
    readonly freeDiskSpace?: string; // e.g. dflook/ free-disk-space-action@v1
    readonly checkout?: string; // actions/checkout@v4
    readonly providerVersion?: string; // pulumi/provider-version-action@v1
    readonly codecov?: string; // codecov/codecov-action@v4
    readonly prComment?: string; // example: marocchino/sticky-pull-request-comment@v2
  };

  /**
   * Environment variables for the job
   */
  readonly env?: Record<string, string>;
  readonly runner?: {
    /**
     * Runner to use for the prerequisites job
     * @default 'ubuntu-latest'
     */
    readonly prerequisitesRunner?: string;
  };
  /**
   * Whether or not to run the free disk space action before the build step
   * @default false
   */
  readonly freeDiskSpaceBeforeBuild?: boolean;

  /**
   * Whether or not to checkout submodules
   * @default false
   */
  readonly checkoutSubmodules?: boolean;
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

    this.workflow = new GithubWorkflow(github, 'run-acceptance-tests');
    this.workflow.on({
      pullRequest: {},
      repositoryDispatch: {
        types: ['run-acceptance-tests-command'],
      },
    });

    const prereqJob = prerequisitesJob({
      organization: options.organization,
      provider: options.provider,
      majorVersion: options.majorVersion,
      noSchema: options.noSchema,
      registryDocs: options.registryDocs,
      enableConfigurationCheck: options.enableConfigurationCheck,
      actionVersions: options.actionVersions,
      env: options.env,
      runner: options.runner,
      freeDiskSpaceBeforeBuild: options.freeDiskSpaceBeforeBuild,
      checkoutSubmodules: options.checkoutSubmodules,
    });

    this.workflow.addJobs({ prerequisites: prereqJob });
  }
}

export class ProviderProject extends GitHubProject {
  constructor(options: GitHubProjectOptions) {
    super(options);
  }
}
