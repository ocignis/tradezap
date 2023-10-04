import { TradezapConfigBinance } from 'core/binance/types';

type TradezapConfigSingle = TradezapConfigBinance;
export type TradezapConfig = ReadonlyArray<TradezapConfigSingle>;
