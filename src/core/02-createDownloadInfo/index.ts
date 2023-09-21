import { DatasetBinance } from '../types';

type CreateDownloadInfoParams = {
  datasetBinance: DatasetBinance;
  pathOutputDirectory: string;
};

export type CreateDownloadInfoReturn = ReadonlyArray<{
  dataUrl: string;
  targetPath: string;
  targetFolder: string;
}>;

const BASE_URL = 'https://data.binance.vision/data/spot/monthly/trades';

export const createDownloadInfo = ({
  datasetBinance,
  pathOutputDirectory,
}: CreateDownloadInfoParams): CreateDownloadInfoReturn => {
  const dataUrlsNested = datasetBinance.map(({ tradingPair, timeSpans }) =>
    timeSpans.map(({ year, months }) =>
      months.map((month) => {
        const dataFileName = `${tradingPair}-trades-${year.at(0)}-${month}.zip`;

        const dataUrl = `${BASE_URL}/${tradingPair}/${dataFileName}`;

        const targetPath = `${pathOutputDirectory}/${tradingPair}/${dataFileName}`;

        const targetFolder = `${pathOutputDirectory}/${tradingPair}`;

        return { dataUrl, targetPath, targetFolder };
      }),
    ),
  );

  const dataUrls = dataUrlsNested.flat(3);

  return dataUrls;
};
