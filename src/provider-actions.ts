import { JobStep } from 'projen/lib/github/workflows-model';
export enum Tool {
  GO = 'go',
  PULUMI_CLI = 'pulumicli',
  PULUMI_CTL = 'pulumictl',
  SCHEMA_TOOLS = 'schema-tools',
  NODEJS = 'nodejs',
  PYTHON = 'python',
  DOTNET = 'dotnet',
  JAVA = 'java',
}

export interface ToolVersions {
  go?: string;
  pulumiCli?: string;
  pulumiCtl?: string;
  schemaTools?: string;
  nodejs?: string;
  python?: string;
  dotnet?: string;
  java?: string;
  gradle?: string;
}

export interface SetupToolsActionVersions {
  setupGo?: string; // actions/setup-go@<sha>
  installGhRelease?: string; // jaxxstorm/action-install-gh-release@<sha>
  pulumiActions?: string; // pulumi/actions@<sha>
  setupNode?: string; // actions/setup-node@<sha>
  setupDotnet?: string; // actions/setup-dotnet@<sha>
  setupPython?: string; // actions/setup-python@<sha>
  setupJava?: string; // actions/setup-java@<sha>
  setupGradle?: string; // gradle/actions/setup-gradle@<sha>
  setupKubectl?: string; // azure/setup-kubectl@v4
}

export interface ProviderActionVersions {
  uploadArtifact?: string; // actions/upload-artifact@<sha>
  downloadArtifact?: string; // actions/download-artifact@<sha>
}

export class ProviderActions {
  /**
   * Returns steps to mirror base/.github/actions/setup-tools.
   */
  public static setupTools(options: {
    actionVersions?: SetupToolsActionVersions;
    toolVersions?: ToolVersions;
    tools?: Tool[];
    cacheGo?: boolean;
    installKubectl?: boolean;
  }): JobStep[] {
    const av = options.actionVersions ?? {};
    const tv = options.toolVersions ?? {};
    const requested = new Set(options.tools ?? []);
    const includeAll = requested.size === 0;
    const want = (tool: Tool) => includeAll || requested.has(tool);

    const steps: JobStep[] = [];

    if (want(Tool.GO)) {
      steps.push({
        name: 'Install Go',
        uses: av.setupGo ?? 'actions/setup-go@v5',
        with: {
          'go-version': tv.go ?? '1.21.x',
          'cache-dependency-path': [
            'provider/*.sum',
            'upstream/*.sum',
            'sdk/go/*.sum',
            'sdk/*.sum',
            '*.sum',
          ].join('\n'),
          cache: options.cacheGo ?? true,
        },
      });
    }
    if (want(Tool.PULUMI_CTL)) {
      steps.push({
        name: 'Install pulumictl',
        uses:
          av.installGhRelease ?? 'jaxxstorm/action-install-gh-release@v2.1.0',
        with: {
          tag: tv.pulumiCtl ?? '',
          repo: 'pulumi/pulumictl',
        },
      });
    }
    if (want(Tool.PULUMI_CLI)) {
      steps.push({
        name: 'Install Pulumi CLI',
        uses: av.pulumiActions ?? 'pulumi/actions@v6',
        with: {
          'pulumi-version': tv.pulumiCli ?? 'dev',
        },
      });
    }
    if (want(Tool.SCHEMA_TOOLS)) {
      steps.push({
        name: 'Install Schema Tools',
        uses:
          av.installGhRelease ?? 'jaxxstorm/action-install-gh-release@v2.1.0',
        with: { repo: 'pulumi/schema-tools' },
      });
    }
    if (options.installKubectl) {
      steps.push({
        name: 'Install kubectl',
        uses: av.setupKubectl ?? 'azure/setup-kubectl@v4',
        with: { version: 'latest' },
        id: 'install',
      });
    }
    if (want(Tool.NODEJS)) {
      steps.push({
        name: 'Setup Node',
        uses: av.setupNode ?? 'actions/setup-node@v4',
        with: {
          'node-version': tv.nodejs ?? '20.x',
          'registry-url': 'https://registry.npmjs.org',
        },
      });
    }
    if (want(Tool.DOTNET)) {
      steps.push({
        name: 'Setup DotNet',
        uses: av.setupDotnet ?? 'actions/setup-dotnet@v4.3.1',
        with: {
          'dotnet-version': tv.dotnet ?? '8.0.x',
        },
      });
    }
    if (want(Tool.PYTHON)) {
      steps.push({
        name: 'Setup Python',
        uses: av.setupPython ?? 'actions/setup-python@v5.6.0',
        with: {
          'python-version': tv.python ?? '3.11.8',
        },
      });
    }
    if (want(Tool.JAVA)) {
      steps.push({
        name: 'Setup Java',
        uses: av.setupJava ?? 'actions/setup-java@v4.7.1',
        with: {
          cache: 'gradle',
          distribution: 'temurin',
          'java-version': tv.java ?? '11',
        },
      });
      steps.push({
        name: 'Setup Gradle',
        uses: av.setupGradle ?? 'gradle/actions/setup-gradle@v4.4.2',
        with: {
          'gradle-version': tv.gradle ?? '7.6',
        },
      });
    }
    return steps;
  }

