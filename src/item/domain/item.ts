import { Amount } from '../../amount/domain/amount';

export interface Item {
  name: string;
  amounts: Amount[];
}
