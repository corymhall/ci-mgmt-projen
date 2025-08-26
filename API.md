# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### ProviderProject <a name="ProviderProject" id="ci-mgmt-projen.ProviderProject"></a>

#### Initializers <a name="Initializers" id="ci-mgmt-projen.ProviderProject.Initializer"></a>

```typescript
import { ProviderProject } from 'ci-mgmt-projen'

new ProviderProject(options: ProviderProjectOptions)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#ci-mgmt-projen.ProviderProject.Initializer.parameter.options">options</a></code> | <code><a href="#ci-mgmt-projen.ProviderProjectOptions">ProviderProjectOptions</a></code> | *No description.* |

---

##### `options`<sup>Required</sup> <a name="options" id="ci-mgmt-projen.ProviderProject.Initializer.parameter.options"></a>

- *Type:* <a href="#ci-mgmt-projen.ProviderProjectOptions">ProviderProjectOptions</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#ci-mgmt-projen.ProviderProject.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#ci-mgmt-projen.ProviderProject.addExcludeFromCleanup">addExcludeFromCleanup</a></code> | Exclude the matching files from pre-synth cleanup. |
| <code><a href="#ci-mgmt-projen.ProviderProject.addGitIgnore">addGitIgnore</a></code> | Adds a .gitignore pattern. |
| <code><a href="#ci-mgmt-projen.ProviderProject.addPackageIgnore">addPackageIgnore</a></code> | Exclude these files from the bundled package. |
| <code><a href="#ci-mgmt-projen.ProviderProject.addTask">addTask</a></code> | Adds a new task to this project. |
| <code><a href="#ci-mgmt-projen.ProviderProject.addTip">addTip</a></code> | Prints a "tip" message during synthesis. |
| <code><a href="#ci-mgmt-projen.ProviderProject.annotateGenerated">annotateGenerated</a></code> | Consider a set of files as "generated". |
| <code><a href="#ci-mgmt-projen.ProviderProject.postSynthesize">postSynthesize</a></code> | Called after all components are synthesized. |
| <code><a href="#ci-mgmt-projen.ProviderProject.preSynthesize">preSynthesize</a></code> | Called before all components are synthesized. |
| <code><a href="#ci-mgmt-projen.ProviderProject.removeTask">removeTask</a></code> | Removes a task from a project. |
| <code><a href="#ci-mgmt-projen.ProviderProject.runTaskCommand">runTaskCommand</a></code> | Returns the shell command to execute in order to run a task. |
| <code><a href="#ci-mgmt-projen.ProviderProject.synth">synth</a></code> | Synthesize all project files into `outdir`. |
| <code><a href="#ci-mgmt-projen.ProviderProject.tryFindFile">tryFindFile</a></code> | Finds a file at the specified relative path within this project and all its subprojects. |
| <code><a href="#ci-mgmt-projen.ProviderProject.tryFindJsonFile">tryFindJsonFile</a></code> | Finds a json file by name. |
| <code><a href="#ci-mgmt-projen.ProviderProject.tryFindObjectFile">tryFindObjectFile</a></code> | Finds an object file (like JsonFile, YamlFile, etc.) by name. |
| <code><a href="#ci-mgmt-projen.ProviderProject.tryRemoveFile">tryRemoveFile</a></code> | Finds a file at the specified relative path within this project and removes it. |

---

##### `toString` <a name="toString" id="ci-mgmt-projen.ProviderProject.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `addExcludeFromCleanup` <a name="addExcludeFromCleanup" id="ci-mgmt-projen.ProviderProject.addExcludeFromCleanup"></a>

```typescript
public addExcludeFromCleanup(globs: ...string[]): void
```

Exclude the matching files from pre-synth cleanup.

Can be used when, for example, some
source files include the projen marker and we don't want them to be erased during synth.

###### `globs`<sup>Required</sup> <a name="globs" id="ci-mgmt-projen.ProviderProject.addExcludeFromCleanup.parameter.globs"></a>

- *Type:* ...string[]

The glob patterns to match.

---

##### `addGitIgnore` <a name="addGitIgnore" id="ci-mgmt-projen.ProviderProject.addGitIgnore"></a>

```typescript
public addGitIgnore(pattern: string): void
```

Adds a .gitignore pattern.

###### `pattern`<sup>Required</sup> <a name="pattern" id="ci-mgmt-projen.ProviderProject.addGitIgnore.parameter.pattern"></a>

- *Type:* string

The glob pattern to ignore.

---

##### `addPackageIgnore` <a name="addPackageIgnore" id="ci-mgmt-projen.ProviderProject.addPackageIgnore"></a>

```typescript
public addPackageIgnore(_pattern: string): void
```

Exclude these files from the bundled package.

Implemented by project types based on the
packaging mechanism. For example, `NodeProject` delegates this to `.npmignore`.

###### `_pattern`<sup>Required</sup> <a name="_pattern" id="ci-mgmt-projen.ProviderProject.addPackageIgnore.parameter._pattern"></a>

- *Type:* string

The glob pattern to exclude.

---

##### `addTask` <a name="addTask" id="ci-mgmt-projen.ProviderProject.addTask"></a>

```typescript
public addTask(name: string, props?: TaskOptions): Task
```

Adds a new task to this project.

This will fail if the project already has
a task with this name.

###### `name`<sup>Required</sup> <a name="name" id="ci-mgmt-projen.ProviderProject.addTask.parameter.name"></a>

- *Type:* string

The task name to add.

---

###### `props`<sup>Optional</sup> <a name="props" id="ci-mgmt-projen.ProviderProject.addTask.parameter.props"></a>

- *Type:* projen.TaskOptions

Task properties.

---

##### ~~`addTip`~~ <a name="addTip" id="ci-mgmt-projen.ProviderProject.addTip"></a>

```typescript
public addTip(message: string): void
```

Prints a "tip" message during synthesis.

###### `message`<sup>Required</sup> <a name="message" id="ci-mgmt-projen.ProviderProject.addTip.parameter.message"></a>

- *Type:* string

The message.

---

##### `annotateGenerated` <a name="annotateGenerated" id="ci-mgmt-projen.ProviderProject.annotateGenerated"></a>

```typescript
public annotateGenerated(_glob: string): void
```

Consider a set of files as "generated".

This method is implemented by
derived classes and used for example, to add git attributes to tell GitHub
that certain files are generated.

###### `_glob`<sup>Required</sup> <a name="_glob" id="ci-mgmt-projen.ProviderProject.annotateGenerated.parameter._glob"></a>

- *Type:* string

the glob pattern to match (could be a file path).

---

##### `postSynthesize` <a name="postSynthesize" id="ci-mgmt-projen.ProviderProject.postSynthesize"></a>

```typescript
public postSynthesize(): void
```

Called after all components are synthesized.

Order is *not* guaranteed.

##### `preSynthesize` <a name="preSynthesize" id="ci-mgmt-projen.ProviderProject.preSynthesize"></a>

```typescript
public preSynthesize(): void
```

Called before all components are synthesized.

##### `removeTask` <a name="removeTask" id="ci-mgmt-projen.ProviderProject.removeTask"></a>

```typescript
public removeTask(name: string): Task
```

Removes a task from a project.

###### `name`<sup>Required</sup> <a name="name" id="ci-mgmt-projen.ProviderProject.removeTask.parameter.name"></a>

- *Type:* string

The name of the task to remove.

---

##### `runTaskCommand` <a name="runTaskCommand" id="ci-mgmt-projen.ProviderProject.runTaskCommand"></a>

```typescript
public runTaskCommand(task: Task): string
```

Returns the shell command to execute in order to run a task.

By default, this is `npx projen@<version> <task>`

###### `task`<sup>Required</sup> <a name="task" id="ci-mgmt-projen.ProviderProject.runTaskCommand.parameter.task"></a>

- *Type:* projen.Task

The task for which the command is required.

---

##### `synth` <a name="synth" id="ci-mgmt-projen.ProviderProject.synth"></a>

```typescript
public synth(): void
```

Synthesize all project files into `outdir`.

1. Call "this.preSynthesize()"
2. Delete all generated files
3. Synthesize all subprojects
4. Synthesize all components of this project
5. Call "postSynthesize()" for all components of this project
6. Call "this.postSynthesize()"

##### `tryFindFile` <a name="tryFindFile" id="ci-mgmt-projen.ProviderProject.tryFindFile"></a>

```typescript
public tryFindFile(filePath: string): FileBase
```

Finds a file at the specified relative path within this project and all its subprojects.

###### `filePath`<sup>Required</sup> <a name="filePath" id="ci-mgmt-projen.ProviderProject.tryFindFile.parameter.filePath"></a>

- *Type:* string

The file path.

If this path is relative, it will be resolved
from the root of _this_ project.

---

##### ~~`tryFindJsonFile`~~ <a name="tryFindJsonFile" id="ci-mgmt-projen.ProviderProject.tryFindJsonFile"></a>

```typescript
public tryFindJsonFile(filePath: string): JsonFile
```

Finds a json file by name.

###### `filePath`<sup>Required</sup> <a name="filePath" id="ci-mgmt-projen.ProviderProject.tryFindJsonFile.parameter.filePath"></a>

- *Type:* string

The file path.

---

##### `tryFindObjectFile` <a name="tryFindObjectFile" id="ci-mgmt-projen.ProviderProject.tryFindObjectFile"></a>

```typescript
public tryFindObjectFile(filePath: string): ObjectFile
```

Finds an object file (like JsonFile, YamlFile, etc.) by name.

###### `filePath`<sup>Required</sup> <a name="filePath" id="ci-mgmt-projen.ProviderProject.tryFindObjectFile.parameter.filePath"></a>

- *Type:* string

The file path.

---

##### `tryRemoveFile` <a name="tryRemoveFile" id="ci-mgmt-projen.ProviderProject.tryRemoveFile"></a>

```typescript
public tryRemoveFile(filePath: string): FileBase
```

Finds a file at the specified relative path within this project and removes it.

###### `filePath`<sup>Required</sup> <a name="filePath" id="ci-mgmt-projen.ProviderProject.tryRemoveFile.parameter.filePath"></a>

- *Type:* string

The file path.

If this path is relative, it will be
resolved from the root of _this_ project.

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#ci-mgmt-projen.ProviderProject.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#ci-mgmt-projen.ProviderProject.isProject">isProject</a></code> | Test whether the given construct is a project. |
| <code><a href="#ci-mgmt-projen.ProviderProject.of">of</a></code> | Find the closest ancestor project for given construct. |

---

##### `isConstruct` <a name="isConstruct" id="ci-mgmt-projen.ProviderProject.isConstruct"></a>

```typescript
import { ProviderProject } from 'ci-mgmt-projen'

ProviderProject.isConstruct(x: any)
```

Checks if `x` is a construct.

Use this method instead of `instanceof` to properly detect `Construct`
instances, even when the construct library is symlinked.

Explanation: in JavaScript, multiple copies of the `constructs` library on
disk are seen as independent, completely different libraries. As a
consequence, the class `Construct` in each copy of the `constructs` library
is seen as a different class, and an instance of one class will not test as
`instanceof` the other class. `npm install` will not create installations
like this, but users may manually symlink construct libraries together or
use a monorepo tool: in those cases, multiple copies of the `constructs`
library can be accidentally installed, and `instanceof` will behave
unpredictably. It is safest to avoid using `instanceof`, and using
this type-testing method instead.

###### `x`<sup>Required</sup> <a name="x" id="ci-mgmt-projen.ProviderProject.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isProject` <a name="isProject" id="ci-mgmt-projen.ProviderProject.isProject"></a>

```typescript
import { ProviderProject } from 'ci-mgmt-projen'

ProviderProject.isProject(x: any)
```

Test whether the given construct is a project.

###### `x`<sup>Required</sup> <a name="x" id="ci-mgmt-projen.ProviderProject.isProject.parameter.x"></a>

- *Type:* any

---

##### `of` <a name="of" id="ci-mgmt-projen.ProviderProject.of"></a>

```typescript
import { ProviderProject } from 'ci-mgmt-projen'

ProviderProject.of(construct: IConstruct)
```

Find the closest ancestor project for given construct.

When given a project, this it the project itself.

###### `construct`<sup>Required</sup> <a name="construct" id="ci-mgmt-projen.ProviderProject.of.parameter.construct"></a>

