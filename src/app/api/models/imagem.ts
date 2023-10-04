/* tslint:disable */
/* eslint-disable */
import { IEntidadeObject } from './i-entidade-object';
export interface Imagem {
  compositePkEntidadeObject?: number;
  foreignEntitiesMaps?: {
[key: string]: IEntidadeObject;
};
  id?: number;
  idHash?: string;
  img?: Array<string>;
  new?: boolean;
  tabelaNome?: string;
}
