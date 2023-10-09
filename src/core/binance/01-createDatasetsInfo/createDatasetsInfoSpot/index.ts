import { DatasetsInfo } from '..';
import { DatasetBinanceSpot } from '../../types/spot';

import { createDatasetsInfoSpotTimeSpan } from './createDatasetsInfoSpotTimeSpan';

type createDatasetsInfoSpotParams = {
  dataset: DatasetBinanceSpot;
  pathOutputDirectory: string;
};

export const createDatasetsInfoSpot = ({
  dataset,
  pathOutputDirectory,
}: createDatasetsInfoSpotParams): DatasetsInfo => {
  const { asset, assetType, tradingPair, timeSpans } = dataset;

  const tradingPairFormatted = tradingPair.replace('-', '');

  const datasetsInfo = timeSpans.flatMap((timeSpan) => {
    const datasetInfo = createDatasetsInfoSpotTimeSpan({
      timeSpan,
      pathOutputDirectory,
      tradingPair: tradingPairFormatted,
      assetType,
      asset,
    });
    return datasetInfo;
  });

  return datasetsInfo;
};