- *Type:* constructs.IConstruct

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#ci-mgmt-projen.ProviderProject.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#ci-mgmt-projen.ProviderProject.property.buildTask">buildTask</a></code> | <code>projen.Task</code> | *No description.* |
| <code><a href="#ci-mgmt-projen.ProviderProject.property.commitGenerated">commitGenerated</a></code> | <code>boolean</code> | Whether to commit the managed files by default. |
| <code><a href="#ci-mgmt-projen.ProviderProject.property.compileTask">compileTask</a></code> | <code>projen.Task</code> | *No description.* |
| <code><a href="#ci-mgmt-projen.ProviderProject.property.components">components</a></code> | <code>projen.Component[]</code> | Returns all the components within this project. |
| <code><a href="#ci-mgmt-projen.ProviderProject.property.deps">deps</a></code> | <code>projen.Dependencies</code> | Project dependencies. |
| <code><a href="#ci-mgmt-projen.ProviderProject.property.ejected">ejected</a></code> | <code>boolean</code> | Whether or not the project is being ejected. |
| <code><a href="#ci-mgmt-projen.ProviderProject.property.files">files</a></code> | <code>projen.FileBase[]</code> | All files in this project. |
| <code><a href="#ci-mgmt-projen.ProviderProject.property.gitattributes">gitattributes</a></code> | <code>projen.GitAttributesFile</code> | The .gitattributes file for this repository. |
| <code><a href="#ci-mgmt-projen.ProviderProject.property.gitignore">gitignore</a></code> | <code>projen.IgnoreFile</code> | .gitignore. |
| <code><a href="#ci-mgmt-projen.ProviderProject.property.logger">logger</a></code> | <code>projen.Logger</code> | Logging utilities. |
| <code><a href="#ci-mgmt-projen.ProviderProject.property.name">name</a></code> | <code>string</code> | Project name. |
| <code><a href="#ci-mgmt-projen.ProviderProject.property.outdir">outdir</a></code> | <code>string</code> | Absolute output directory of this project. |
| <code><a href="#ci-mgmt-projen.ProviderProject.property.packageTask">packageTask</a></code> | <code>projen.Task</code> | *No description.* |
| <code><a href="#ci-mgmt-projen.ProviderProject.property.postCompileTask">postCompileTask</a></code> | <code>projen.Task</code> | *No description.* |
| <code><a href="#ci-mgmt-projen.ProviderProject.property.preCompileTask">preCompileTask</a></code> | <code>projen.Task</code> | *No description.* |
| <code><a href="#ci-mgmt-projen.ProviderProject.property.projectBuild">projectBuild</a></code> | <code>projen.ProjectBuild</code> | Manages the build process of the project. |
| <code><a href="#ci-mgmt-projen.ProviderProject.property.projenCommand">projenCommand</a></code> | <code>string</code> | The command to use in order to run the projen CLI. |
| <code><a href="#ci-mgmt-projen.ProviderProject.property.root">root</a></code> | <code>projen.Project</code> | The root project. |
| <code><a href="#ci-mgmt-projen.ProviderProject.property.subprojects">subprojects</a></code> | <code>projen.Project[]</code> | Returns all the subprojects within this project. |
| <code><a href="#ci-mgmt-projen.ProviderProject.property.tasks">tasks</a></code> | <code>projen.Tasks</code> | Project tasks. |
| <code><a href="#ci-mgmt-projen.ProviderProject.property.testTask">testTask</a></code> | <code>projen.Task</code> | *No description.* |
| <code><a href="#ci-mgmt-projen.ProviderProject.property.defaultTask">defaultTask</a></code> | <code>projen.Task</code> | This is the "default" task, the one that executes "projen". |
| <code><a href="#ci-mgmt-projen.ProviderProject.property.initProject">initProject</a></code> | <code>projen.InitProject</code> | The options used when this project is bootstrapped via `projen new`. |
| <code><a href="#ci-mgmt-projen.ProviderProject.property.parent">parent</a></code> | <code>projen.Project</code> | A parent project. |

---

##### `node`<sup>Required</sup> <a name="node" id="ci-mgmt-projen.ProviderProject.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `buildTask`<sup>Required</sup> <a name="buildTask" id="ci-mgmt-projen.ProviderProject.property.buildTask"></a>

```typescript
public readonly buildTask: Task;
```

- *Type:* projen.Task

---

##### `commitGenerated`<sup>Required</sup> <a name="commitGenerated" id="ci-mgmt-projen.ProviderProject.property.commitGenerated"></a>

```typescript
public readonly commitGenerated: boolean;
```

- *Type:* boolean

Whether to commit the managed files by default.

---

##### `compileTask`<sup>Required</sup> <a name="compileTask" id="ci-mgmt-projen.ProviderProject.property.compileTask"></a>

```typescript
public readonly compileTask: Task;
```

- *Type:* projen.Task

---

##### `components`<sup>Required</sup> <a name="components" id="ci-mgmt-projen.ProviderProject.property.components"></a>

```typescript
public readonly components: Component[];
```

- *Type:* projen.Component[]

Returns all the components within this project.

---

##### `deps`<sup>Required</sup> <a name="deps" id="ci-mgmt-projen.ProviderProject.property.deps"></a>

```typescript
public readonly deps: Dependencies;
```

- *Type:* projen.Dependencies

Project dependencies.

---

##### `ejected`<sup>Required</sup> <a name="ejected" id="ci-mgmt-projen.ProviderProject.property.ejected"></a>

```typescript
public readonly ejected: boolean;
```

- *Type:* boolean

Whether or not the project is being ejected.

---

##### `files`<sup>Required</sup> <a name="files" id="ci-mgmt-projen.ProviderProject.property.files"></a>

```typescript
public readonly files: FileBase[];
```

- *Type:* projen.FileBase[]

All files in this project.

---

##### `gitattributes`<sup>Required</sup> <a name="gitattributes" id="ci-mgmt-projen.ProviderProject.property.gitattributes"></a>

```typescript
public readonly gitattributes: GitAttributesFile;
```

- *Type:* projen.GitAttributesFile

The .gitattributes file for this repository.

---

##### `gitignore`<sup>Required</sup> <a name="gitignore" id="ci-mgmt-projen.ProviderProject.property.gitignore"></a>

```typescript
public readonly gitignore: IgnoreFile;
```

- *Type:* projen.IgnoreFile

.gitignore.

---

##### `logger`<sup>Required</sup> <a name="logger" id="ci-mgmt-projen.ProviderProject.property.logger"></a>

```typescript
public readonly logger: Logger;
```

- *Type:* projen.Logger

Logging utilities.

---

##### `name`<sup>Required</sup> <a name="name" id="ci-mgmt-projen.ProviderProject.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

Project name.

---

##### `outdir`<sup>Required</sup> <a name="outdir" id="ci-mgmt-projen.ProviderProject.property.outdir"></a>

```typescript
public readonly outdir: string;
```

- *Type:* string

Absolute output directory of this project.

---

##### `packageTask`<sup>Required</sup> <a name="packageTask" id="ci-mgmt-projen.ProviderProject.property.packageTask"></a>

```typescript
public readonly packageTask: Task;
```

- *Type:* projen.Task

---

##### `postCompileTask`<sup>Required</sup> <a name="postCompileTask" id="ci-mgmt-projen.ProviderProject.property.postCompileTask"></a>

```typescript
public readonly postCompileTask: Task;
```

- *Type:* projen.Task

---

##### `preCompileTask`<sup>Required</sup> <a name="preCompileTask" id="ci-mgmt-projen.ProviderProject.property.preCompileTask"></a>

```typescript
public readonly preCompileTask: Task;
```

- *Type:* projen.Task

---

##### `projectBuild`<sup>Required</sup> <a name="projectBuild" id="ci-mgmt-projen.ProviderProject.property.projectBuild"></a>

```typescript
public readonly projectBuild: ProjectBuild;
```

- *Type:* projen.ProjectBuild

Manages the build process of the project.

---

##### `projenCommand`<sup>Required</sup> <a name="projenCommand" id="ci-mgmt-projen.ProviderProject.property.projenCommand"></a>

```typescript
public readonly projenCommand: string;
```

- *Type:* string

The command to use in order to run the projen CLI.

---

##### `root`<sup>Required</sup> <a name="root" id="ci-mgmt-projen.ProviderProject.property.root"></a>

```typescript
public readonly root: Project;
```

- *Type:* projen.Project

The root project.

---

##### `subprojects`<sup>Required</sup> <a name="subprojects" id="ci-mgmt-projen.ProviderProject.property.subprojects"></a>

```typescript
public readonly subprojects: Project[];
```

- *Type:* projen.Project[]

Returns all the subprojects within this project.

---

##### `tasks`<sup>Required</sup> <a name="tasks" id="ci-mgmt-projen.ProviderProject.property.tasks"></a>

```typescript
public readonly tasks: Tasks;
```

- *Type:* projen.Tasks

Project tasks.

---

##### `testTask`<sup>Required</sup> <a name="testTask" id="ci-mgmt-projen.ProviderProject.property.testTask"></a>

```typescript
public readonly testTask: Task;
```

- *Type:* projen.Task

---

##### `defaultTask`<sup>Optional</sup> <a name="defaultTask" id="ci-mgmt-projen.ProviderProject.property.defaultTask"></a>

```typescript
public readonly defaultTask: Task;
```

- *Type:* projen.Task

This is the "default" task, the one that executes "projen".

Undefined if
the project is being ejected.

---

##### `initProject`<sup>Optional</sup> <a name="initProject" id="ci-mgmt-projen.ProviderProject.property.initProject"></a>

```typescript
public readonly initProject: InitProject;
```

- *Type:* projen.InitProject

The options used when this project is bootstrapped via `projen new`.

It
includes the original set of options passed to the CLI and also the JSII
FQN of the project type.

---

##### `parent`<sup>Optional</sup> <a name="parent" id="ci-mgmt-projen.ProviderProject.property.parent"></a>

```typescript
public readonly parent: Project;
```

- *Type:* projen.Project

A parent project.

If undefined, this is the root project.

---

#### Constants <a name="Constants" id="Constants"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#ci-mgmt-projen.ProviderProject.property.DEFAULT_TASK">DEFAULT_TASK</a></code> | <code>string</code> | The name of the default task (the task executed when `projen` is run without arguments). |

---

##### `DEFAULT_TASK`<sup>Required</sup> <a name="DEFAULT_TASK" id="ci-mgmt-projen.ProviderProject.property.DEFAULT_TASK"></a>

```typescript
public readonly DEFAULT_TASK: string;
```

- *Type:* string

The name of the default task (the task executed when `projen` is run without arguments).

Normally
this task should synthesize the project files.

---

### RunAcceptanceTestsWorkflow <a name="RunAcceptanceTestsWorkflow" id="ci-mgmt-projen.RunAcceptanceTestsWorkflow"></a>

#### Initializers <a name="Initializers" id="ci-mgmt-projen.RunAcceptanceTestsWorkflow.Initializer"></a>

