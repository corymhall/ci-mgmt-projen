import { Component, Project } from 'projen/lib';
import { CheckoutOptions as BaseCheckoutOptions, GitHub, GitHubProject, GitHubProjectOptions, GithubWorkflow, workflows } from 'projen/lib/github';
import { JobStep } from 'projen/lib/github/workflows-model';
import { removeNullOrUndefinedProperties } from 'projen/lib/util/object';


export interface RunAcceptanceTestsWorkflowOptions {
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

export interface CheckoutOptions extends BaseCheckoutOptions {
  submodules?: boolean;
}

export class ProviderWorkflowSteps {
  public static checkout(options: CheckoutOptions = {}): JobStep {
    const checkoutWith = removeNullOrUndefinedProperties({
      'submodules': options.submodules,
      'persist-credentials': false,
    });
    return {
      name: 'Checkout Repo',
      uses: 'actions/checkout@v4',
      with: Object.keys(checkoutWith).length > 0 ? checkoutWith : undefined,
    };
  }

  public static freeDiskSpace(): JobStep {
    return {
      name: 'Free Disk Space (Ubuntu)',
      uses: '',
      with: {
        with: {
          'tool-cache': false,
          'swap-storage': false,
          'dotnet': false,
        },

      },
    };
  }

}
export class RunAcceptanceTestsWorkflow extends Component {
  private readonly github: GitHub;
  private readonly workflow: GithubWorkflow;
  constructor(scope: Project, name: string, options: RunAcceptanceTestsWorkflowOptions) {
    super(scope, name);
    const github = GitHub.of(this.project.root);
    if (!github) {
      throw new Error('RunAcceptanceTestsWorkflow is currently only supported for GitHub projects');
    }

    this.github = github;
    this.workflow = new GithubWorkflow(github, 'run-acceptance-tests');
    this.workflow.on({
      pullRequest: { },
      repositoryDispatch: {
        types: ['run-acceptance-tests-command'],
      },
    });

    const prereqJob: workflows.Job = {
      if: "github.event_name == 'repository_dispatch' || github.event.pull_request.head.repo.full_name == github.repository",
      runsOn: [options.runner?.prerequisitesRunner ?? 'ubuntu-latest'],
      outputs: {
        version: {
          outputName: 'version',
          stepId: 'provider-version',
        },
      },
      steps: [
        ...(options.freeDiskSpaceBeforeBuild ? [
          ProviderWorkflowSteps.freeDiskSpace(),
        ]: []),
        ProviderWorkflowSteps.checkout({ submodules: options.checkoutSubmodules }),
      ],
      env: {
        PR_COMMIT_SHA: '${{ github.event.client_payload.pull_request.head.sha }}',
        ...options.env,
      },
      concurrency: {
        'group': '${{ github.workflow }}-${{ github.ref }}',
        'cancel-in-progress': true,
      },
      permissions: {
        contents: workflows.JobPermission.READ,
        idToken: workflows.JobPermission.WRITE,
      },
    };

  }
}


export class ProviderProject extends GitHubProject {
  constructor(options: GitHubProjectOptions) {
    super(options);
  }
}
