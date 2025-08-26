import { cdk } from 'projen';
const project = new cdk.JsiiProject({
  author: 'corymhall',
  authorAddress: '43035978+corymhall@users.noreply.github.com',
  release: false,
  defaultReleaseBranch: 'main',
  jsiiVersion: '~5.8.0',
  name: 'ci-mgmt-projen',
  projenrcTs: true,
  repositoryUrl: 'https://github.com/corymhall/ci-mgmt-projen.git',
  projenDevDependency: false,
  prettier: true,
  sampleCode: false,
  prettierOptions: {
    settings: {
      singleQuote: true,
    },
  },
  eslintOptions: {
    dirs: [],
    prettier: true,
  },
  publishToGo: {
    moduleName: 'github.com/corymhall/ci-mgmt-projen',
    gitBranch: 'go',
  },

  deps: ['projen'],
  peerDeps: ['projen', 'constructs'],
});
project.synth();