```typescript
import { RunAcceptanceTestsWorkflow } from 'ci-mgmt-projen'

new RunAcceptanceTestsWorkflow(scope: Project, name: string, options: RunAcceptanceTestsWorkflowOptions)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#ci-mgmt-projen.RunAcceptanceTestsWorkflow.Initializer.parameter.scope">scope</a></code> | <code>projen.Project</code> | *No description.* |
| <code><a href="#ci-mgmt-projen.RunAcceptanceTestsWorkflow.Initializer.parameter.name">name</a></code> | <code>string</code> | *No description.* |
| <code><a href="#ci-mgmt-projen.RunAcceptanceTestsWorkflow.Initializer.parameter.options">options</a></code> | <code><a href="#ci-mgmt-projen.RunAcceptanceTestsWorkflowOptions">RunAcceptanceTestsWorkflowOptions</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="ci-mgmt-projen.RunAcceptanceTestsWorkflow.Initializer.parameter.scope"></a>

- *Type:* projen.Project

---

##### `name`<sup>Required</sup> <a name="name" id="ci-mgmt-projen.RunAcceptanceTestsWorkflow.Initializer.parameter.name"></a>

- *Type:* string

---

##### `options`<sup>Required</sup> <a name="options" id="ci-mgmt-projen.RunAcceptanceTestsWorkflow.Initializer.parameter.options"></a>

- *Type:* <a href="#ci-mgmt-projen.RunAcceptanceTestsWorkflowOptions">RunAcceptanceTestsWorkflowOptions</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#ci-mgmt-projen.RunAcceptanceTestsWorkflow.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#ci-mgmt-projen.RunAcceptanceTestsWorkflow.postSynthesize">postSynthesize</a></code> | Called after synthesis. |
| <code><a href="#ci-mgmt-projen.RunAcceptanceTestsWorkflow.preSynthesize">preSynthesize</a></code> | Called before synthesis. |
| <code><a href="#ci-mgmt-projen.RunAcceptanceTestsWorkflow.synthesize">synthesize</a></code> | Synthesizes files to the project output directory. |

---

##### `toString` <a name="toString" id="ci-mgmt-projen.RunAcceptanceTestsWorkflow.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `postSynthesize` <a name="postSynthesize" id="ci-mgmt-projen.RunAcceptanceTestsWorkflow.postSynthesize"></a>

```typescript
public postSynthesize(): void
```

Called after synthesis.

Order is *not* guaranteed.

##### `preSynthesize` <a name="preSynthesize" id="ci-mgmt-projen.RunAcceptanceTestsWorkflow.preSynthesize"></a>

```typescript
public preSynthesize(): void
```

Called before synthesis.

##### `synthesize` <a name="synthesize" id="ci-mgmt-projen.RunAcceptanceTestsWorkflow.synthesize"></a>

```typescript
public synthesize(): void
```

Synthesizes files to the project output directory.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#ci-mgmt-projen.RunAcceptanceTestsWorkflow.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#ci-mgmt-projen.RunAcceptanceTestsWorkflow.isComponent">isComponent</a></code> | Test whether the given construct is a component. |

---

##### `isConstruct` <a name="isConstruct" id="ci-mgmt-projen.RunAcceptanceTestsWorkflow.isConstruct"></a>

```typescript
import { RunAcceptanceTestsWorkflow } from 'ci-mgmt-projen'

RunAcceptanceTestsWorkflow.isConstruct(x: any)
```

Checks if `x` is a construct.

Use this method instead of `instanceof` to properly detect `Construct`
instances, even when the construct library is symlinked.

Explanation: in JavaScript, multiple copies of the `constructs` library on
disk are seen as independent, completely different libraries. As a
consequence, the class `Construct` in each copy of the `constructs` library
is seen as a different class, and an instance of one class will not test as
`instanceof` the other class. `npm install` will not create installations
like this, but users may manually symlink construct libraries together or
use a monorepo tool: in those cases, multiple copies of the `constructs`
library can be accidentally installed, and `instanceof` will behave
unpredictably. It is safest to avoid using `instanceof`, and using
this type-testing method instead.

###### `x`<sup>Required</sup> <a name="x" id="ci-mgmt-projen.RunAcceptanceTestsWorkflow.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isComponent` <a name="isComponent" id="ci-mgmt-projen.RunAcceptanceTestsWorkflow.isComponent"></a>

```typescript
import { RunAcceptanceTestsWorkflow } from 'ci-mgmt-projen'

RunAcceptanceTestsWorkflow.isComponent(x: any)
```

Test whether the given construct is a component.

###### `x`<sup>Required</sup> <a name="x" id="ci-mgmt-projen.RunAcceptanceTestsWorkflow.isComponent.parameter.x"></a>

- *Type:* any

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#ci-mgmt-projen.RunAcceptanceTestsWorkflow.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#ci-mgmt-projen.RunAcceptanceTestsWorkflow.property.project">project</a></code> | <code>projen.Project</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="ci-mgmt-projen.RunAcceptanceTestsWorkflow.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `project`<sup>Required</sup> <a name="project" id="ci-mgmt-projen.RunAcceptanceTestsWorkflow.property.project"></a>

```typescript
public readonly project: Project;
```

- *Type:* projen.Project

---


## Structs <a name="Structs" id="Structs"></a>

### BuildProviderJobOptions <a name="BuildProviderJobOptions" id="ci-mgmt-projen.BuildProviderJobOptions"></a>

#### Initializer <a name="Initializer" id="ci-mgmt-projen.BuildProviderJobOptions.Initializer"></a>

```typescript
import { BuildProviderJobOptions } from 'ci-mgmt-projen'

const buildProviderJobOptions: BuildProviderJobOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#ci-mgmt-projen.BuildProviderJobOptions.property.env">env</a></code> | <code>{[ key: string ]: string}</code> | *No description.* |
| <code><a href="#ci-mgmt-projen.BuildProviderJobOptions.property.needs">needs</a></code> | <code>string[]</code> | *No description.* |
| <code><a href="#ci-mgmt-projen.BuildProviderJobOptions.property.permissions">permissions</a></code> | <code>projen.github.workflows.JobPermissions</code> | *No description.* |
| <code><a href="#ci-mgmt-projen.BuildProviderJobOptions.property.runsOn">runsOn</a></code> | <code>string</code> | *No description.* |
| <code><a href="#ci-mgmt-projen.BuildProviderJobOptions.property.provider">provider</a></code> | <code>string</code> | provider is the name of the provider without the pulumi-prefix e.g. "aws". |
| <code><a href="#ci-mgmt-projen.BuildProviderJobOptions.property.checkoutSubmodules">checkoutSubmodules</a></code> | <code>boolean</code> | checkoutSubmodules is used for all checkouts during CI. |
| <code><a href="#ci-mgmt-projen.BuildProviderJobOptions.property.languages">languages</a></code> | <code>string[]</code> | Control which language SDKs get built and published. |
| <code><a href="#ci-mgmt-projen.BuildProviderJobOptions.property.noSchema">noSchema</a></code> | <code>boolean</code> | NoSchema is useful for providers such as parameterized providers that do not check in a fixed schema into the repository. |
| <code><a href="#ci-mgmt-projen.BuildProviderJobOptions.property.modulePath">modulePath</a></code> | <code>string</code> | *No description.* |
| <code><a href="#ci-mgmt-projen.BuildProviderJobOptions.property.providerVersion">providerVersion</a></code> | <code>string</code> | *No description.* |
| <code><a href="#ci-mgmt-projen.BuildProviderJobOptions.property.freeDiskSpaceBeforeBuild">freeDiskSpaceBeforeBuild</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#ci-mgmt-projen.BuildProviderJobOptions.property.matrix">matrix</a></code> | <code>projen.github.workflows.JobMatrix</code> | *No description.* |

---

##### `env`<sup>Optional</sup> <a name="env" id="ci-mgmt-projen.BuildProviderJobOptions.property.env"></a>

```typescript
public readonly env: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}

---

##### `needs`<sup>Optional</sup> <a name="needs" id="ci-mgmt-projen.BuildProviderJobOptions.property.needs"></a>

```typescript
public readonly needs: string[];
```

- *Type:* string[]

---

##### `permissions`<sup>Optional</sup> <a name="permissions" id="ci-mgmt-projen.BuildProviderJobOptions.property.permissions"></a>

```typescript
public readonly permissions: JobPermissions;
```

- *Type:* projen.github.workflows.JobPermissions

---

##### `runsOn`<sup>Optional</sup> <a name="runsOn" id="ci-mgmt-projen.BuildProviderJobOptions.property.runsOn"></a>

```typescript
public readonly runsOn: string;
```

- *Type:* string

---

##### `provider`<sup>Required</sup> <a name="provider" id="ci-mgmt-projen.BuildProviderJobOptions.property.provider"></a>

```typescript
public readonly provider: string;
```

- *Type:* string

provider is the name of the provider without the pulumi-prefix e.g. "aws".

---

##### `checkoutSubmodules`<sup>Optional</sup> <a name="checkoutSubmodules" id="ci-mgmt-projen.BuildProviderJobOptions.property.checkoutSubmodules"></a>

```typescript
public readonly checkoutSubmodules: boolean;
```

- *Type:* boolean
- *Default:* false

checkoutSubmodules is used for all checkouts during CI.

---

##### `languages`<sup>Optional</sup> <a name="languages" id="ci-mgmt-projen.BuildProviderJobOptions.property.languages"></a>

```typescript
public readonly languages: string[];
```

- *Type:* string[]
- *Default:* ['nodejs', 'python', 'dotnet', 'go', 'java']

Control which language SDKs get built and published.

---

##### `noSchema`<sup>Optional</sup> <a name="noSchema" id="ci-mgmt-projen.BuildProviderJobOptions.property.noSchema"></a>

```typescript
public readonly noSchema: boolean;
```

- *Type:* boolean
- *Default:* false

NoSchema is useful for providers such as parameterized providers that do not check in a fixed schema into the repository.

---

##### `modulePath`<sup>Required</sup> <a name="modulePath" id="ci-mgmt-projen.BuildProviderJobOptions.property.modulePath"></a>

```typescript
public readonly modulePath: string;
```

- *Type:* string

---

##### `providerVersion`<sup>Required</sup> <a name="providerVersion" id="ci-mgmt-projen.BuildProviderJobOptions.property.providerVersion"></a>

```typescript
public readonly providerVersion: string;
```

- *Type:* string

---

##### `freeDiskSpaceBeforeBuild`<sup>Optional</sup> <a name="freeDiskSpaceBeforeBuild" id="ci-mgmt-projen.BuildProviderJobOptions.property.freeDiskSpaceBeforeBuild"></a>

```typescript
public readonly freeDiskSpaceBeforeBuild: boolean;
```

- *Type:* boolean

---

##### `matrix`<sup>Optional</sup> <a name="matrix" id="ci-mgmt-projen.BuildProviderJobOptions.property.matrix"></a>

```typescript
public readonly matrix: JobMatrix;
```

- *Type:* projen.github.workflows.JobMatrix

---

### BuildSdkJobOptions <a name="BuildSdkJobOptions" id="ci-mgmt-projen.BuildSdkJobOptions"></a>

#### Initializer <a name="Initializer" id="ci-mgmt-projen.BuildSdkJobOptions.Initializer"></a>

```typescript
import { BuildSdkJobOptions } from 'ci-mgmt-projen'

const buildSdkJobOptions: BuildSdkJobOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#ci-mgmt-projen.BuildSdkJobOptions.property.env">env</a></code> | <code>{[ key: string ]: string}</code> | *No description.* |
| <code><a href="#ci-mgmt-projen.BuildSdkJobOptions.property.needs">needs</a></code> | <code>string[]</code> | *No description.* |
| <code><a href="#ci-mgmt-projen.BuildSdkJobOptions.property.permissions">permissions</a></code> | <code>projen.github.workflows.JobPermissions</code> | *No description.* |
| <code><a href="#ci-mgmt-projen.BuildSdkJobOptions.property.runsOn">runsOn</a></code> | <code>string</code> | *No description.* |
| <code><a href="#ci-mgmt-projen.BuildSdkJobOptions.property.provider">provider</a></code> | <code>string</code> | provider is the name of the provider without the pulumi-prefix e.g. "aws". |
| <code><a href="#ci-mgmt-projen.BuildSdkJobOptions.property.checkoutSubmodules">checkoutSubmodules</a></code> | <code>boolean</code> | checkoutSubmodules is used for all checkouts during CI. |
| <code><a href="#ci-mgmt-projen.BuildSdkJobOptions.property.languages">languages</a></code> | <code>string[]</code> | Control which language SDKs get built and published. |
| <code><a href="#ci-mgmt-projen.BuildSdkJobOptions.property.noSchema">noSchema</a></code> | <code>boolean</code> | NoSchema is useful for providers such as parameterized providers that do not check in a fixed schema into the repository. |
| <code><a href="#ci-mgmt-projen.BuildSdkJobOptions.property.providerVersion">providerVersion</a></code> | <code>string</code> | *No description.* |
| <code><a href="#ci-mgmt-projen.BuildSdkJobOptions.property.freeDiskSpaceBeforeBuild">freeDiskSpaceBeforeBuild</a></code> | <code>boolean</code> | *No description.* |

---

##### `env`<sup>Optional</sup> <a name="env" id="ci-mgmt-projen.BuildSdkJobOptions.property.env"></a>

```typescript
public readonly env: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}

---

##### `needs`<sup>Optional</sup> <a name="needs" id="ci-mgmt-projen.BuildSdkJobOptions.property.needs"></a>

```typescript
public readonly needs: string[];
```

- *Type:* string[]

---

##### `permissions`<sup>Optional</sup> <a name="permissions" id="ci-mgmt-projen.BuildSdkJobOptions.property.permissions"></a>

```typescript
public readonly permissions: JobPermissions;
```

- *Type:* projen.github.workflows.JobPermissions

---

