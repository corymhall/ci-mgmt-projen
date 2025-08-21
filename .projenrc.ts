import { cdk } from 'projen';
const project = new cdk.JsiiProject({
  author: 'corymhall',
  authorAddress: '43035978+corymhall@users.noreply.github.com',
  defaultReleaseBranch: 'main',
  jsiiVersion: '~5.8.0',
  name: 'ci-mgmt-projen',
  projenrcTs: true,
  repositoryUrl: 'https://github.com/corymhall/ci-mgmt-projen.git',

  // deps: [],                /* Runtime dependencies of this module. */
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  // devDeps: [],             /* Build dependencies for this module. */
  // packageName: undefined,  /* The "name" in package.json. */
});
project.synth();