import { workflows } from 'projen/lib/github';
import { ProviderActions, Tool } from '../provider-actions';
import { ProviderWorkflowSteps } from '../provider-steps';

export interface PrerequisitesJobOptions {
  organization?: string;
  provider: string;
  majorVersion?: string;
  noSchema?: boolean;
  registryDocs?: boolean;
  enableConfigurationCheck?: boolean;
  actionVersions?: {
    freeDiskSpace?: string;
    checkout?: string;
    providerVersion?: string;
    codecov?: string;
    prComment?: string;
  };
  env?: Record<string, string>;
  runner?: { prerequisitesRunner?: string };
  freeDiskSpaceBeforeBuild?: boolean;
  checkoutSubmodules?: boolean;
}

export function prerequisitesJob(
  options: PrerequisitesJobOptions,
): workflows.Job {
  const runsOn = [options.runner?.prerequisitesRunner ?? 'ubuntu-latest'];
  const steps: workflows.JobStep[] = [];

  if (options.freeDiskSpaceBeforeBuild) {
    steps.push(
      ProviderWorkflowSteps.freeDiskSpace(
        options.actionVersions?.freeDiskSpace,
      ),
    );
  }
  steps.push(
    ProviderWorkflowSteps.checkout(
      { submodules: options.checkoutSubmodules },
      options.actionVersions?.checkout,
    ),
  );
  steps.push({
    name: 'Determine provider version',
    id: 'provider-version',
    uses:
      options.actionVersions?.providerVersion ??
      'pulumi/provider-version-action@v1',
    with: {
      'major-version': options.majorVersion ?? '1',
      'set-env': 'PROVIDER_VERSION',
    },
  });

  if (!options.noSchema) {
    steps.push({
      name: 'Cache examples generation',
      uses: 'actions/cache@0400d5f644dc74513175e3cd8d07132dd4860809',
      with: {
        path: '.pulumi/examples-cache',
        key: "${{ runner.os }}-${{ hashFiles('provider/go.sum') }}",
      },
    });
  }

  steps.push(
    ...ProviderActions.setupTools({
      tools: [Tool.GO, Tool.PULUMI_CLI, Tool.PULUMI_CTL, Tool.SCHEMA_TOOLS],
    }),
    {
      name: 'Prepare local workspace before restoring previously built files',
      run: 'make prepare_local_workspace',
    },
  );

  if (!options.noSchema) {
    steps.push({ name: 'Generate schema', run: 'make schema' });
  }
  if (options.registryDocs) {
    steps.push({
      name: 'Build registry docs',
      run: 'make build_registry_docs',
    });
  }
  steps.push(
    { name: 'Build provider binary', run: 'make provider' },
    { name: 'Unit-test provider code', run: 'make test_provider' },
    {
      name: 'Upload coverage reports to Codecov',
      uses: options.actionVersions?.codecov ?? 'codecov/codecov-action@v4',
      env: { CODECOV_TOKEN: '${{ secrets.CODECOV_TOKEN }}' },
    },
  );

  if (!options.noSchema) {
    steps.push(
      {
        if: "github.event_name == 'pull_request'",
        name: 'Check Schema is Valid',
        run: [
          'EOF=$(dd if=/dev/urandom bs=15 count=1 status=none | base64)',
          '{',
          '  echo "SCHEMA_CHANGES<<$EOF";',
          `  schema-tools compare -r github://api.github.com/${options.organization ?? ''} -p ${options.provider ?? ''} -o "${'${{ inputs.default_branch }}'}" -n --local-path=provider/cmd/pulumi-resource-${options.provider ?? ''}/schema.json;`,
          '  echo "$EOF";',
          '} >> "$GITHUB_ENV"',
        ].join('\n'),
      },
      {
        if: "github.event_name == 'pull_request' && github.actor != 'dependabot[bot]'",
        name: 'Comment on PR with Details of Schema Check',
        uses:
          options.actionVersions?.prComment ??
          'marocchino/sticky-pull-request-comment@v2',
        with: {
          'github-token': '${{ secrets.GITHUB_TOKEN }}',
          'comment-tag': 'schemaCheck',
          message:
            '${{ env.SCHEMA_CHANGES }}\n\nMaintainer note: consult the runbook for dealing with any breaking changes.',
        },
      },
    );

    if (options.enableConfigurationCheck) {
      steps.push(
        {
          if: "github.event_name == 'pull_request'",
          name: 'Check Configuration section',
          run: [
            "sed -n '/## Configuration/,$p' README.md | sed -n '/## Reference/q;p' >> config_section.txt",
            `jq -r '.config | select(.variables) | .variables | keys[]' < provider/cmd/pulumi-resource-${options.provider}/schema.json >> keys.txt`,
            'EOF=$(dd if=/dev/urandom bs=15 count=1 status=none | base64)',
            '{',
            '  echo "MISSING_CONFIG<<$EOF";',
            '  xargs -I {} sh -c "grep -q {} config_section.txt || echo \\\\`{}\\\\` not found in Configuration section" < keys.txt',
            '  echo "$EOF";',
            '} >> "$GITHUB_ENV"',
          ].join('\n'),
        },
        {
          if: "github.event_name == 'pull_request' && github.actor != 'dependabot[bot]",
          name: 'Check for missing config',
          run: [
            'if [ ! -z "${{ env.MISSING_CONFIG }}" ]; then',
            'cat <<EOF',
            '${{ env.MISSING_CONFIG }}',
            'EOF',
            "echo 'Please add a description for each of these options to `README.md`.'",
            "echo 'Details about them can be found in either the upstream docs or `schema.json`.'",
            'exit 1',
            'fi',
          ].join('\n'),
        },
      );
    }
  }

  steps.push(
    ...ProviderActions.uploadPrerequisites({
      provider: options.provider,
      noSchema: options.noSchema,
    }),
  );

  const job: workflows.Job = {
    if: "github.event_name == 'repository_dispatch' || github.event.pull_request.head.repo.full_name == github.repository",
    runsOn,
    outputs: { version: { outputName: 'version', stepId: 'provider-version' } },
    steps,
    env: {
      PR_COMMIT_SHA: '${{ github.event.client_payload.pull_request.head.sha }}',
      ...(options.env ?? {}),
    },
    concurrency: {
      group: '${{ github.workflow }}-${{ github.ref }}',
      'cancel-in-progress': true,
    },
    permissions: {
      contents: workflows.JobPermission.READ,
      idToken: workflows.JobPermission.WRITE,
    },
  };

  return job;
}
