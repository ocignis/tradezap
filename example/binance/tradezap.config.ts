import { DatasetsBinance } from 'core/binance/types';

const DATASETS_BINANCE: DatasetsBinance = [
  {
    tradingPair: 'BTC-BUSD',
    timeSpans: [
      {
        year: [2023],
        months: [5],
      },
      // {
      //   year: [2022],
      //   months: [10, 11, 12],
      // },
      {
        year: [2021],
        months: [],
      },
    ],
  },
  {
    tradingPair: 'ETH-BUSD',
    timeSpans: [
      {
        year: [2023],
        months: [4, 11],
      },
    ],
  },
];

export default DATASETS_BINANCE;
