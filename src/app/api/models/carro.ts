/* tslint:disable */
/* eslint-disable */
import { IEntidadeObject } from './i-entidade-object';
import { Tipo } from './tipo';
export interface Carro {
  ano?: number;
  compositePkEntidadeObject?: string;
  cor?: string;
  diaria?: number;
  foreignEntitiesMaps?: {
[key: string]: IEntidadeObject;
};
  id?: string;
  idHash?: string;
  imagem_id?: number;
  marca?: string;
  modelo?: string;
  new?: boolean;
  placa?: string;
  quilometragem?: number;
  status?: string;
  tabelaNome?: string;
  tipo?: Tipo;
}
