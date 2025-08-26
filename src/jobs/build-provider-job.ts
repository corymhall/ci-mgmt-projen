import { workflows, WorkflowSteps } from 'projen/lib/github';
import { ProviderActions } from '../provider-actions';
import { ProviderWorkflowSteps } from '../provider-steps';
import { JobOptionsBase } from './job';
import { ProviderWorkflowOptions } from '../common';
import { PrerequisitesJob } from './prerequisites-job';

export interface BuildProviderJobOptions
  extends JobOptionsBase,
    ProviderWorkflowOptions {
  readonly providerVersion: string;
  readonly modulePath: string;
  readonly freeDiskSpaceBeforeBuild?: boolean;
  readonly matrix?: workflows.JobMatrix;
}

export class BuildProviderJob {
  static id = 'build_provider';

  static render(options: BuildProviderJobOptions): workflows.Job {
    const matrix = options.matrix ?? {
      domain: {
        os: ['linux', 'darwin', 'windows'],
        arch: ['amd64', 'arm64'],
      },
    };
    return {
      name: 'Build Provider',
      runsOn: [options.runsOn ?? 'ubuntu-latest'],
      needs: options.needs ?? [PrerequisitesJob.id],
      permissions: {
        contents: workflows.JobPermission.READ,
        ...(options.permissions ?? {}),
      },
      env: {
        PROVIDER_VERSION: options.providerVersion,
        GITHUB_TOKEN: '${{ secrets.GITHUB_TOKEN }}',
      },
      strategy: {
        failFast: true,
        matrix,
      },
      steps: [
        ...(options.freeDiskSpaceBeforeBuild
          ? [ProviderWorkflowSteps.freeDiskSpace()]
          : []),
        ProviderWorkflowSteps.checkout({
          submodules: options.checkoutSubmodules,
        }),
        {
          uses: 'MOZGIII/install-ldid-action@v1',
          with: { tag: 'v2.1.5-procursus2' },
        },
        ...ProviderActions.setupTools({
          tools: ['go', 'pulumictl'],
          cacheGo: false,
        }),
        { name: 'Build provider binary', run: 'make provider' },
        {
          name: 'Get GOCACHE',
          id: 'gocache',
          shell: 'bash',
          run: 'echo "path=$(go env GOCACHE)" >> "${GITHUB_OUTPUT}"',
        },
        {
          name: 'Get GOMODCACHE',
          id: 'gomodcache',
          shell: 'bash',
          run: 'echo "path=$(go env GOMODCACHE)" >> "${GITHUB_OUTPUT}"',
        },
        {
          name: 'Go Cache',
          uses: 'actions/cache@v4',
          with: {
            path: [
              '${{ steps.gocache.outputs.path }}',
              '${{ steps.gomodcache.outputs.path }}',
            ].join('\n'),
            key: `go-provider-$\{{ matrix.os }}-$\{{ matrix.arch }}-$\{{ hashFiles('${options.modulePath}/go.sum') }}`,
            restoreKeys: 'go-provider-${{ matrix.os }}-${{ matrix.arch }}',
          },
        },
        {
          name: 'Prepare local workspace before restoring previously built',
          run: 'make prepare_local_workspace',
          env: { GITHUB_TOKEN: '${{ secrets.GITHUB_TOKEN }}' },
        },
        ...ProviderActions.downloadPrerequisites(options.provider),
        // This mirrors the targets completed in the prerequisites job
        // TODO: do we need this?
        ...(options.noSchema
          ? []
          : [
              {
                name: 'Restore makefile progress',
                run: 'make --touch provider schema',
              },
            ]),
        {
          name: 'Build provider',
          run: 'make "provider-${{ matrix.os }}-${{ matrix.arch }}',
          env: {
            AZURE_SIGNING_CLIENT_ID: '${{ secrets.AZURE_SIGNING_CLIENT_ID }}',
            AZURE_SIGNING_CLIENT_SECRET:
              '${{ secrets.AZURE_SIGNING_CLIENT_SECRET }}',
            AZURE_SIGNING_TENANT_ID: '${{ secrets.AZURE_SIGNING_TENANT_ID }}',
            AZURE_SIGNING_KEY_VAULT_URI:
              '${{ secrets.AZURE_SIGNING_KEY_VAULT_URI }}',
            SKIP_SIGNING:
              "${{ secrets.AZURE_SIGNING_CLIENT_ID == '' && secrets.AZURE_SIGNING_CLIENT_SECRET == '' && secrets.AZURE_SIGNING_TENANT_ID == '' && secrets.AZURE_SIGNING_KEY_VAULT_URI == '' }}",
          },
        },
        {
          name: 'Package provider',
          run: 'make provider_dist-${{ matrix.os }}-${{ matrix.arch }}',
        },
        WorkflowSteps.uploadArtifact({
          with: {
            name: `pulumi-resource-${options.provider}-${options.providerVersion}-$\{{ matrix.os }}-$\{{ matrix.arch }}.tar.gz`,
            path: `bin/pulumi-resource-${options.provider}-${options.providerVersion}-$\{{ matrix.os }}-$\{{ matrix.arch }}.tar.gz`,
            retentionDays: 30,
          },
        }),
      ],
    };
  }
}
