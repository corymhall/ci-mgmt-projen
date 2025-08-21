import { workflows } from 'projen/lib/github';
import { ProviderActions, Tool } from '../provider-actions';
import { ProviderWorkflowSteps } from '../provider-steps';

export interface BuildSdkJobOptions {
  id?: string;
  needs?: string[];
  runsOn?: string | string[];
  languages: Array<'nodejs' | 'python' | 'dotnet' | 'go' | 'java'>;
  actionVersions?: { uploadArtifact?: string; checkout?: string };
}

export function buildSdkJob(options: BuildSdkJobOptions): workflows.Job {
  const runsOn = Array.isArray(options.runsOn)
    ? options.runsOn
    : [options.runsOn ?? 'ubuntu-latest'];
  const steps = [
    ProviderWorkflowSteps.checkout({}, options.actionVersions?.checkout),
    ...ProviderActions.setupTools({
      tools: [Tool.GO, Tool.NODEJS, Tool.PYTHON, Tool.DOTNET, Tool.JAVA],
    }),
    { name: 'Build SDKs', run: 'make build_sdks' },
    ...options.languages.flatMap((lang) =>
      ProviderActions.uploadSdk({ language: lang }),
    ),
  ];
  return {
    name: 'Build SDKs',
    runsOn,
    needs: options.needs,
    steps,
    permissions: { contents: workflows.JobPermission.READ },
  };
}
