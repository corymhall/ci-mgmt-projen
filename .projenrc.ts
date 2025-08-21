import { cdk } from 'projen';
const project = new cdk.JsiiProject({
  author: 'corymhall',
  authorAddress: '43035978+corymhall@users.noreply.github.com',
  defaultReleaseBranch: 'main',
  jsiiVersion: '~5.8.0',
  name: 'ci-mgmt-projen',
  projenrcTs: true,
  repositoryUrl: 'https://github.com/corymhall/ci-mgmt-projen.git',
  projenDevDependency: false,
  prettier: true,
  prettierOptions: {
    settings: {
      singleQuote: true,
    },
  },
  eslintOptions: {
    dirs: [],
    prettier: true,
  },

  deps: ['projen'],
});
project.synth();
