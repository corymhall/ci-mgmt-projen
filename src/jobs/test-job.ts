import { workflows } from 'projen/lib/github';
import { JobMatrix, JobStep } from 'projen/lib/github/workflows-model';
import { ProviderActions } from '../provider-actions';
import { ProviderWorkflowSteps } from '../provider-steps';
import { JobOptionsBase } from './job';
import { ProviderWorkflowOptions } from '../common';

export interface TestJobOptions {
  /**
   * How many shared to execute integration tests with. If omitted, shard behavior defaults to language-based sharding.
   *
   * @default language based sharding
   */
  readonly shards?: number;
  /**
   * Run e2e tests using the examples and test suite in the pulumi/examples repo.
   *
   * @default false
   */
  readonly testPulumiExamples?: boolean;
  readonly testFolder?: string;

  /**
   * Run e2e tests in the provider as well as in the examples directory
   *
   * @default false
   */
  readonly integrationTestProvider?: boolean;

  /**
   * Enable logging into the GCP registry before running tests in CI job
   *
   * @default false
   */
  readonly gcpRegistry?: boolean;

  /**
   * Execute a script before running tests in CI job
   *
   * @default no setup script run
   */
  readonly setupScript?: string;

  /**
   * Configure AWS credentials before running tests in CI job
   *
   * @default false
   */
  readonly aws?: boolean;

  /**
   * Authenticate with GCP before running tests in CI job
   *
   * @default false
   */
  readonly gcp?: boolean;

  /**
   * Run testing/docker-compose.yml up before running tests in CI job
   * @default false
   */
  readonly docker?: boolean;
}
export interface TestJobConfig
  extends JobOptionsBase,
    TestJobOptions,
    ProviderWorkflowOptions {
  /**
   * Set to true to clear disk space before running prerequisites workflow.
   * This is used for larger providers which sometimes run out of disk space during builds.
   *
   * @default false
   */
  readonly freeDiskSpaceBeforeBuild?: boolean;
}

export class TestJob {
  static id = 'test';

