import { CheckoutOptions as BaseCheckoutOptions } from 'projen/lib/github';
import { JobStep } from 'projen/lib/github/workflows-model';
import { removeNullOrUndefinedProperties } from 'projen/lib/util/object';

export interface CheckoutOptions extends BaseCheckoutOptions {
  submodules?: boolean;
}

export class ProviderWorkflowSteps {
  public static checkout(
    options: CheckoutOptions = {},
    checkoutAction?: string,
  ): JobStep {
    const checkoutWith = removeNullOrUndefinedProperties({
      submodules: options.submodules,
      'persist-credentials': false,
    });
    return {
      name: 'Checkout Repo',
      uses: checkoutAction ?? 'actions/checkout@v4',
      with: Object.keys(checkoutWith).length > 0 ? checkoutWith : undefined,
    };
  }

  public static freeDiskSpace(action?: string): JobStep {
    return {
      name: 'Free Disk Space (Ubuntu)',
      uses: action ?? 'jlumbroso/free-disk-space@v1.3.1',
      with: {
        with: {
          'tool-cache': false,
          'swap-storage': false,
          dotnet: false,
        },
      },
    };
  }
}