##### `runsOn`<sup>Optional</sup> <a name="runsOn" id="ci-mgmt-projen.BuildSdkJobOptions.property.runsOn"></a>

```typescript
public readonly runsOn: string;
```

- *Type:* string

---

##### `provider`<sup>Required</sup> <a name="provider" id="ci-mgmt-projen.BuildSdkJobOptions.property.provider"></a>

```typescript
public readonly provider: string;
```

- *Type:* string

provider is the name of the provider without the pulumi-prefix e.g. "aws".

---

##### `checkoutSubmodules`<sup>Optional</sup> <a name="checkoutSubmodules" id="ci-mgmt-projen.BuildSdkJobOptions.property.checkoutSubmodules"></a>

```typescript
public readonly checkoutSubmodules: boolean;
```

- *Type:* boolean
- *Default:* false

checkoutSubmodules is used for all checkouts during CI.

---

##### `languages`<sup>Optional</sup> <a name="languages" id="ci-mgmt-projen.BuildSdkJobOptions.property.languages"></a>

```typescript
public readonly languages: string[];
```

- *Type:* string[]
- *Default:* ['nodejs', 'python', 'dotnet', 'go', 'java']

Control which language SDKs get built and published.

---

##### `noSchema`<sup>Optional</sup> <a name="noSchema" id="ci-mgmt-projen.BuildSdkJobOptions.property.noSchema"></a>

```typescript
public readonly noSchema: boolean;
```

- *Type:* boolean
- *Default:* false

NoSchema is useful for providers such as parameterized providers that do not check in a fixed schema into the repository.

---

##### `providerVersion`<sup>Required</sup> <a name="providerVersion" id="ci-mgmt-projen.BuildSdkJobOptions.property.providerVersion"></a>

```typescript
public readonly providerVersion: string;
```

- *Type:* string

---

##### `freeDiskSpaceBeforeBuild`<sup>Optional</sup> <a name="freeDiskSpaceBeforeBuild" id="ci-mgmt-projen.BuildSdkJobOptions.property.freeDiskSpaceBeforeBuild"></a>

```typescript
public readonly freeDiskSpaceBeforeBuild: boolean;
```

- *Type:* boolean

---

### CheckoutOptions <a name="CheckoutOptions" id="ci-mgmt-projen.CheckoutOptions"></a>

#### Initializer <a name="Initializer" id="ci-mgmt-projen.CheckoutOptions.Initializer"></a>

```typescript
import { CheckoutOptions } from 'ci-mgmt-projen'

const checkoutOptions: CheckoutOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#ci-mgmt-projen.CheckoutOptions.property.env">env</a></code> | <code>{[ key: string ]: string}</code> | Sets environment variables for steps to use in the runner environment. |
| <code><a href="#ci-mgmt-projen.CheckoutOptions.property.id">id</a></code> | <code>string</code> | A unique identifier for the step. |
| <code><a href="#ci-mgmt-projen.CheckoutOptions.property.if">if</a></code> | <code>string</code> | You can use the if conditional to prevent a job from running unless a condition is met. |
| <code><a href="#ci-mgmt-projen.CheckoutOptions.property.name">name</a></code> | <code>string</code> | A name for your step to display on GitHub. |
| <code><a href="#ci-mgmt-projen.CheckoutOptions.property.shell">shell</a></code> | <code>string</code> | Overrides the default shell settings in the runner's operating system and the job's default. |
| <code><a href="#ci-mgmt-projen.CheckoutOptions.property.workingDirectory">workingDirectory</a></code> | <code>string</code> | Specifies a working directory for a step. |
| <code><a href="#ci-mgmt-projen.CheckoutOptions.property.continueOnError">continueOnError</a></code> | <code>boolean</code> | Prevents a job from failing when a step fails. |
| <code><a href="#ci-mgmt-projen.CheckoutOptions.property.timeoutMinutes">timeoutMinutes</a></code> | <code>number</code> | The maximum number of minutes to run the step before killing the process. |
| <code><a href="#ci-mgmt-projen.CheckoutOptions.property.with">with</a></code> | <code>projen.github.CheckoutWith</code> | Options for `checkout`. |
| <code><a href="#ci-mgmt-projen.CheckoutOptions.property.ref">ref</a></code> | <code>string</code> | *No description.* |
| <code><a href="#ci-mgmt-projen.CheckoutOptions.property.submodules">submodules</a></code> | <code>boolean</code> | *No description.* |

---

##### `env`<sup>Optional</sup> <a name="env" id="ci-mgmt-projen.CheckoutOptions.property.env"></a>

```typescript
public readonly env: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}

Sets environment variables for steps to use in the runner environment.

You can also set environment variables for the entire workflow or a job.

---

##### `id`<sup>Optional</sup> <a name="id" id="ci-mgmt-projen.CheckoutOptions.property.id"></a>

```typescript
public readonly id: string;
```

- *Type:* string

A unique identifier for the step.

You can use the id to reference the
step in contexts.

---

##### `if`<sup>Optional</sup> <a name="if" id="ci-mgmt-projen.CheckoutOptions.property.if"></a>

```typescript
public readonly if: string;
```

- *Type:* string

You can use the if conditional to prevent a job from running unless a condition is met.

You can use any supported context and expression to
create a conditional.

---

##### `name`<sup>Optional</sup> <a name="name" id="ci-mgmt-projen.CheckoutOptions.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

A name for your step to display on GitHub.

---

##### `shell`<sup>Optional</sup> <a name="shell" id="ci-mgmt-projen.CheckoutOptions.property.shell"></a>

```typescript
public readonly shell: string;
```

- *Type:* string

Overrides the default shell settings in the runner's operating system and the job's default.

Refer to GitHub documentation for allowed values.

> [https://docs.github.com/en/actions/writing-workflows/workflow-syntax-for-github-actions#jobsjob_idstepsshell](https://docs.github.com/en/actions/writing-workflows/workflow-syntax-for-github-actions#jobsjob_idstepsshell)

---

##### `workingDirectory`<sup>Optional</sup> <a name="workingDirectory" id="ci-mgmt-projen.CheckoutOptions.property.workingDirectory"></a>

```typescript
public readonly workingDirectory: string;
```

- *Type:* string

Specifies a working directory for a step.

Overrides a job's working directory.

---

##### `continueOnError`<sup>Optional</sup> <a name="continueOnError" id="ci-mgmt-projen.CheckoutOptions.property.continueOnError"></a>

```typescript
public readonly continueOnError: boolean;
```

- *Type:* boolean

Prevents a job from failing when a step fails.

Set to true to allow a job
to pass when this step fails.

---

##### `timeoutMinutes`<sup>Optional</sup> <a name="timeoutMinutes" id="ci-mgmt-projen.CheckoutOptions.property.timeoutMinutes"></a>

```typescript
public readonly timeoutMinutes: number;
```

- *Type:* number

The maximum number of minutes to run the step before killing the process.

---

##### `with`<sup>Optional</sup> <a name="with" id="ci-mgmt-projen.CheckoutOptions.property.with"></a>

```typescript
public readonly with: CheckoutWith;
```

- *Type:* projen.github.CheckoutWith

Options for `checkout`.

---

##### `ref`<sup>Optional</sup> <a name="ref" id="ci-mgmt-projen.CheckoutOptions.property.ref"></a>

```typescript
public readonly ref: string;
```

- *Type:* string

---

##### `submodules`<sup>Optional</sup> <a name="submodules" id="ci-mgmt-projen.CheckoutOptions.property.submodules"></a>

```typescript
public readonly submodules: boolean;
```

- *Type:* boolean

---

### JobOptionsBase <a name="JobOptionsBase" id="ci-mgmt-projen.JobOptionsBase"></a>

#### Initializer <a name="Initializer" id="ci-mgmt-projen.JobOptionsBase.Initializer"></a>

```typescript
import { JobOptionsBase } from 'ci-mgmt-projen'

const jobOptionsBase: JobOptionsBase = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#ci-mgmt-projen.JobOptionsBase.property.env">env</a></code> | <code>{[ key: string ]: string}</code> | *No description.* |
| <code><a href="#ci-mgmt-projen.JobOptionsBase.property.needs">needs</a></code> | <code>string[]</code> | *No description.* |
| <code><a href="#ci-mgmt-projen.JobOptionsBase.property.permissions">permissions</a></code> | <code>projen.github.workflows.JobPermissions</code> | *No description.* |
| <code><a href="#ci-mgmt-projen.JobOptionsBase.property.runsOn">runsOn</a></code> | <code>string</code> | *No description.* |

---

##### `env`<sup>Optional</sup> <a name="env" id="ci-mgmt-projen.JobOptionsBase.property.env"></a>

```typescript
public readonly env: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}

---

##### `needs`<sup>Optional</sup> <a name="needs" id="ci-mgmt-projen.JobOptionsBase.property.needs"></a>

```typescript
public readonly needs: string[];
```

- *Type:* string[]

---

##### `permissions`<sup>Optional</sup> <a name="permissions" id="ci-mgmt-projen.JobOptionsBase.property.permissions"></a>

```typescript
public readonly permissions: JobPermissions;
```

- *Type:* projen.github.workflows.JobPermissions

---

##### `runsOn`<sup>Optional</sup> <a name="runsOn" id="ci-mgmt-projen.JobOptionsBase.property.runsOn"></a>

```typescript
public readonly runsOn: string;
```

- *Type:* string

---

### PrerequisitesJobConfig <a name="PrerequisitesJobConfig" id="ci-mgmt-projen.PrerequisitesJobConfig"></a>

#### Initializer <a name="Initializer" id="ci-mgmt-projen.PrerequisitesJobConfig.Initializer"></a>

```typescript
import { PrerequisitesJobConfig } from 'ci-mgmt-projen'

const prerequisitesJobConfig: PrerequisitesJobConfig = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#ci-mgmt-projen.PrerequisitesJobConfig.property.provider">provider</a></code> | <code>string</code> | provider is the name of the provider without the pulumi-prefix e.g. "aws". |
| <code><a href="#ci-mgmt-projen.PrerequisitesJobConfig.property.checkoutSubmodules">checkoutSubmodules</a></code> | <code>boolean</code> | checkoutSubmodules is used for all checkouts during CI. |
| <code><a href="#ci-mgmt-projen.PrerequisitesJobConfig.property.languages">languages</a></code> | <code>string[]</code> | Control which language SDKs get built and published. |
| <code><a href="#ci-mgmt-projen.PrerequisitesJobConfig.property.noSchema">noSchema</a></code> | <code>boolean</code> | NoSchema is useful for providers such as parameterized providers that do not check in a fixed schema into the repository. |
| <code><a href="#ci-mgmt-projen.PrerequisitesJobConfig.property.env">env</a></code> | <code>{[ key: string ]: string}</code> | *No description.* |
| <code><a href="#ci-mgmt-projen.PrerequisitesJobConfig.property.needs">needs</a></code> | <code>string[]</code> | *No description.* |
| <code><a href="#ci-mgmt-projen.PrerequisitesJobConfig.property.permissions">permissions</a></code> | <code>projen.github.workflows.JobPermissions</code> | *No description.* |
| <code><a href="#ci-mgmt-projen.PrerequisitesJobConfig.property.runsOn">runsOn</a></code> | <code>string</code> | *No description.* |
| <code><a href="#ci-mgmt-projen.PrerequisitesJobConfig.property.enableConfigurationCheck">enableConfigurationCheck</a></code> | <code>boolean</code> | EnableConfigurationCheck prints a warning on PRs if configuration options aren't documented in the README. |
| <code><a href="#ci-mgmt-projen.PrerequisitesJobConfig.property.registryDocs">registryDocs</a></code> | <code>boolean</code> | Enables automatic registry index doc file generation. |
| <code><a href="#ci-mgmt-projen.PrerequisitesJobConfig.property.majorVersion">majorVersion</a></code> | <code>number</code> | *No description.* |
| <code><a href="#ci-mgmt-projen.PrerequisitesJobConfig.property.organization">organization</a></code> | <code>string</code> | *No description.* |
| <code><a href="#ci-mgmt-projen.PrerequisitesJobConfig.property.freeDiskSpaceBeforeBuild">freeDiskSpaceBeforeBuild</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#ci-mgmt-projen.PrerequisitesJobConfig.property.runner">runner</a></code> | <code>string</code> | *No description.* |

---

##### `provider`<sup>Required</sup> <a name="provider" id="ci-mgmt-projen.PrerequisitesJobConfig.property.provider"></a>

```typescript
public readonly provider: string;
```

- *Type:* string

provider is the name of the provider without the pulumi-prefix e.g. "aws".

---

##### `checkoutSubmodules`<sup>Optional</sup> <a name="checkoutSubmodules" id="ci-mgmt-projen.PrerequisitesJobConfig.property.checkoutSubmodules"></a>

```typescript
public readonly checkoutSubmodules: boolean;
```

- *Type:* boolean
- *Default:* false

checkoutSubmodules is used for all checkouts during CI.

---

##### `languages`<sup>Optional</sup> <a name="languages" id="ci-mgmt-projen.PrerequisitesJobConfig.property.languages"></a>

```typescript
public readonly languages: string[];
```

- *Type:* string[]
- *Default:* ['nodejs', 'python', 'dotnet', 'go', 'java']

Control which language SDKs get built and published.

---

##### `noSchema`<sup>Optional</sup> <a name="noSchema" id="ci-mgmt-projen.PrerequisitesJobConfig.property.noSchema"></a>

```typescript
public readonly noSchema: boolean;
```

- *Type:* boolean
- *Default:* false

NoSchema is useful for providers such as parameterized providers that do not check in a fixed schema into the repository.

---

##### `env`<sup>Optional</sup> <a name="env" id="ci-mgmt-projen.PrerequisitesJobConfig.property.env"></a>

```typescript
public readonly env: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}

