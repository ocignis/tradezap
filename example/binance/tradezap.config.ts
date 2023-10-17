import { TradezapConfig } from 'common/types';

const TRADEZAP_CONFIG: TradezapConfig = [
  {
    provider: 'binance',
    settings: {
      outputDirectory: 'example/binance/dataset',
      shouldUnzipDatasets: true,
    },
    datasets: [
      // Download AVAX-BUSD spot trades for:
      {
        asset: 'spot',
        assetType: 'trades',
        tradingPair: 'AVAX-BUSD',
        timeSpans: [
          // - 1st, 2nd and 3td of April and May for 2022 and 2023
          {
            period: 'daily',
            years: [2022, 2023],
            months: [4, 5],
            days: [1, 2, 3],
          },
          // - All days in October 2022
          {
            period: 'daily',
            years: [2022],
            months: [10],
            days: [],
          },
          // - Every 1st of the month in 2021
          {
            period: 'daily',
            years: [2021],
            months: [],
            days: [1],
          },
          // - Every 1st of March for all years available
          {
            period: 'daily',
            years: [],
            months: [3],
            days: [1],
          },
        ],
      },
      // Download ETH-BUSD daily spot trades for 1st of January 2021, 2022 and 2023
      {
        tradingPair: 'ETH-BUSD',
        asset: 'spot',
        assetType: 'trades',
        timeSpans: [
          {
            period: 'daily',
            years: [2021, 2022, 2023],
            months: [1],
            days: [1],
          },
        ],
      },
      // Download AVAX-BUSD monthly spot trades for August and September 2023
      {
        tradingPair: 'AVAX-BUSD',
        asset: 'spot',
        assetType: 'trades',
        timeSpans: [
          {
            period: 'monthly',
            years: [2023],
            months: [8, 9],
          },
        ],
      },
    ],
  },
];

export default TRADEZAP_CONFIG;
