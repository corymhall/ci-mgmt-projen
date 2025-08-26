import { JobStep } from 'projen/lib/github/workflows-model';

export interface ToolVersions {
  readonly go?: string;
  readonly pulumiCli?: string;
  readonly pulumiCtl?: string;
  readonly schemaTools?: string;
  readonly nodejs?: string;
  readonly python?: string;
  readonly dotnet?: string;
  readonly java?: string;
  readonly gradle?: string;
}

export interface SetupToolsOptions {
  readonly toolVersions?: ToolVersions;
  readonly tools?: string[];
  readonly cacheGo?: boolean;
  readonly installKubectl?: boolean;
}

export class ProviderActions {
  /**
   * Returns steps to mirror base/.github/actions/setup-tools.
   */
  public static setupTools(options: SetupToolsOptions): JobStep[] {
    const tv = options.toolVersions ?? {};
    const requested = new Set(options.tools ?? []);
    const includeAll = requested.size === 0;
    const want = (tool: string) => includeAll || requested.has(tool);

    const steps: JobStep[] = [];

    if (want('go')) {
      steps.push({
        name: 'Install Go',
        uses: 'actions/setup-go@v5',
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
    if (want('pulumictl')) {
      steps.push({
        name: 'Install pulumictl',
        uses: 'jaxxstorm/action-install-gh-release@v2.1.0',
        with: {
          tag: tv.pulumiCtl ?? '',
          repo: 'pulumi/pulumictl',
        },
      });
    }
    if (want('pulumicli')) {
      steps.push({
        name: 'Install Pulumi CLI',
        uses: 'pulumi/actions@v6',
        with: {
          'pulumi-version': tv.pulumiCli ?? 'dev',
        },
      });
    }
    if (want('schema-tools')) {
      steps.push({
        name: 'Install Schema Tools',
        uses: 'jaxxstorm/action-install-gh-release@v2.1.0',
        with: { repo: 'pulumi/schema-tools' },
      });
    }
    if (options.installKubectl) {
      steps.push({
        name: 'Install kubectl',
        uses: 'azure/setup-kubectl@v4',
        with: { version: 'latest' },
        id: 'install',
      });
    }
    if (want('nodejs')) {
      steps.push({
        name: 'Setup Node',
        uses: 'actions/setup-node@v4',
        with: {
          'node-version': tv.nodejs ?? '20.x',
          'registry-url': 'https://registry.npmjs.org',
        },
      });
    }
    if (want('dotnet')) {
      steps.push({
        name: 'Setup DotNet',
        uses: 'actions/setup-dotnet@v4.3.1',
        with: {
          'dotnet-version': tv.dotnet ?? '8.0.x',
        },
      });
    }
    if (want('python')) {
      steps.push({
        name: 'Setup Python',
        uses: 'actions/setup-python@v5.6.0',
        with: {
          'python-version': tv.python ?? '3.11.8',
        },
      });
    }
    if (want('java')) {
      steps.push({
        name: 'Setup Java',
        uses: 'actions/setup-java@v4.7.1',
        with: {
          cache: 'gradle',
          distribution: 'temurin',
          'java-version': tv.java ?? '11',
        },
      });
      steps.push({
        name: 'Setup Gradle',
        uses: 'gradle/actions/setup-gradle@v4.4.2',
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
  public static uploadPrerequisites(
    provider: string,
    noSchema?: boolean,
  ): JobStep[] {
    const upload = 'actions/upload-artifact@v4';
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
    if (!noSchema) {
      steps.push({
        name: 'Upload schema-embed.json',
        uses: upload,
        with: {
          name: 'schema-embed.json',
          path: `provider/cmd/pulumi-resource-${provider}/schema-embed.json`,
          'retention-days': 30,
        },
      });
    }
    return steps;
  }

  /**
   * Download prerequisites artifacts and restore permissions, optionally schema.
   */
  public static downloadPrerequisites(
    provider: string,
    noSchema?: boolean,
  ): JobStep[] {
    const download = 'actions/download-artifact@v4';
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
    if (!noSchema) {
      steps.push({
        name: 'Download schema-embed.json',
        uses: download,
        with: {
          // pattern mode to avoid failure if artifact is missing
          pattern: 'schema-embed.*',
          'merge-multiple': true,
          path: `provider/cmd/pulumi-resource-${provider}`,
        },
      });
    }
    return steps;
  }

  /**
   * Download provider tarball artifact and extract it; chmod binaries.
   */
  public static downloadProvider(provider: string): JobStep[] {
    const download = 'actions/download-artifact@v4';
    return [
      {
        name: `Download pulumi-resource-${provider}`,
        uses: download,
        with: {
          pattern: `pulumi-resource-${provider}-*-linux-amd64.tar.gz`,
          path: '${{ github.workspace }}/bin',
          'merge-multiple': true,
        },
      },
      {
        name: `Untar pulumi-resource-${provider}`,
        shell: 'bash',
        run: 'tar -zxf ${{ github.workspace }}/bin/*amd64.tar.gz -C ${{ github.workspace}}/bin',
      },
      {
        name: `Mark pulumi-resource-${provider} as executable`,
        shell: 'bash',
        run: `find $\{{ github.workspace }} -name "pulumi-*-${provider}" -print -exec chmod +x {} \;`,
      },
    ];
  }

  /**
   * Upload a language SDK tarball from sdk/<lang>.
   */
  public static uploadSdk(language: string): JobStep[] {
    const upload = 'actions/upload-artifact@v4';
    return [
      {
        name: 'Compress SDK folder',
        shell: 'bash',
        run: `tar -zcf sdk/${language}.tar.gz -C sdk/${language} .`,
      },
      {
        name: 'Upload artifacts',
        uses: upload,
        with: {
          name: `${language}-sdk.tar.gz`,
          path: `$\{{ github.workspace}}/sdk/${language}.tar.gz`,
          'retention-days': 30,
        },
      },
    ];
  }

  /**
   * Download a language SDK tarball into sdk/<lang> and extract it.
   */
  public static downloadSdk(language: string): JobStep[] {
    const download = 'actions/download-artifact@v4';
    return [
      {
        name: 'Download SDK',
        uses: download,
        with: {
          name: `${language}-sdk.tar.gz`,
          path: '${{ github.workspace}}/sdk/',
        },
      },
      {
        name: 'Uncompress SDK folder',
        shell: 'bash',
        run: `mkdir -p sdk/${language} && tar -zxf $GITHUB_WORKSPACE/sdk/${language}.tar.gz -C $GITHUB_WORKSPACE/sdk/${language}`,
      },
    ];
  }
}