---

##### `needs`<sup>Optional</sup> <a name="needs" id="ci-mgmt-projen.PrerequisitesJobConfig.property.needs"></a>

```typescript
public readonly needs: string[];
```

- *Type:* string[]

---

##### `permissions`<sup>Optional</sup> <a name="permissions" id="ci-mgmt-projen.PrerequisitesJobConfig.property.permissions"></a>

```typescript
public readonly permissions: JobPermissions;
```

- *Type:* projen.github.workflows.JobPermissions

---

##### `runsOn`<sup>Optional</sup> <a name="runsOn" id="ci-mgmt-projen.PrerequisitesJobConfig.property.runsOn"></a>

```typescript
public readonly runsOn: string;
```

- *Type:* string

---

##### `enableConfigurationCheck`<sup>Optional</sup> <a name="enableConfigurationCheck" id="ci-mgmt-projen.PrerequisitesJobConfig.property.enableConfigurationCheck"></a>

```typescript
public readonly enableConfigurationCheck: boolean;
```

- *Type:* boolean
- *Default:* false

EnableConfigurationCheck prints a warning on PRs if configuration options aren't documented in the README.

---

##### `registryDocs`<sup>Optional</sup> <a name="registryDocs" id="ci-mgmt-projen.PrerequisitesJobConfig.property.registryDocs"></a>

```typescript
public readonly registryDocs: boolean;
```

- *Type:* boolean
- *Default:* false

Enables automatic registry index doc file generation.

Intended for use with Tier 2/3 providers.

---

##### `majorVersion`<sup>Required</sup> <a name="majorVersion" id="ci-mgmt-projen.PrerequisitesJobConfig.property.majorVersion"></a>

```typescript
public readonly majorVersion: number;
```

- *Type:* number

---

##### `organization`<sup>Required</sup> <a name="organization" id="ci-mgmt-projen.PrerequisitesJobConfig.property.organization"></a>

```typescript
public readonly organization: string;
```

- *Type:* string

---

##### `freeDiskSpaceBeforeBuild`<sup>Optional</sup> <a name="freeDiskSpaceBeforeBuild" id="ci-mgmt-projen.PrerequisitesJobConfig.property.freeDiskSpaceBeforeBuild"></a>

```typescript
public readonly freeDiskSpaceBeforeBuild: boolean;
```

- *Type:* boolean

---

##### `runner`<sup>Optional</sup> <a name="runner" id="ci-mgmt-projen.PrerequisitesJobConfig.property.runner"></a>

```typescript
public readonly runner: string;
```

- *Type:* string

---

### PrerequisitesJobOptions <a name="PrerequisitesJobOptions" id="ci-mgmt-projen.PrerequisitesJobOptions"></a>

#### Initializer <a name="Initializer" id="ci-mgmt-projen.PrerequisitesJobOptions.Initializer"></a>

```typescript
import { PrerequisitesJobOptions } from 'ci-mgmt-projen'

const prerequisitesJobOptions: PrerequisitesJobOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#ci-mgmt-projen.PrerequisitesJobOptions.property.enableConfigurationCheck">enableConfigurationCheck</a></code> | <code>boolean</code> | EnableConfigurationCheck prints a warning on PRs if configuration options aren't documented in the README. |
| <code><a href="#ci-mgmt-projen.PrerequisitesJobOptions.property.registryDocs">registryDocs</a></code> | <code>boolean</code> | Enables automatic registry index doc file generation. |

---

##### `enableConfigurationCheck`<sup>Optional</sup> <a name="enableConfigurationCheck" id="ci-mgmt-projen.PrerequisitesJobOptions.property.enableConfigurationCheck"></a>

```typescript
public readonly enableConfigurationCheck: boolean;
```

- *Type:* boolean
- *Default:* false

EnableConfigurationCheck prints a warning on PRs if configuration options aren't documented in the README.

---

##### `registryDocs`<sup>Optional</sup> <a name="registryDocs" id="ci-mgmt-projen.PrerequisitesJobOptions.property.registryDocs"></a>

```typescript
public readonly registryDocs: boolean;
```

- *Type:* boolean
- *Default:* false

Enables automatic registry index doc file generation.

Intended for use with Tier 2/3 providers.

---

### PrerequisitesJobOutputs <a name="PrerequisitesJobOutputs" id="ci-mgmt-projen.PrerequisitesJobOutputs"></a>

#### Initializer <a name="Initializer" id="ci-mgmt-projen.PrerequisitesJobOutputs.Initializer"></a>

```typescript
import { PrerequisitesJobOutputs } from 'ci-mgmt-projen'

const prerequisitesJobOutputs: PrerequisitesJobOutputs = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#ci-mgmt-projen.PrerequisitesJobOutputs.property.version">version</a></code> | <code>string</code> | *No description.* |

---

##### `version`<sup>Required</sup> <a name="version" id="ci-mgmt-projen.PrerequisitesJobOutputs.property.version"></a>

```typescript
public readonly version: string;
```

- *Type:* string

---

### ProviderProjectOptions <a name="ProviderProjectOptions" id="ci-mgmt-projen.ProviderProjectOptions"></a>

#### Initializer <a name="Initializer" id="ci-mgmt-projen.ProviderProjectOptions.Initializer"></a>

```typescript
import { ProviderProjectOptions } from 'ci-mgmt-projen'

const providerProjectOptions: ProviderProjectOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#ci-mgmt-projen.ProviderProjectOptions.property.acceptanceTestsWorkflowOptions">acceptanceTestsWorkflowOptions</a></code> | <code><a href="#ci-mgmt-projen.RunAcceptanceTestsWorkflowOptions">RunAcceptanceTestsWorkflowOptions</a></code> | *No description.* |
| <code><a href="#ci-mgmt-projen.ProviderProjectOptions.property.name">name</a></code> | <code>string</code> | *No description.* |

---

##### `acceptanceTestsWorkflowOptions`<sup>Required</sup> <a name="acceptanceTestsWorkflowOptions" id="ci-mgmt-projen.ProviderProjectOptions.property.acceptanceTestsWorkflowOptions"></a>

```typescript
public readonly acceptanceTestsWorkflowOptions: RunAcceptanceTestsWorkflowOptions;
```

- *Type:* <a href="#ci-mgmt-projen.RunAcceptanceTestsWorkflowOptions">RunAcceptanceTestsWorkflowOptions</a>

---

##### `name`<sup>Required</sup> <a name="name" id="ci-mgmt-projen.ProviderProjectOptions.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

---

### ProviderWorkflowOptions <a name="ProviderWorkflowOptions" id="ci-mgmt-projen.ProviderWorkflowOptions"></a>

#### Initializer <a name="Initializer" id="ci-mgmt-projen.ProviderWorkflowOptions.Initializer"></a>

```typescript
import { ProviderWorkflowOptions } from 'ci-mgmt-projen'

const providerWorkflowOptions: ProviderWorkflowOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#ci-mgmt-projen.ProviderWorkflowOptions.property.provider">provider</a></code> | <code>string</code> | provider is the name of the provider without the pulumi-prefix e.g. "aws". |
| <code><a href="#ci-mgmt-projen.ProviderWorkflowOptions.property.checkoutSubmodules">checkoutSubmodules</a></code> | <code>boolean</code> | checkoutSubmodules is used for all checkouts during CI. |
| <code><a href="#ci-mgmt-projen.ProviderWorkflowOptions.property.languages">languages</a></code> | <code>string[]</code> | Control which language SDKs get built and published. |
| <code><a href="#ci-mgmt-projen.ProviderWorkflowOptions.property.noSchema">noSchema</a></code> | <code>boolean</code> | NoSchema is useful for providers such as parameterized providers that do not check in a fixed schema into the repository. |

---

##### `provider`<sup>Required</sup> <a name="provider" id="ci-mgmt-projen.ProviderWorkflowOptions.property.provider"></a>

```typescript
public readonly provider: string;
```

- *Type:* string

provider is the name of the provider without the pulumi-prefix e.g. "aws".

---

##### `checkoutSubmodules`<sup>Optional</sup> <a name="checkoutSubmodules" id="ci-mgmt-projen.ProviderWorkflowOptions.property.checkoutSubmodules"></a>

```typescript
public readonly checkoutSubmodules: boolean;
```

- *Type:* boolean
- *Default:* false

checkoutSubmodules is used for all checkouts during CI.

---

##### `languages`<sup>Optional</sup> <a name="languages" id="ci-mgmt-projen.ProviderWorkflowOptions.property.languages"></a>

```typescript
public readonly languages: string[];
```

- *Type:* string[]
- *Default:* ['nodejs', 'python', 'dotnet', 'go', 'java']

Control which language SDKs get built and published.

---

##### `noSchema`<sup>Optional</sup> <a name="noSchema" id="ci-mgmt-projen.ProviderWorkflowOptions.property.noSchema"></a>

```typescript
public readonly noSchema: boolean;
```

- *Type:* boolean
- *Default:* false

NoSchema is useful for providers such as parameterized providers that do not check in a fixed schema into the repository.

---

### RunAcceptanceTestsWorkflowOptions <a name="RunAcceptanceTestsWorkflowOptions" id="ci-mgmt-projen.RunAcceptanceTestsWorkflowOptions"></a>

#### Initializer <a name="Initializer" id="ci-mgmt-projen.RunAcceptanceTestsWorkflowOptions.Initializer"></a>

