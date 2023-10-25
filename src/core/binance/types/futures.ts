import type { TimeSpanDaily, TimeSpanMonthly, TradingPair } from './common';

/**
 * Derivative contracts futures.
 */
export type DatasetBinanceFutures = DatasetBinanceFuturesDaily | DatasetBinanceFuturesMonthly;

type DatasetBinanceFuturesBase = {
  asset: 'futures';
  /**
   * CM - COIN-M | UM - USDT-M
   */
  futuresType: 'cm' | 'um';
  assetType:
    | 'aggTrades'
    | 'bookTicker'
    | 'fundingRate'
    | 'indexPriceKlines'
    | 'klines'
    | 'markPriceKlines'
    | 'premiumIndexKlines'
    | 'trades';
  tradingPair: TradingPair;
};

type DatasetBinanceFuturesDaily = DatasetBinanceFuturesBase & {
  period: 'daily';
  timeSpans: ReadonlyArray<TimeSpanDaily>;
};

type DatasetBinanceFuturesMonthly = DatasetBinanceFuturesBase & {
  period: 'monthly';
  timeSpans: ReadonlyArray<TimeSpanMonthly>;
};
