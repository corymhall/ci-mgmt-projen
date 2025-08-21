import { workflows } from 'projen/lib/github';
import { ProviderActions, Tool } from '../provider-actions';
import { ProviderWorkflowSteps } from '../provider-steps';

export interface TestJobOptions {
  id?: string;
  needs?: string[];
  runsOn?: string | string[];
  provider: string;
  matrix?: { os?: string[]; arch?: string[] };
  actionVersions?: { downloadArtifact?: string; checkout?: string };
}

export function testJob(options: TestJobOptions): workflows.Job {
  const runsOn = Array.isArray(options.runsOn)
    ? options.runsOn
    : [options.runsOn ?? 'ubuntu-latest'];
  return {
    name: 'Run Acceptance Tests',
    runsOn,
    needs: options.needs,
    steps: [
      ProviderWorkflowSteps.checkout({}, options.actionVersions?.checkout),
      ...ProviderActions.setupTools({
        tools: [Tool.GO, Tool.PULUMI_CLI, Tool.PULUMI_CTL],
      }),
      ...ProviderActions.downloadPrerequisites({
        provider: options.provider,
        versions: {
          downloadArtifact: options.actionVersions?.downloadArtifact,
        },
      }),
      { name: 'Run tests', run: 'make test_all' },
    ],
    permissions: {
      contents: workflows.JobPermission.READ,
      idToken: workflows.JobPermission.WRITE,
    },
  };
}