```typescript
import { RunAcceptanceTestsWorkflowOptions } from 'ci-mgmt-projen'

const runAcceptanceTestsWorkflowOptions: RunAcceptanceTestsWorkflowOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#ci-mgmt-projen.RunAcceptanceTestsWorkflowOptions.property.provider">provider</a></code> | <code>string</code> | provider is the name of the provider without the pulumi-prefix e.g. "aws". |
| <code><a href="#ci-mgmt-projen.RunAcceptanceTestsWorkflowOptions.property.checkoutSubmodules">checkoutSubmodules</a></code> | <code>boolean</code> | checkoutSubmodules is used for all checkouts during CI. |
| <code><a href="#ci-mgmt-projen.RunAcceptanceTestsWorkflowOptions.property.languages">languages</a></code> | <code>string[]</code> | Control which language SDKs get built and published. |
| <code><a href="#ci-mgmt-projen.RunAcceptanceTestsWorkflowOptions.property.noSchema">noSchema</a></code> | <code>boolean</code> | NoSchema is useful for providers such as parameterized providers that do not check in a fixed schema into the repository. |
| <code><a href="#ci-mgmt-projen.RunAcceptanceTestsWorkflowOptions.property.enableConfigurationCheck">enableConfigurationCheck</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#ci-mgmt-projen.RunAcceptanceTestsWorkflowOptions.property.env">env</a></code> | <code>{[ key: string ]: string}</code> | Environment variables for the job. |
| <code><a href="#ci-mgmt-projen.RunAcceptanceTestsWorkflowOptions.property.freeDiskSpaceBeforeBuild">freeDiskSpaceBeforeBuild</a></code> | <code>boolean</code> | Whether or not to run the free disk space action before the build step. |
| <code><a href="#ci-mgmt-projen.RunAcceptanceTestsWorkflowOptions.property.majorVersion">majorVersion</a></code> | <code>number</code> | major version of the current provider - used in make files This should always be set by all providers as this is key to go module paths. |
| <code><a href="#ci-mgmt-projen.RunAcceptanceTestsWorkflowOptions.property.organization">organization</a></code> | <code>string</code> | organization is the name of the Github organization the repository lives in. |
| <code><a href="#ci-mgmt-projen.RunAcceptanceTestsWorkflowOptions.property.prerequisiteJobOptions">prerequisiteJobOptions</a></code> | <code><a href="#ci-mgmt-projen.PrerequisitesJobOptions">PrerequisitesJobOptions</a></code> | Options for the prereq job. |
| <code><a href="#ci-mgmt-projen.RunAcceptanceTestsWorkflowOptions.property.testOptions">testOptions</a></code> | <code><a href="#ci-mgmt-projen.TestJobOptions">TestJobOptions</a></code> | Options for the test job. |

---

##### `provider`<sup>Required</sup> <a name="provider" id="ci-mgmt-projen.RunAcceptanceTestsWorkflowOptions.property.provider"></a>

```typescript
public readonly provider: string;
```

- *Type:* string

provider is the name of the provider without the pulumi-prefix e.g. "aws".

---

##### `checkoutSubmodules`<sup>Optional</sup> <a name="checkoutSubmodules" id="ci-mgmt-projen.RunAcceptanceTestsWorkflowOptions.property.checkoutSubmodules"></a>

```typescript
public readonly checkoutSubmodules: boolean;
```

- *Type:* boolean
- *Default:* false

checkoutSubmodules is used for all checkouts during CI.

---

##### `languages`<sup>Optional</sup> <a name="languages" id="ci-mgmt-projen.RunAcceptanceTestsWorkflowOptions.property.languages"></a>

```typescript
public readonly languages: string[];
```

- *Type:* string[]
- *Default:* ['nodejs', 'python', 'dotnet', 'go', 'java']

Control which language SDKs get built and published.

---

##### `noSchema`<sup>Optional</sup> <a name="noSchema" id="ci-mgmt-projen.RunAcceptanceTestsWorkflowOptions.property.noSchema"></a>

```typescript
public readonly noSchema: boolean;
```

- *Type:* boolean
- *Default:* false

NoSchema is useful for providers such as parameterized providers that do not check in a fixed schema into the repository.

---

##### `enableConfigurationCheck`<sup>Optional</sup> <a name="enableConfigurationCheck" id="ci-mgmt-projen.RunAcceptanceTestsWorkflowOptions.property.enableConfigurationCheck"></a>

```typescript
public readonly enableConfigurationCheck: boolean;
```

- *Type:* boolean

---

##### `env`<sup>Optional</sup> <a name="env" id="ci-mgmt-projen.RunAcceptanceTestsWorkflowOptions.property.env"></a>

```typescript
public readonly env: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}

Environment variables for the job.

---

##### `freeDiskSpaceBeforeBuild`<sup>Optional</sup> <a name="freeDiskSpaceBeforeBuild" id="ci-mgmt-projen.RunAcceptanceTestsWorkflowOptions.property.freeDiskSpaceBeforeBuild"></a>

```typescript
public readonly freeDiskSpaceBeforeBuild: boolean;
```

- *Type:* boolean
- *Default:* false

Whether or not to run the free disk space action before the build step.

---

##### `majorVersion`<sup>Optional</sup> <a name="majorVersion" id="ci-mgmt-projen.RunAcceptanceTestsWorkflowOptions.property.majorVersion"></a>

```typescript
public readonly majorVersion: number;
```

- *Type:* number
- *Default:* 2

major version of the current provider - used in make files This should always be set by all providers as this is key to go module paths.

---

##### `organization`<sup>Optional</sup> <a name="organization" id="ci-mgmt-projen.RunAcceptanceTestsWorkflowOptions.property.organization"></a>

```typescript
public readonly organization: string;
```

- *Type:* string
- *Default:* pulumi

organization is the name of the Github organization the repository lives in.

---

##### `prerequisiteJobOptions`<sup>Optional</sup> <a name="prerequisiteJobOptions" id="ci-mgmt-projen.RunAcceptanceTestsWorkflowOptions.property.prerequisiteJobOptions"></a>

```typescript
public readonly prerequisiteJobOptions: PrerequisitesJobOptions;
```

- *Type:* <a href="#ci-mgmt-projen.PrerequisitesJobOptions">PrerequisitesJobOptions</a>

Options for the prereq job.

---

##### `testOptions`<sup>Optional</sup> <a name="testOptions" id="ci-mgmt-projen.RunAcceptanceTestsWorkflowOptions.property.testOptions"></a>

```typescript
public readonly testOptions: TestJobOptions;
```

- *Type:* <a href="#ci-mgmt-projen.TestJobOptions">TestJobOptions</a>

Options for the test job.

---

### SetupToolsOptions <a name="SetupToolsOptions" id="ci-mgmt-projen.SetupToolsOptions"></a>

#### Initializer <a name="Initializer" id="ci-mgmt-projen.SetupToolsOptions.Initializer"></a>

```typescript
import { SetupToolsOptions } from 'ci-mgmt-projen'

const setupToolsOptions: SetupToolsOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#ci-mgmt-projen.SetupToolsOptions.property.cacheGo">cacheGo</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#ci-mgmt-projen.SetupToolsOptions.property.installKubectl">installKubectl</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#ci-mgmt-projen.SetupToolsOptions.property.tools">tools</a></code> | <code>string[]</code> | *No description.* |
| <code><a href="#ci-mgmt-projen.SetupToolsOptions.property.toolVersions">toolVersions</a></code> | <code><a href="#ci-mgmt-projen.ToolVersions">ToolVersions</a></code> | *No description.* |

---

##### `cacheGo`<sup>Optional</sup> <a name="cacheGo" id="ci-mgmt-projen.SetupToolsOptions.property.cacheGo"></a>

```typescript
public readonly cacheGo: boolean;
```

- *Type:* boolean

---

##### `installKubectl`<sup>Optional</sup> <a name="installKubectl" id="ci-mgmt-projen.SetupToolsOptions.property.installKubectl"></a>

```typescript
public readonly installKubectl: boolean;
```

- *Type:* boolean

---

##### `tools`<sup>Optional</sup> <a name="tools" id="ci-mgmt-projen.SetupToolsOptions.property.tools"></a>

```typescript
public readonly tools: string[];
```

- *Type:* string[]

---

##### `toolVersions`<sup>Optional</sup> <a name="toolVersions" id="ci-mgmt-projen.SetupToolsOptions.property.toolVersions"></a>

```typescript
public readonly toolVersions: ToolVersions;
```

- *Type:* <a href="#ci-mgmt-projen.ToolVersions">ToolVersions</a>

---

### TestJobConfig <a name="TestJobConfig" id="ci-mgmt-projen.TestJobConfig"></a>

#### Initializer <a name="Initializer" id="ci-mgmt-projen.TestJobConfig.Initializer"></a>

```typescript
import { TestJobConfig } from 'ci-mgmt-projen'

const testJobConfig: TestJobConfig = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#ci-mgmt-projen.TestJobConfig.property.env">env</a></code> | <code>{[ key: string ]: string}</code> | *No description.* |
| <code><a href="#ci-mgmt-projen.TestJobConfig.property.needs">needs</a></code> | <code>string[]</code> | *No description.* |
| <code><a href="#ci-mgmt-projen.TestJobConfig.property.permissions">permissions</a></code> | <code>projen.github.workflows.JobPermissions</code> | *No description.* |
| <code><a href="#ci-mgmt-projen.TestJobConfig.property.runsOn">runsOn</a></code> | <code>string</code> | *No description.* |
| <code><a href="#ci-mgmt-projen.TestJobConfig.property.aws">aws</a></code> | <code>boolean</code> | Configure AWS credentials before running tests in CI job. |
| <code><a href="#ci-mgmt-projen.TestJobConfig.property.docker">docker</a></code> | <code>boolean</code> | Run testing/docker-compose.yml up before running tests in CI job. |
| <code><a href="#ci-mgmt-projen.TestJobConfig.property.gcp">gcp</a></code> | <code>boolean</code> | Authenticate with GCP before running tests in CI job. |
| <code><a href="#ci-mgmt-projen.TestJobConfig.property.gcpRegistry">gcpRegistry</a></code> | <code>boolean</code> | Enable logging into the GCP registry before running tests in CI job. |
| <code><a href="#ci-mgmt-projen.TestJobConfig.property.integrationTestProvider">integrationTestProvider</a></code> | <code>boolean</code> | Run e2e tests in the provider as well as in the examples directory. |
| <code><a href="#ci-mgmt-projen.TestJobConfig.property.setupScript">setupScript</a></code> | <code>string</code> | Execute a script before running tests in CI job. |
| <code><a href="#ci-mgmt-projen.TestJobConfig.property.shards">shards</a></code> | <code>number</code> | How many shared to execute integration tests with. |
| <code><a href="#ci-mgmt-projen.TestJobConfig.property.testFolder">testFolder</a></code> | <code>string</code> | *No description.* |
| <code><a href="#ci-mgmt-projen.TestJobConfig.property.testPulumiExamples">testPulumiExamples</a></code> | <code>boolean</code> | Run e2e tests using the examples and test suite in the pulumi/examples repo. |
| <code><a href="#ci-mgmt-projen.TestJobConfig.property.provider">provider</a></code> | <code>string</code> | provider is the name of the provider without the pulumi-prefix e.g. "aws". |
| <code><a href="#ci-mgmt-projen.TestJobConfig.property.checkoutSubmodules">checkoutSubmodules</a></code> | <code>boolean</code> | checkoutSubmodules is used for all checkouts during CI. |
| <code><a href="#ci-mgmt-projen.TestJobConfig.property.languages">languages</a></code> | <code>string[]</code> | Control which language SDKs get built and published. |
| <code><a href="#ci-mgmt-projen.TestJobConfig.property.noSchema">noSchema</a></code> | <code>boolean</code> | NoSchema is useful for providers such as parameterized providers that do not check in a fixed schema into the repository. |
| <code><a href="#ci-mgmt-projen.TestJobConfig.property.freeDiskSpaceBeforeBuild">freeDiskSpaceBeforeBuild</a></code> | <code>boolean</code> | Set to true to clear disk space before running prerequisites workflow. |

---

##### `env`<sup>Optional</sup> <a name="env" id="ci-mgmt-projen.TestJobConfig.property.env"></a>

