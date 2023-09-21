import { DatasetBinance } from 'core/types';

const DATASET_BINANCE: DatasetBinance = [
  {
    tradingPair: 'BTC-BUSD',
    timeSpans: [
      {
        year: [2023],
        months: [5],
      },
      {
        year: [2022],
        months: [9, 10, 11, 12],
      },
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
        months: [9, 10, 11],
      },
    ],
  },
];

export default DATASET_BINANCE;
