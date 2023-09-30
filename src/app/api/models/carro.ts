/* tslint:disable */
/* eslint-disable */
import { IEntidadeObject } from './i-entidade-object';
import { Tipo } from './tipo';
export interface Carro {
  ano?: number;
  cor?: string;
  diaria?: number;
  foreignEntitiesMaps?: {
[key: string]: IEntidadeObject;
};
  id?: {
};
  idHash?: string;
  marca?: string;
  modelo?: string;
  new?: boolean;
  placa?: string;
  quilometragem?: number;
  status?: string;
  tabelaNome?: string;
  tipo?: Tipo;
}
