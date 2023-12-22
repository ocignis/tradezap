/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { cac } from 'cac';

import { DEFAULT_PATH_CONFIG_FILE } from 'common/consts';
import { VERSION_INFO } from 'common/utils';

type CliOption = { nameLong?: string; nameShort?: string; description?: string };
type CliOptions = Record<string, CliOption>;

const CLI_OPTIONS = {
  config: { nameLong: 'config', nameShort: 'c', description: 'Custom config file' },
  redownload: { nameLong: 'redownload', description: 'Download and overwrite data again even if they already exist' },
  verbose: { nameLong: 'verbose', description: 'Verbose output' },
  help: { nameLong: 'help', nameShort: 'h' },
  version: { nameLong: 'version', nameShort: 'v' },
} as const satisfies CliOptions;

type CliParseResult = {
  shouldExitCli: boolean;
  pathConfigFile: string;
  isRedownload: boolean;
  isVerbose: boolean;
};

export const cliParse = (): CliParseResult => {
  const cli = cac('tradezap');

  cli.option(
    `-${CLI_OPTIONS.config.nameShort}, --${CLI_OPTIONS.config.nameLong} <filename>`,
    CLI_OPTIONS.config.description,
    {
      default: DEFAULT_PATH_CONFIG_FILE,
    },
  );

  cli.option(`--${CLI_OPTIONS.redownload.nameLong}`, CLI_OPTIONS.redownload.description, {
    default: false,
  });

  cli.option(`--${CLI_OPTIONS.verbose.nameLong}`, CLI_OPTIONS.verbose.description, {
    default: false,
  });

  cli.help();
  cli.version(VERSION_INFO);

  const cliParams = cli.parse();

  const unknownOptions = checkForUnknownOptions({
    cliOptions: CLI_OPTIONS,
    options: Object.keys(cliParams.options).filter((option) => option !== '--'),
  });
  if (unknownOptions.length > 0) {
    throw new Error(
      `Unknown ${unknownOptions.length === 1 ? 'option' : 'options'} passed to CLI: ${unknownOptions.join(', ')}.`,
    );
  }

  // console.log(JSON.stringify(cliParams, null, 2));

  return {
    shouldExitCli: cliParams.options.help || cliParams.options.version,
    pathConfigFile: cliParams.options.config,
    isRedownload: cliParams.options.redownload,
    isVerbose: cliParams.options.verbose,
  };
};

type CheckForUnknownOptionsParams = {
  cliOptions: CliOptions;
  options: ReadonlyArray<string>;
};

const checkForUnknownOptions = ({ cliOptions, options }: CheckForUnknownOptionsParams): ReadonlyArray<string> => {
  const allowedCliOptions = Object.values(cliOptions)
    .map((option) => [option.nameLong, option.nameShort])
    .flat()
    .filter((option) => option);

  const unknownOptions = options.filter((option) => !allowedCliOptions.includes(option));
  return unknownOptions;
};