  static render(options: TestJobConfig): workflows.Job {
    const steps: JobStep[] = [
      ProviderWorkflowSteps.checkout({}),
      ...ProviderActions.downloadPrerequisites(options.provider),
      { name: 'Run tests', run: 'make test_all' },
    ];
    if (options.freeDiskSpaceBeforeBuild) {
      steps.push(ProviderWorkflowSteps.freeDiskSpace());
    }
    steps.push(
      ProviderWorkflowSteps.checkout({
        submodules: options.checkoutSubmodules,
        ref: '${{ env.PR_COMMIT_SHA }}',
      }),
      {
        name: 'Checkout p/examples',
        if: !options.shards
          ? "matrix.testTarget == 'pulumiExamples'"
          : undefined,
        uses: 'actions/checkout@v4',
        with: {
          repository: 'pulumi/examples',
          path: 'p-examples',
        },
      },

      ...ProviderActions.setupTools({
        tools: !options.shards
          ? ['pulumicli', 'pulumictl', '${{ matrix.language }}']
          : undefined,
      }),
      {
        name: 'Prepare local workspace',
        run: 'make prepare_local_workspace',
        env: { GITHUB_TOKEN: '${{ secrets.GITHUB_TOKEN }}' },
      },
      ...ProviderActions.downloadProvider(options.provider),
    );

    if (!options.shards) {
      steps.push(...ProviderActions.downloadSdk('${{ matrix.language }}'), {
        name: 'Restore makefile progress',
        run: 'make --touch provider schema build_${{ matrix.language }}',
      });
    }

    if (options.shards && !options.noSchema) {
      const languages = options.languages ?? [
        'nodejs',
        'python',
        'go',
        'java',
        'dotnet',
      ];

      steps.push(
        ...languages.flatMap((language) =>
          ProviderActions.downloadSdk(language),
        ),
        {
          name: 'Restore makefile progress',
          run: 'make --touch provider schema build_sdks',
        },
      );
    }

    steps.push(ProviderWorkflowSteps.updatePath());

    if (!options.noSchema) {
      steps.push({
        name: 'Install Python deps',
        if: !options.shards ? "matrix.language == 'python'" : undefined,
        run: ['pip3 install virtualenv=20.0.23', 'pip3 install pipenv'].join(
          '\n',
        ),
      });
    }

    if (options.docker) {
      steps.push({
        name: 'Run docker compose',
        run: 'docker compose -f testing/docker-compose.yml up --build -d',
      });
    }

    if (options.aws) {
      steps.push(...ProviderWorkflowSteps.awsAuth());
    }

    if (options.gcp) {
      steps.push(...ProviderWorkflowSteps.gcpAuth());
    }

    if (options.gcpRegistry) {
      steps.push({
        name: 'Login to Google Cloud Registry',
        run: 'gcloud --quiet auth configure-docker gcr.io,us-central1-docker.pkg.dev',
      });
    }
    if (options.setupScript) {
      steps.push({
        name: 'Run setup script',
        run: options.setupScript,
      });
    }

    if (options.shards && !options.noSchema) {
      steps.push({
        name: 'Install prebuilt SDKs',
        run: 'make install_sdks',
      });
    }

    if (!options.shards) {
      steps.push({
        name: 'Install dependnecies',
        run: 'make install_${{ matrix.language }}_sdk',
      });
      // TODO: handle pre test steps
      if (options.integrationTestProvider) {
        steps.push({
          name: 'Run provider tests',
          if: "matrix.testTarget == 'local'",
          workingDirectory: 'provider',
          run: 'go test -v -count=1 -cover -timeout 2h -tags=${{ matrix.language }} -parallel 4 .',
        });
      }
      steps.push({
        name: 'Run tests',
        if: "matrix.testTarget == 'local'",
        run: `cd ${options.testFolder} && go test -v -count=1 -cover -timeout 2h -tags=$\{{ matrix.language }} -skip TestPulumiExamples -parallel 4 .`,
      });
      steps.push({
        name: 'Run pulumi/examples tests',
        if: "matrix.testTarget == 'pulumiExamples'",
        run: 'cd examples && go test -v -count=1 -cover -timeout 2h -tags=${{ matrix.language }} -run TestPulumiExamples -parallel 4 .',
      });
    } else {
      // TODO: handle pre test steps

      steps.push({
        name: 'Generate test shards',
        run: [
          `cd ${options.testFolder}`,
          'go run github.com/pulumi/shard@861c9ce4aa851e98c19f8376892bf7e47238fa1b \\',
          '    --total ${{ matrix.total-shards }} \\',
          '    --index ${{ matrix.current-shard }} \\',
          '    --output env >> "$GITHUB_ENV"',
        ].join('\n'),
      });
      steps.push({
        name: 'Run tests',
        run: 'make GOTESTARGS="test.run ${SHARD_TESTS} ${SHARD_PATHS}" test',
      });
    }

    const matrix: JobMatrix = options.shards
      ? {
          domain: {
            totalShards: [options.shards],
            'current-shard': new Array(options.shards)
              .fill(1)
              .map((_, idx) => idx),
          },
        }
      : {
          domain: {
            language: options.languages!,
            testTarget: options.testPulumiExamples
              ? ['local', 'pulumiExamples']
              : ['local'],
          },
        };
    return {
      name: 'Run Acceptance Tests',
      runsOn: [options.runsOn ?? 'ubuntu-latest'],
      needs: options.needs ?? ['prerequisites', 'build_provider'],
      steps,
      env: {
        PR_COMMIT_SHA:
          '${{ github.event.client_payload.pull_request.head.sha }}',
        ...options.env,
      },
      strategy: {
        failFast: false,
        matrix,
      },
      permissions: {
        contents: workflows.JobPermission.READ,
        idToken: workflows.JobPermission.WRITE,
        ...(options.permissions ?? {}),
      },
    };
  }
}
