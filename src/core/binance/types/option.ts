import { TimeSpanDaily, TradingPair } from './common';

/**
 * Derivative contracts options.
 */
export type DatasetBinanceOption = DatasetBinanceOptionDaily;

type DatasetBinanceOptionBase = {
  asset: 'option';
  optionType: 'bvol-index' | 'eoh-summary';
  tradingPair: TradingPair;
};

type DatasetBinanceOptionDaily = DatasetBinanceOptionBase & {
  period: 'daily';
  timeSpans: ReadonlyArray<TimeSpanDaily>;
};
