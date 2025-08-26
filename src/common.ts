export interface ProviderWorkflowOptions {
  /**
   * provider is the name of the provider without the pulumi-prefix e.g. "aws"
   */
  readonly provider: string;

  /**
   * NoSchema is useful for providers such as parameterized providers that do not check in
   * a fixed schema into the repository.
   *
   * @default false
   */
  readonly noSchema?: boolean;

  /**
   * Control which language SDKs get built and published.
   *
   * @default ['nodejs', 'python', 'dotnet', 'go', 'java']
   */
  readonly languages?: string[];

  /**
   * checkoutSubmodules is used for all checkouts during CI
   * @default false
   */
  readonly checkoutSubmodules?: boolean;
}
