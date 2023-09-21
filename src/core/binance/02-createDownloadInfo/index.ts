import { DatasetsBinance } from '../types';

type CreateDownloadInfoParams = {
  datasetsBinance: DatasetsBinance;
  pathOutputDirectory: string;
};

export type CreateDownloadInfoReturn = ReadonlyArray<{
  dataUrl: string;
  targetPath: string;
  targetFolder: string;
}>;

const BASE_URL = 'https://data.binance.vision/data/spot/monthly/trades';

export const createDownloadInfo = ({
  datasetsBinance,
  pathOutputDirectory,
}: CreateDownloadInfoParams): CreateDownloadInfoReturn => {
  const dataUrlsNested = datasetsBinance.map(({ tradingPair, timeSpans }) => {
    const tradingPairFormatted = tradingPair.replace('-', '');

    return timeSpans.map(({ year, months }) =>
      months.map((month) => {
        const monthFormatted = String(month).padStart(2, '0');

        const dataFileName = `${tradingPairFormatted}-trades-${year.at(0)}-${monthFormatted}.zip`;

        const dataUrl = `${BASE_URL}/${tradingPairFormatted}/${dataFileName}`;

        const targetPath = `${pathOutputDirectory}/${tradingPairFormatted}/${dataFileName}`;

        const targetFolder = `${pathOutputDirectory}/${tradingPairFormatted}`;

        return { dataUrl, targetPath, targetFolder };
      }),
    );
  });

  const dataUrls = dataUrlsNested.flat(3);

  return dataUrls;
};
