import { buildParne } from './parne/application/buildParne';
import { Parne } from './parne/domain/parne';

export const parne: {
  buildParne: () => Promise<Parne>
} = {
  buildParne
};
