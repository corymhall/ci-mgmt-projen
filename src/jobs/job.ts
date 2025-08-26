import { workflows } from 'projen/lib/github';

export interface JobOptionsBase {
  readonly runsOn?: string;
  readonly needs?: string[];
  readonly permissions?: workflows.JobPermissions;
  readonly env?: Record<string, string>;
}
