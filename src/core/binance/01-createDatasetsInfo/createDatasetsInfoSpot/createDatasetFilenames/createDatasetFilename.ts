import type { Day, Month, Year } from 'core/binance/types/common';

import type { FormattedAssetType } from '.';

type CreateDatasetFilenameParams = {
  tradingPairFormatted: string;
  assetType: FormattedAssetType;
  year: Year;
  month: Month;
  day: Day | null;
};

export const createDatasetFilename = ({
  tradingPairFormatted,
  assetType,
  year,
  month,
  day,
}: CreateDatasetFilenameParams) => {
  const monthFormatted = String(month).padStart(2, '0');

  const datasetFilenameBase = `${tradingPairFormatted}-${assetType}-${year}-${monthFormatted}` as const;

  if (day === null) {
    const datasetFilenameMonthly = `${datasetFilenameBase}.zip` as const;
    return datasetFilenameMonthly;
  }

  const dayFormatted = String(day).padStart(2, '0');

  const datasetFilenameDaily = `${datasetFilenameBase}-${dayFormatted}.zip` as const;

  return datasetFilenameDaily;
};