  /**
   * Upload prerequisites artifacts (bin/* and optional schema-embed.json)
   */
  public static uploadPrerequisites(options: {
    provider: string;
    noSchema?: boolean;
    versions?: ProviderActionVersions;
  }): JobStep[] {
    const upload =
      options.versions?.uploadArtifact ?? 'actions/upload-artifact@v4';
    const steps: JobStep[] = [
      {
        name: 'Capture executable permissions',
        shell: 'bash',
        run: 'find bin -type f -executable > bin/executables.txt',
      },
      {
        name: 'Upload prerequisites bin',
        uses: upload,
        with: {
          name: 'prerequisites-bin',
          path: 'bin/*',
          'retention-days': 30,
        },
      },
    ];
    if (!options.noSchema) {
      steps.push({
        name: 'Upload schema-embed.json',
        uses: upload,
        with: {
          name: 'schema-embed.json',
          path: `provider/cmd/pulumi-resource-${options.provider}/schema-embed.json`,
          'retention-days': 30,
        },
      });
    }
    return steps;
  }

  /**
   * Download prerequisites artifacts and restore permissions, optionally schema.
   */
  public static downloadPrerequisites(options: {
    provider: string;
    noSchema?: boolean;
    versions?: ProviderActionVersions;
  }): JobStep[] {
    const download =
      options.versions?.downloadArtifact ?? 'actions/download-artifact@v4';
    const steps: JobStep[] = [
      {
        name: 'Download the prerequisites bin',
        uses: download,
        with: {
          name: 'prerequisites-bin',
          path: 'bin',
        },
      },
      {
        name: 'Restore executable permissions',
        shell: 'bash',
        run: 'chmod +x $(< bin/executables.txt)',
      },
      {
        name: 'Remove executables list',
        shell: 'bash',
        run: 'rm bin/executables.txt',
      },
    ];
    if (!options.noSchema) {
      steps.push({
        name: 'Download schema-embed.json',
        uses: download,
        with: {
          // pattern mode to avoid failure if artifact is missing
          pattern: 'schema-embed.*',
          'merge-multiple': true,
          path: `provider/cmd/pulumi-resource-${options.provider}`,
        },
      });
    }
    return steps;
  }

  /**
   * Download provider tarball artifact and extract it; chmod binaries.
   */
  public static downloadProvider(options: {
    provider: string;
    versions?: ProviderActionVersions;
  }): JobStep[] {
    const download =
      options.versions?.downloadArtifact ?? 'actions/download-artifact@v4';
    return [
      {
        name: `Download pulumi-resource-${options.provider}`,
        uses: download,
        with: {
          pattern: `pulumi-resource-${options.provider}-*-linux-amd64.tar.gz`,
          path: '${{ github.workspace }}/bin',
          'merge-multiple': true,
        },
      },
      {
        name: `Untar pulumi-resource-${options.provider}`,
        shell: 'bash',
        run: 'tar -zxf ${{ github.workspace }}/bin/*amd64.tar.gz -C ${{ github.workspace}}/bin',
      },
      {
        name: `Mark pulumi-resource-${options.provider} as executable`,
        shell: 'bash',
        run: `find $\{{ github.workspace }} -name "pulumi-*-${options.provider}" -print -exec chmod +x {} \;`,
      },
    ];
  }

  /**
   * Upload a language SDK tarball from sdk/<lang>.
   */
  public static uploadSdk(options: {
    language: 'nodejs' | 'python' | 'dotnet' | 'go' | 'java';
    versions?: ProviderActionVersions;
  }): JobStep[] {
    const upload =
      options.versions?.uploadArtifact ?? 'actions/upload-artifact@v4';
    return [
      {
        name: 'Compress SDK folder',
        shell: 'bash',
        run: `tar -zcf sdk/${options.language}.tar.gz -C sdk/${options.language} .`,
      },
      {
        name: 'Upload artifacts',
        uses: upload,
        with: {
          name: `${options.language}-sdk.tar.gz`,
          path: `$\{{ github.workspace}}/sdk/${options.language}.tar.gz`,
          'retention-days': 30,
        },
      },
    ];
  }

  /**
   * Download a language SDK tarball into sdk/<lang> and extract it.
   */
  public static downloadSdk(options: {
    language: 'nodejs' | 'python' | 'dotnet' | 'go' | 'java';
    versions?: ProviderActionVersions;
  }): JobStep[] {
    const download =
      options.versions?.downloadArtifact ?? 'actions/download-artifact@v4';
    return [
      {
        name: 'Download SDK',
        uses: download,
        with: {
          name: `${options.language}-sdk.tar.gz`,
          path: '${{ github.workspace}}/sdk/',
        },
      },
      {
        name: 'Uncompress SDK folder',
        shell: 'bash',
        run: `mkdir -p sdk/${options.language} && tar -zxf $GITHUB_WORKSPACE/sdk/${options.language}.tar.gz -C $GITHUB_WORKSPACE/sdk/${options.language}`,
      },
    ];
  }
}
