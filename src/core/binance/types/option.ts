import { TimeSpanDaily, TradingPair } from './common';

/**
 * Derivative contracts options.
 */
export type DatasetBinanceOption = {
  asset: 'option';
  optionType: 'bvol-index' | 'eoh-summary';
  tradingPair: TradingPair;
  timeSpans: ReadonlyArray<TimeSpanDaily>;
};
