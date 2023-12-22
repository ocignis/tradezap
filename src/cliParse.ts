/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { cac } from 'cac';

import { DEFAULT_PATH_CONFIG_FILE } from 'common/consts';
import { VERSION_INFO } from 'common/utils';

type CliParseResult = {
  shouldExitCli: boolean;
  pathConfigFile: string;
  isRedownload: boolean;
  isVerbose: boolean;
};

const OPTIONS = ['c', 'config', 'redownload', 'verbose', 'h', 'help', 'v', 'version'] as const;

export const cliParse = (): CliParseResult => {
  const cli = cac('tradezap');

  cli.option('-c, --config <filename>', 'Custom config file', {
    default: DEFAULT_PATH_CONFIG_FILE,
  });

  cli.option('--redownload', 'Download and overwrite data again even if they already exist', {
    default: false,
  });

  cli.option('--verbose', 'Verbose output', {
    default: false,
  });

  cli.help();
  cli.version(VERSION_INFO);

  const cliParams = cli.parse();

  const unknownOptions = checkForUnknownOptions({
    allowedOptions: OPTIONS,
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
  allowedOptions: ReadonlyArray<string>;
  options: ReadonlyArray<string>;
};

const checkForUnknownOptions = ({ allowedOptions, options }: CheckForUnknownOptionsParams): ReadonlyArray<string> => {
  const unknownOptions = options.filter((option) => !allowedOptions.includes(option));
  return unknownOptions;
};
