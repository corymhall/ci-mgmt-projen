import { CheckoutOptions as BaseCheckoutOptions } from 'projen/lib/github';
import { JobStep } from 'projen/lib/github/workflows-model';
import { removeNullOrUndefinedProperties } from 'projen/lib/util/object';

export interface CheckoutOptions extends BaseCheckoutOptions {
  readonly submodules?: boolean;
  readonly ref?: string;
}

export class ProviderWorkflowSteps {
  public static checkout(
    options: CheckoutOptions = {},
    checkoutAction?: string,
  ): JobStep {
    const checkoutWith = removeNullOrUndefinedProperties({
      submodules: options.submodules,
      ref: options.ref,
      'persist-credentials': false,
    });
    return {
      name: 'Checkout Repo',
      uses: checkoutAction ?? 'actions/checkout@v4',
      with: Object.keys(checkoutWith).length > 0 ? checkoutWith : undefined,
    };
  }

  public static updatePath(): JobStep {
    return {
      name: 'Update path',
      run: 'echo "${{ github.workspace }}/bin" >> "$GITHUB_PATH"',
    };
  }

  public static awsAuth(): JobStep[] {
    return [
      {
        name: 'Generate Pulumi Access Token',
        id: 'generate_pulumi_token',
        uses: 'pulumi/auth-actions@v1.0.1',
        with: {
          organization: 'pulumi',
          'requested-token-type':
            'urn:pulumi:token-type:access_token:organization',
          'export-environment-variables': 'false',
        },
      },
      {
        name: 'Export AWS Credentials',
        uses: 'pulumi/esc-action@v1.4.0',
        env: {
          PULUMI_ACCESS_TOKEN:
            '${{ steps.generate_pulumi_token.outputs.pulumi-access-token }}',
        },
        with: {
          environment: 'logins/pulumi-ci',
        },
      },
    ];
  }

  public static gcpAuth(): JobStep[] {
    return [
      {
        name: 'Authenticate to Google Cloud',
        uses: '',
        with: {
          service_account: '${{ env.GOOGLE_CI_SERVICE_ACCOUNT_EMAIL }}',
          workload_identity_provider:
            'projects/${{ env.GOOGLE_PROJECT_NUMBER }}/locations/global/workloadIdentityPools/${{ env.GOOGLE_CI_WORKLOAD_IDENTITY_POOL }}/providers/${{ env.GOOGLE_CI_WORKLOAD_IDENTITY_PROVIDER }}',
        },
      },
      {
        name: 'Setup gcloud auth',
        uses: '',
        with: {
          install_components: 'gke-gcloud-auth-plugin',
        },
      },
    ];
  }

  public static freeDiskSpace(action?: string): JobStep {
    return {
      name: 'Free Disk Space (Ubuntu)',
      uses: action ?? 'jlumbroso/free-disk-space@v1.3.1',
      with: {
        'tool-cache': false,
        'swap-storage': false,
        dotnet: false,
      },
    };
  }
}