```typescript
public readonly env: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}

---

##### `needs`<sup>Optional</sup> <a name="needs" id="ci-mgmt-projen.TestJobConfig.property.needs"></a>

```typescript
public readonly needs: string[];
```

- *Type:* string[]

---

##### `permissions`<sup>Optional</sup> <a name="permissions" id="ci-mgmt-projen.TestJobConfig.property.permissions"></a>

```typescript
public readonly permissions: JobPermissions;
```

- *Type:* projen.github.workflows.JobPermissions

---

##### `runsOn`<sup>Optional</sup> <a name="runsOn" id="ci-mgmt-projen.TestJobConfig.property.runsOn"></a>

```typescript
public readonly runsOn: string;
```

- *Type:* string

---

##### `aws`<sup>Optional</sup> <a name="aws" id="ci-mgmt-projen.TestJobConfig.property.aws"></a>

```typescript
public readonly aws: boolean;
```

- *Type:* boolean
- *Default:* false

Configure AWS credentials before running tests in CI job.

---

##### `docker`<sup>Optional</sup> <a name="docker" id="ci-mgmt-projen.TestJobConfig.property.docker"></a>

```typescript
public readonly docker: boolean;
```

- *Type:* boolean
- *Default:* false

Run testing/docker-compose.yml up before running tests in CI job.

---

##### `gcp`<sup>Optional</sup> <a name="gcp" id="ci-mgmt-projen.TestJobConfig.property.gcp"></a>

```typescript
public readonly gcp: boolean;
```

- *Type:* boolean
- *Default:* false

Authenticate with GCP before running tests in CI job.

---

##### `gcpRegistry`<sup>Optional</sup> <a name="gcpRegistry" id="ci-mgmt-projen.TestJobConfig.property.gcpRegistry"></a>

```typescript
public readonly gcpRegistry: boolean;
```

- *Type:* boolean
- *Default:* false

Enable logging into the GCP registry before running tests in CI job.

---

##### `integrationTestProvider`<sup>Optional</sup> <a name="integrationTestProvider" id="ci-mgmt-projen.TestJobConfig.property.integrationTestProvider"></a>

```typescript
public readonly integrationTestProvider: boolean;
```

- *Type:* boolean
- *Default:* false

Run e2e tests in the provider as well as in the examples directory.

---

##### `setupScript`<sup>Optional</sup> <a name="setupScript" id="ci-mgmt-projen.TestJobConfig.property.setupScript"></a>

```typescript
public readonly setupScript: string;
```

- *Type:* string
- *Default:* no setup script run

Execute a script before running tests in CI job.

---

##### `shards`<sup>Optional</sup> <a name="shards" id="ci-mgmt-projen.TestJobConfig.property.shards"></a>

```typescript
public readonly shards: number;
```

- *Type:* number
- *Default:* language based sharding

How many shared to execute integration tests with.

If omitted, shard behavior defaults to language-based sharding.

---

##### `testFolder`<sup>Optional</sup> <a name="testFolder" id="ci-mgmt-projen.TestJobConfig.property.testFolder"></a>

```typescript
public readonly testFolder: string;
```

- *Type:* string

---

##### `testPulumiExamples`<sup>Optional</sup> <a name="testPulumiExamples" id="ci-mgmt-projen.TestJobConfig.property.testPulumiExamples"></a>

```typescript
public readonly testPulumiExamples: boolean;
```

- *Type:* boolean
- *Default:* false

Run e2e tests using the examples and test suite in the pulumi/examples repo.

---

##### `provider`<sup>Required</sup> <a name="provider" id="ci-mgmt-projen.TestJobConfig.property.provider"></a>

```typescript
public readonly provider: string;
```

- *Type:* string

provider is the name of the provider without the pulumi-prefix e.g. "aws".

---

##### `checkoutSubmodules`<sup>Optional</sup> <a name="checkoutSubmodules" id="ci-mgmt-projen.TestJobConfig.property.checkoutSubmodules"></a>

```typescript
public readonly checkoutSubmodules: boolean;
```

- *Type:* boolean
- *Default:* false

checkoutSubmodules is used for all checkouts during CI.

---

##### `languages`<sup>Optional</sup> <a name="languages" id="ci-mgmt-projen.TestJobConfig.property.languages"></a>

```typescript
public readonly languages: string[];
```

- *Type:* string[]
- *Default:* ['nodejs', 'python', 'dotnet', 'go', 'java']

Control which language SDKs get built and published.

---

##### `noSchema`<sup>Optional</sup> <a name="noSchema" id="ci-mgmt-projen.TestJobConfig.property.noSchema"></a>

```typescript
public readonly noSchema: boolean;
```

- *Type:* boolean
- *Default:* false

NoSchema is useful for providers such as parameterized providers that do not check in a fixed schema into the repository.

---

##### `freeDiskSpaceBeforeBuild`<sup>Optional</sup> <a name="freeDiskSpaceBeforeBuild" id="ci-mgmt-projen.TestJobConfig.property.freeDiskSpaceBeforeBuild"></a>

```typescript
public readonly freeDiskSpaceBeforeBuild: boolean;
```

- *Type:* boolean
- *Default:* false

Set to true to clear disk space before running prerequisites workflow.

This is used for larger providers which sometimes run out of disk space during builds.

---

### TestJobOptions <a name="TestJobOptions" id="ci-mgmt-projen.TestJobOptions"></a>

#### Initializer <a name="Initializer" id="ci-mgmt-projen.TestJobOptions.Initializer"></a>

```typescript
import { TestJobOptions } from 'ci-mgmt-projen'

const testJobOptions: TestJobOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#ci-mgmt-projen.TestJobOptions.property.aws">aws</a></code> | <code>boolean</code> | Configure AWS credentials before running tests in CI job. |
| <code><a href="#ci-mgmt-projen.TestJobOptions.property.docker">docker</a></code> | <code>boolean</code> | Run testing/docker-compose.yml up before running tests in CI job. |
| <code><a href="#ci-mgmt-projen.TestJobOptions.property.gcp">gcp</a></code> | <code>boolean</code> | Authenticate with GCP before running tests in CI job. |
| <code><a href="#ci-mgmt-projen.TestJobOptions.property.gcpRegistry">gcpRegistry</a></code> | <code>boolean</code> | Enable logging into the GCP registry before running tests in CI job. |
| <code><a href="#ci-mgmt-projen.TestJobOptions.property.integrationTestProvider">integrationTestProvider</a></code> | <code>boolean</code> | Run e2e tests in the provider as well as in the examples directory. |
| <code><a href="#ci-mgmt-projen.TestJobOptions.property.setupScript">setupScript</a></code> | <code>string</code> | Execute a script before running tests in CI job. |
| <code><a href="#ci-mgmt-projen.TestJobOptions.property.shards">shards</a></code> | <code>number</code> | How many shared to execute integration tests with. |
| <code><a href="#ci-mgmt-projen.TestJobOptions.property.testFolder">testFolder</a></code> | <code>string</code> | *No description.* |
| <code><a href="#ci-mgmt-projen.TestJobOptions.property.testPulumiExamples">testPulumiExamples</a></code> | <code>boolean</code> | Run e2e tests using the examples and test suite in the pulumi/examples repo. |

---

##### `aws`<sup>Optional</sup> <a name="aws" id="ci-mgmt-projen.TestJobOptions.property.aws"></a>

```typescript
public readonly aws: boolean;
```

- *Type:* boolean
- *Default:* false

Configure AWS credentials before running tests in CI job.

---

##### `docker`<sup>Optional</sup> <a name="docker" id="ci-mgmt-projen.TestJobOptions.property.docker"></a>

```typescript
public readonly docker: boolean;
```

- *Type:* boolean
- *Default:* false

Run testing/docker-compose.yml up before running tests in CI job.

---

##### `gcp`<sup>Optional</sup> <a name="gcp" id="ci-mgmt-projen.TestJobOptions.property.gcp"></a>

```typescript
public readonly gcp: boolean;
```

- *Type:* boolean
- *Default:* false

Authenticate with GCP before running tests in CI job.

---

##### `gcpRegistry`<sup>Optional</sup> <a name="gcpRegistry" id="ci-mgmt-projen.TestJobOptions.property.gcpRegistry"></a>

```typescript
public readonly gcpRegistry: boolean;
```

- *Type:* boolean
- *Default:* false

Enable logging into the GCP registry before running tests in CI job.

---

##### `integrationTestProvider`<sup>Optional</sup> <a name="integrationTestProvider" id="ci-mgmt-projen.TestJobOptions.property.integrationTestProvider"></a>

```typescript
public readonly integrationTestProvider: boolean;
```

- *Type:* boolean
- *Default:* false

Run e2e tests in the provider as well as in the examples directory.

---

##### `setupScript`<sup>Optional</sup> <a name="setupScript" id="ci-mgmt-projen.TestJobOptions.property.setupScript"></a>

```typescript
public readonly setupScript: string;
```

- *Type:* string
- *Default:* no setup script run

Execute a script before running tests in CI job.

---

##### `shards`<sup>Optional</sup> <a name="shards" id="ci-mgmt-projen.TestJobOptions.property.shards"></a>

```typescript
public readonly shards: number;
```

- *Type:* number
- *Default:* language based sharding

How many shared to execute integration tests with.

If omitted, shard behavior defaults to language-based sharding.

---

##### `testFolder`<sup>Optional</sup> <a name="testFolder" id="ci-mgmt-projen.TestJobOptions.property.testFolder"></a>

```typescript
public readonly testFolder: string;
```

- *Type:* string

---

##### `testPulumiExamples`<sup>Optional</sup> <a name="testPulumiExamples" id="ci-mgmt-projen.TestJobOptions.property.testPulumiExamples"></a>

```typescript
public readonly testPulumiExamples: boolean;
```

- *Type:* boolean
- *Default:* false

Run e2e tests using the examples and test suite in the pulumi/examples repo.

---

### ToolVersions <a name="ToolVersions" id="ci-mgmt-projen.ToolVersions"></a>

#### Initializer <a name="Initializer" id="ci-mgmt-projen.ToolVersions.Initializer"></a>

```typescript
import { ToolVersions } from 'ci-mgmt-projen'

const toolVersions: ToolVersions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#ci-mgmt-projen.ToolVersions.property.dotnet">dotnet</a></code> | <code>string</code> | *No description.* |
| <code><a href="#ci-mgmt-projen.ToolVersions.property.go">go</a></code> | <code>string</code> | *No description.* |
| <code><a href="#ci-mgmt-projen.ToolVersions.property.gradle">gradle</a></code> | <code>string</code> | *No description.* |
| <code><a href="#ci-mgmt-projen.ToolVersions.property.java">java</a></code> | <code>string</code> | *No description.* |
| <code><a href="#ci-mgmt-projen.ToolVersions.property.nodejs">nodejs</a></code> | <code>string</code> | *No description.* |
| <code><a href="#ci-mgmt-projen.ToolVersions.property.pulumiCli">pulumiCli</a></code> | <code>string</code> | *No description.* |
| <code><a href="#ci-mgmt-projen.ToolVersions.property.pulumiCtl">pulumiCtl</a></code> | <code>string</code> | *No description.* |
| <code><a href="#ci-mgmt-projen.ToolVersions.property.python">python</a></code> | <code>string</code> | *No description.* |
| <code><a href="#ci-mgmt-projen.ToolVersions.property.schemaTools">schemaTools</a></code> | <code>string</code> | *No description.* |

---

##### `dotnet`<sup>Optional</sup> <a name="dotnet" id="ci-mgmt-projen.ToolVersions.property.dotnet"></a>

```typescript
public readonly dotnet: string;
```

- *Type:* string

---

##### `go`<sup>Optional</sup> <a name="go" id="ci-mgmt-projen.ToolVersions.property.go"></a>

```typescript
public readonly go: string;
```

- *Type:* string

---

##### `gradle`<sup>Optional</sup> <a name="gradle" id="ci-mgmt-projen.ToolVersions.property.gradle"></a>

```typescript
public readonly gradle: string;
```

- *Type:* string

---

##### `java`<sup>Optional</sup> <a name="java" id="ci-mgmt-projen.ToolVersions.property.java"></a>

```typescript
public readonly java: string;
```

- *Type:* string

---

##### `nodejs`<sup>Optional</sup> <a name="nodejs" id="ci-mgmt-projen.ToolVersions.property.nodejs"></a>

```typescript
public readonly nodejs: string;
```

- *Type:* string

---

##### `pulumiCli`<sup>Optional</sup> <a name="pulumiCli" id="ci-mgmt-projen.ToolVersions.property.pulumiCli"></a>

```typescript
public readonly pulumiCli: string;
```

- *Type:* string

---

##### `pulumiCtl`<sup>Optional</sup> <a name="pulumiCtl" id="ci-mgmt-projen.ToolVersions.property.pulumiCtl"></a>

```typescript
public readonly pulumiCtl: string;
```

- *Type:* string

---

##### `python`<sup>Optional</sup> <a name="python" id="ci-mgmt-projen.ToolVersions.property.python"></a>

```typescript
public readonly python: string;
```

- *Type:* string

---

##### `schemaTools`<sup>Optional</sup> <a name="schemaTools" id="ci-mgmt-projen.ToolVersions.property.schemaTools"></a>

```typescript
public readonly schemaTools: string;
```

- *Type:* string

---

## Classes <a name="Classes" id="Classes"></a>

### BuildProviderJob <a name="BuildProviderJob" id="ci-mgmt-projen.BuildProviderJob"></a>

#### Initializers <a name="Initializers" id="ci-mgmt-projen.BuildProviderJob.Initializer"></a>

```typescript
import { BuildProviderJob } from 'ci-mgmt-projen'

new BuildProviderJob()
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |

---


#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#ci-mgmt-projen.BuildProviderJob.render">render</a></code> | *No description.* |

---

##### `render` <a name="render" id="ci-mgmt-projen.BuildProviderJob.render"></a>

```typescript
import { BuildProviderJob } from 'ci-mgmt-projen'

BuildProviderJob.render(options: BuildProviderJobOptions)
```

###### `options`<sup>Required</sup> <a name="options" id="ci-mgmt-projen.BuildProviderJob.render.parameter.options"></a>

- *Type:* <a href="#ci-mgmt-projen.BuildProviderJobOptions">BuildProviderJobOptions</a>

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#ci-mgmt-projen.BuildProviderJob.property.id">id</a></code> | <code>string</code> | *No description.* |

