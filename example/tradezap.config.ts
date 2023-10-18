import { TradezapConfig } from 'common/types';

const TRADEZAP_CONFIG: TradezapConfig = [
  {
    provider: 'binance',
    settings: {
      outputDirectory: 'example/dataset',
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
      // Non existent data (will be reported as not found by CLI)
      {
        tradingPair: 'AVAX-BUSD',
        asset: 'spot',
        assetType: 'trades',
        timeSpans: [
          {
            period: 'daily',
            years: [2017],
            months: [1],
            days: [1],
          },
        ],
      },
      {
        asset: 'spot',
        assetType: 'aggTrades',
        tradingPair: 'AVAX-BUSD',
        timeSpans: [
          {
            period: 'daily',
            years: [2023],
            months: [10],
            days: [15],
          },
        ],
      },
      {
        asset: 'spot',
        assetType: 'klines',
        interval: '1m',
        tradingPair: 'AVAX-BUSD',
        timeSpans: [
          {
            period: 'daily',
            years: [2023],
            months: [10],
            days: [15],
          },
        ],
      },
      {
        asset: 'spot',
        assetType: 'klines',
        interval: '1h',
        tradingPair: 'AVAX-BUSD',
        timeSpans: [
          {
            period: 'daily',
            years: [2023],
            months: [10],
            days: [15],
          },
        ],
      },
      {
        asset: 'spot',
        assetType: 'klines',
        interval: '1d',
        tradingPair: 'AVAX-BUSD',
        timeSpans: [
          {
            period: 'monthly',
            years: [2023],
            months: [9],
          },
        ],
      },
      {
        asset: 'option',
        optionType: 'bvol-index',
        tradingPair: 'AVAX-BUSD',
        timeSpans: [
          {
            period: 'daily',
            years: [2023],
            months: [10],
            days: [15],
          },
        ],
      },
    ],
  },
];

export default TRADEZAP_CONFIG;
