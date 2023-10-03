/* tslint:disable */
/* eslint-disable */
import { IEntidadeObject } from './i-entidade-object';
export interface Imagem {
  caminhoArq?: string;
  caminhoFront?: string;
  compositePkEntidadeObject?: number;
  foreignEntitiesMaps?: {
[key: string]: IEntidadeObject;
};
  id?: number;
  idHash?: string;
  new?: boolean;
  nome?: string;
  pathReference?: string;
  tabelaNome?: string;
  tipo?: string;
}
