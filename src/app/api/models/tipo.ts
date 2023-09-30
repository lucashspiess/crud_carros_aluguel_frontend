/* tslint:disable */
/* eslint-disable */
import { IEntidadeObject } from './i-entidade-object';
export interface Tipo {
  compositePkEntidadeObject?: number;
  descricao?: string;
  foreignEntitiesMaps?: {
[key: string]: IEntidadeObject;
};
  id?: number;
  idHash?: string;
  new?: boolean;
  nome?: string;
  tabelaNome?: string;
}
