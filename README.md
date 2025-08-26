# Pulumi ci-mgmt Projen Library

This repo currently has an example of porting the [ci-mgmt](https://github.com/pulumi/ci-mgmt) `run-acceptance-tests` workflow generation to [projen](https://github.com/projen/projen).
> [!NOTE] 
> This currently inlines the separate `action.yml` job definitions because I prefer this, but
> we could also keep these separate

## Example

```go
package main

import (
	"github.com/corymhall/ci-mgmt-projen/cimgmtprojen"
)

func main() {
	project := cimgmtprojen.NewProviderProject(&cimgmtprojen.ProviderProjectOptions{
		Name: ref("acc-test"),
		AcceptanceTestsWorkflowOptions: &cimgmtprojen.RunAcceptanceTestsWorkflowOptions{
			Provider:           ref("aws"),
			CheckoutSubmodules: ref(true),
			Env: &map[string]*string{
				"PULUMI_MISSING_DOCS_ERROR": ref("true"),
				"AWS_REGION":                ref("us-west-2"),
				"OIDC_ROLE_ARN":             ref("${{ secrets.OIDC_ROLE_ARN }}"),
			},
			FreeDiskSpaceBeforeBuild: ref(true),
			MajorVersion:             ref(float64(7)),
			PrerequisiteJobOptions:   &cimgmtprojen.PrerequisitesJobOptions{},
			TestOptions: &cimgmtprojen.TestJobOptions{
				Aws:    ref(true),
				Shards: ref(float64(8)),
			},
		},
	})
	project.Synth()
}

func ref[T any](value T) *T {
	return &value
}
```