---

##### `id`<sup>Required</sup> <a name="id" id="ci-mgmt-projen.BuildProviderJob.property.id"></a>

```typescript
public readonly id: string;
```

- *Type:* string

---


### BuildSdkJob <a name="BuildSdkJob" id="ci-mgmt-projen.BuildSdkJob"></a>

#### Initializers <a name="Initializers" id="ci-mgmt-projen.BuildSdkJob.Initializer"></a>

```typescript
import { BuildSdkJob } from 'ci-mgmt-projen'

new BuildSdkJob()
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |

---


#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#ci-mgmt-projen.BuildSdkJob.render">render</a></code> | *No description.* |

---

##### `render` <a name="render" id="ci-mgmt-projen.BuildSdkJob.render"></a>

```typescript
import { BuildSdkJob } from 'ci-mgmt-projen'

BuildSdkJob.render(options: BuildSdkJobOptions)
```

###### `options`<sup>Required</sup> <a name="options" id="ci-mgmt-projen.BuildSdkJob.render.parameter.options"></a>

- *Type:* <a href="#ci-mgmt-projen.BuildSdkJobOptions">BuildSdkJobOptions</a>

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#ci-mgmt-projen.BuildSdkJob.property.id">id</a></code> | <code>string</code> | *No description.* |

---

##### `id`<sup>Required</sup> <a name="id" id="ci-mgmt-projen.BuildSdkJob.property.id"></a>

```typescript
public readonly id: string;
```

- *Type:* string

---


### PrerequisitesJob <a name="PrerequisitesJob" id="ci-mgmt-projen.PrerequisitesJob"></a>

#### Initializers <a name="Initializers" id="ci-mgmt-projen.PrerequisitesJob.Initializer"></a>

```typescript
import { PrerequisitesJob } from 'ci-mgmt-projen'

new PrerequisitesJob()
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |

---


#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#ci-mgmt-projen.PrerequisitesJob.outputs">outputs</a></code> | *No description.* |
| <code><a href="#ci-mgmt-projen.PrerequisitesJob.render">render</a></code> | *No description.* |

---

##### `outputs` <a name="outputs" id="ci-mgmt-projen.PrerequisitesJob.outputs"></a>

```typescript
import { PrerequisitesJob } from 'ci-mgmt-projen'

PrerequisitesJob.outputs()
```

##### `render` <a name="render" id="ci-mgmt-projen.PrerequisitesJob.render"></a>

```typescript
import { PrerequisitesJob } from 'ci-mgmt-projen'

PrerequisitesJob.render(options: PrerequisitesJobConfig)
```

###### `options`<sup>Required</sup> <a name="options" id="ci-mgmt-projen.PrerequisitesJob.render.parameter.options"></a>

- *Type:* <a href="#ci-mgmt-projen.PrerequisitesJobConfig">PrerequisitesJobConfig</a>

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#ci-mgmt-projen.PrerequisitesJob.property.id">id</a></code> | <code>string</code> | *No description.* |

---

##### `id`<sup>Required</sup> <a name="id" id="ci-mgmt-projen.PrerequisitesJob.property.id"></a>

```typescript
public readonly id: string;
```

- *Type:* string

---


### ProviderActions <a name="ProviderActions" id="ci-mgmt-projen.ProviderActions"></a>

#### Initializers <a name="Initializers" id="ci-mgmt-projen.ProviderActions.Initializer"></a>

```typescript
import { ProviderActions } from 'ci-mgmt-projen'

new ProviderActions()
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |

---


#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#ci-mgmt-projen.ProviderActions.downloadPrerequisites">downloadPrerequisites</a></code> | Download prerequisites artifacts and restore permissions, optionally schema. |
| <code><a href="#ci-mgmt-projen.ProviderActions.downloadProvider">downloadProvider</a></code> | Download provider tarball artifact and extract it; |
| <code><a href="#ci-mgmt-projen.ProviderActions.downloadSdk">downloadSdk</a></code> | Download a language SDK tarball into sdk/<lang> and extract it. |
| <code><a href="#ci-mgmt-projen.ProviderActions.setupTools">setupTools</a></code> | Returns steps to mirror base/.github/actions/setup-tools. |
| <code><a href="#ci-mgmt-projen.ProviderActions.uploadPrerequisites">uploadPrerequisites</a></code> | Upload prerequisites artifacts (bin/* and optional schema-embed.json). |
| <code><a href="#ci-mgmt-projen.ProviderActions.uploadSdk">uploadSdk</a></code> | Upload a language SDK tarball from sdk/<lang>. |

---

##### `downloadPrerequisites` <a name="downloadPrerequisites" id="ci-mgmt-projen.ProviderActions.downloadPrerequisites"></a>

```typescript
import { ProviderActions } from 'ci-mgmt-projen'

ProviderActions.downloadPrerequisites(provider: string, noSchema?: boolean)
```

Download prerequisites artifacts and restore permissions, optionally schema.

###### `provider`<sup>Required</sup> <a name="provider" id="ci-mgmt-projen.ProviderActions.downloadPrerequisites.parameter.provider"></a>

- *Type:* string

---

###### `noSchema`<sup>Optional</sup> <a name="noSchema" id="ci-mgmt-projen.ProviderActions.downloadPrerequisites.parameter.noSchema"></a>

- *Type:* boolean

---

##### `downloadProvider` <a name="downloadProvider" id="ci-mgmt-projen.ProviderActions.downloadProvider"></a>

```typescript
import { ProviderActions } from 'ci-mgmt-projen'

ProviderActions.downloadProvider(provider: string)
```

Download provider tarball artifact and extract it;

chmod binaries.

###### `provider`<sup>Required</sup> <a name="provider" id="ci-mgmt-projen.ProviderActions.downloadProvider.parameter.provider"></a>

- *Type:* string

---

##### `downloadSdk` <a name="downloadSdk" id="ci-mgmt-projen.ProviderActions.downloadSdk"></a>

```typescript
import { ProviderActions } from 'ci-mgmt-projen'

ProviderActions.downloadSdk(language: string)
```

Download a language SDK tarball into sdk/<lang> and extract it.

###### `language`<sup>Required</sup> <a name="language" id="ci-mgmt-projen.ProviderActions.downloadSdk.parameter.language"></a>

- *Type:* string

---

##### `setupTools` <a name="setupTools" id="ci-mgmt-projen.ProviderActions.setupTools"></a>

```typescript
import { ProviderActions } from 'ci-mgmt-projen'

ProviderActions.setupTools(options: SetupToolsOptions)
```

Returns steps to mirror base/.github/actions/setup-tools.

###### `options`<sup>Required</sup> <a name="options" id="ci-mgmt-projen.ProviderActions.setupTools.parameter.options"></a>

- *Type:* <a href="#ci-mgmt-projen.SetupToolsOptions">SetupToolsOptions</a>

---

##### `uploadPrerequisites` <a name="uploadPrerequisites" id="ci-mgmt-projen.ProviderActions.uploadPrerequisites"></a>

```typescript
import { ProviderActions } from 'ci-mgmt-projen'

ProviderActions.uploadPrerequisites(provider: string, noSchema?: boolean)
```

Upload prerequisites artifacts (bin/* and optional schema-embed.json).

###### `provider`<sup>Required</sup> <a name="provider" id="ci-mgmt-projen.ProviderActions.uploadPrerequisites.parameter.provider"></a>

- *Type:* string

---

###### `noSchema`<sup>Optional</sup> <a name="noSchema" id="ci-mgmt-projen.ProviderActions.uploadPrerequisites.parameter.noSchema"></a>

- *Type:* boolean

---

##### `uploadSdk` <a name="uploadSdk" id="ci-mgmt-projen.ProviderActions.uploadSdk"></a>

```typescript
import { ProviderActions } from 'ci-mgmt-projen'

ProviderActions.uploadSdk(language: string)
```

Upload a language SDK tarball from sdk/<lang>.

###### `language`<sup>Required</sup> <a name="language" id="ci-mgmt-projen.ProviderActions.uploadSdk.parameter.language"></a>

- *Type:* string

---



### ProviderWorkflowSteps <a name="ProviderWorkflowSteps" id="ci-mgmt-projen.ProviderWorkflowSteps"></a>

#### Initializers <a name="Initializers" id="ci-mgmt-projen.ProviderWorkflowSteps.Initializer"></a>

```typescript
import { ProviderWorkflowSteps } from 'ci-mgmt-projen'

new ProviderWorkflowSteps()
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |

---


#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#ci-mgmt-projen.ProviderWorkflowSteps.awsAuth">awsAuth</a></code> | *No description.* |
| <code><a href="#ci-mgmt-projen.ProviderWorkflowSteps.checkout">checkout</a></code> | *No description.* |
| <code><a href="#ci-mgmt-projen.ProviderWorkflowSteps.freeDiskSpace">freeDiskSpace</a></code> | *No description.* |
| <code><a href="#ci-mgmt-projen.ProviderWorkflowSteps.gcpAuth">gcpAuth</a></code> | *No description.* |
| <code><a href="#ci-mgmt-projen.ProviderWorkflowSteps.updatePath">updatePath</a></code> | *No description.* |

---

##### `awsAuth` <a name="awsAuth" id="ci-mgmt-projen.ProviderWorkflowSteps.awsAuth"></a>

```typescript
import { ProviderWorkflowSteps } from 'ci-mgmt-projen'

ProviderWorkflowSteps.awsAuth()
```

##### `checkout` <a name="checkout" id="ci-mgmt-projen.ProviderWorkflowSteps.checkout"></a>

```typescript
import { ProviderWorkflowSteps } from 'ci-mgmt-projen'

ProviderWorkflowSteps.checkout(options?: CheckoutOptions, checkoutAction?: string)
```

###### `options`<sup>Optional</sup> <a name="options" id="ci-mgmt-projen.ProviderWorkflowSteps.checkout.parameter.options"></a>

- *Type:* <a href="#ci-mgmt-projen.CheckoutOptions">CheckoutOptions</a>

---

###### `checkoutAction`<sup>Optional</sup> <a name="checkoutAction" id="ci-mgmt-projen.ProviderWorkflowSteps.checkout.parameter.checkoutAction"></a>

- *Type:* string

---

##### `freeDiskSpace` <a name="freeDiskSpace" id="ci-mgmt-projen.ProviderWorkflowSteps.freeDiskSpace"></a>

```typescript
import { ProviderWorkflowSteps } from 'ci-mgmt-projen'

ProviderWorkflowSteps.freeDiskSpace(action?: string)
```

###### `action`<sup>Optional</sup> <a name="action" id="ci-mgmt-projen.ProviderWorkflowSteps.freeDiskSpace.parameter.action"></a>

- *Type:* string

---

##### `gcpAuth` <a name="gcpAuth" id="ci-mgmt-projen.ProviderWorkflowSteps.gcpAuth"></a>

```typescript
import { ProviderWorkflowSteps } from 'ci-mgmt-projen'

ProviderWorkflowSteps.gcpAuth()
```

##### `updatePath` <a name="updatePath" id="ci-mgmt-projen.ProviderWorkflowSteps.updatePath"></a>

```typescript
import { ProviderWorkflowSteps } from 'ci-mgmt-projen'

ProviderWorkflowSteps.updatePath()
```



### TestJob <a name="TestJob" id="ci-mgmt-projen.TestJob"></a>

#### Initializers <a name="Initializers" id="ci-mgmt-projen.TestJob.Initializer"></a>

```typescript
import { TestJob } from 'ci-mgmt-projen'

new TestJob()
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |

---


#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#ci-mgmt-projen.TestJob.render">render</a></code> | *No description.* |

---

##### `render` <a name="render" id="ci-mgmt-projen.TestJob.render"></a>

```typescript
import { TestJob } from 'ci-mgmt-projen'

TestJob.render(options: TestJobConfig)
```

###### `options`<sup>Required</sup> <a name="options" id="ci-mgmt-projen.TestJob.render.parameter.options"></a>

- *Type:* <a href="#ci-mgmt-projen.TestJobConfig">TestJobConfig</a>

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#ci-mgmt-projen.TestJob.property.id">id</a></code> | <code>string</code> | *No description.* |

---

##### `id`<sup>Required</sup> <a name="id" id="ci-mgmt-projen.TestJob.property.id"></a>

```typescript
public readonly id: string;
```

- *Type:* string

---



