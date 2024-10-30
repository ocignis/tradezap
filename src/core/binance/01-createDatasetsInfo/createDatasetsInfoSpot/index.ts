import { BASE_URL } from 'core/binance/consts';

import type { DatasetInfo, DatasetsInfo } from '..';
import type { DatasetBinanceSpot } from '../../types/spot';

import { createDatasetFilenames } from './createDatasetFilenames';

type CreateDatasetsInfoSpotParams = {
  dataset: DatasetBinanceSpot;
  pathOutputDirectory: string;
};

export const createDatasetsInfoSpot = ({
  dataset,
  pathOutputDirectory,
}: CreateDatasetsInfoSpotParams): DatasetsInfo => {
  const { asset, assetType, tradingPair, timeSpans } = dataset;

  const tradingPairFormatted = tradingPair.replace('-', '');
  const formattedAssetType = assetType === 'klines' ? dataset.interval : assetType;

  const datasetsInfo = timeSpans.flatMap((timeSpan) => {
    const datasetFilenames = createDatasetFilenames({ tradingPairFormatted, formattedAssetType, timeSpan });

    const datasetsInfoSingleTimeSpan = datasetFilenames.map((datasetFilename) => {
      const datasetUrlBase = `${BASE_URL}/${asset}/${timeSpan.period}/${assetType}/${tradingPairFormatted}`;
      const datasetUrl =
        assetType === 'klines'
          ? `${datasetUrlBase}/${dataset.interval}/${datasetFilename}`
          : `${datasetUrlBase}/${datasetFilename}`;

      const targetFolderBase = `${pathOutputDirectory}/${tradingPair}/${asset}/${assetType}/${timeSpan.period}`;
      const targetFolder = assetType === 'klines' ? `${targetFolderBase}/${dataset.interval}` : targetFolderBase;

      const targetPath = `${targetFolder}/${datasetFilename}`;

      const datasetInfo: DatasetInfo = { datasetUrl, targetPath, targetFolder, datasetFilename };

      return datasetInfo;
    });

    return datasetsInfoSingleTimeSpan;
  });
  return datasetsInfo;
};
