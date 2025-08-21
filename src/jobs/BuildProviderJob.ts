import { workflows } from 'projen/lib/github';
import { ProviderActions, Tool } from '../provider-actions';
import { ProviderWorkflowSteps } from '../provider-steps';

export interface BuildProviderJobOptions {
  id?: string;
  needs?: string[];
  runsOn?: string | string[];
  provider: string;
  noSchema?: boolean;
  actionVersions?: {
    uploadArtifact?: string;
    downloadArtifact?: string;
    freeDiskSpace?: string;
    checkout?: string;
  };
}

export function buildProviderJob(
  options: BuildProviderJobOptions,
): workflows.Job {
  const runsOn = Array.isArray(options.runsOn)
    ? options.runsOn
    : [options.runsOn ?? 'ubuntu-latest'];
  return {
    name: 'Build Provider',
    runsOn,
    needs: options.needs,
    steps: [
      ProviderWorkflowSteps.checkout({}, options.actionVersions?.checkout),
      ...ProviderActions.setupTools({ tools: [Tool.GO] }),
      { name: 'Build provider binary', run: 'make provider' },
      { name: 'Unit-test provider code', run: 'make test_provider' },
      ...ProviderActions.uploadPrerequisites({
        provider: options.provider,
        noSchema: options.noSchema,
        versions: { uploadArtifact: options.actionVersions?.uploadArtifact },
      }),
    ],
    permissions: { contents: workflows.JobPermission.READ },
  };
}
