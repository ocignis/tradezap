/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { cac } from 'cac';

import { DEFAULT_PATH_CONFIG_FILE } from 'common/consts';
import { VERSION_INFO } from 'common/utils';

type CliParseResult = {
  pathConfigFile: string;
  isRedownload: boolean;
  isVerbose: boolean;
};

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

  return {
    pathConfigFile: cliParams.options.config,
    isRedownload: cliParams.options.redownload,
    isVerbose: cliParams.options.verbose,
  };
};
