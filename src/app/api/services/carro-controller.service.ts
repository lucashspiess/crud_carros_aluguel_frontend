/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpContext } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { Carro } from '../models/carro';
import { CarroDto } from '../models/carro-dto';
import { CarroIncluirDto } from '../models/carro-incluir-dto';

@Injectable({
  providedIn: 'root',
})
export class CarroControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation obterPorPlaca
   */
  static readonly ObterPorPlacaPath = '/api/v1/carro/{placa}';

  /**
   * Método para retornar um carro pela placa
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `obterPorPlaca()` instead.
   *
   * This method doesn't expect any request body.
   */
  obterPorPlaca$Response(params: {
    placa: string;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<CarroDto>> {

    const rb = new RequestBuilder(this.rootUrl, CarroControllerService.ObterPorPlacaPath, 'get');
    if (params) {
      rb.path('placa', params.placa, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CarroDto>;
      })
    );
  }

  /**
   * Método para retornar um carro pela placa
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `obterPorPlaca$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  obterPorPlaca(params: {
    placa: string;
  },
  context?: HttpContext

): Observable<CarroDto> {

    return this.obterPorPlaca$Response(params,context).pipe(
      map((r: StrictHttpResponse<CarroDto>) => r.body as CarroDto)
    );
  }

  /**
   * Path part for operation alterar
   */
  static readonly AlterarPath = '/api/v1/carro/{placa}';

  /**
   * Método utilizado para alterar os dados de um carro
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `alterar()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  alterar$Response(params: {
    placa: string;
    body: CarroIncluirDto
  },
  context?: HttpContext

): Observable<StrictHttpResponse<CarroDto>> {

    const rb = new RequestBuilder(this.rootUrl, CarroControllerService.AlterarPath, 'put');
    if (params) {
      rb.path('placa', params.placa, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CarroDto>;
      })
    );
  }

  /**
   * Método utilizado para alterar os dados de um carro
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `alterar$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  alterar(params: {
    placa: string;
    body: CarroIncluirDto
  },
  context?: HttpContext

): Observable<CarroDto> {

    return this.alterar$Response(params,context).pipe(
      map((r: StrictHttpResponse<CarroDto>) => r.body as CarroDto)
    );
  }

  /**
   * Path part for operation remover
   */
  static readonly RemoverPath = '/api/v1/carro/{placa}';

  /**
   * Método utilizado para remover uma entidiade pela placa informada
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `remover()` instead.
   *
   * This method doesn't expect any request body.
   */
  remover$Response(params: {
    placa: string;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<any>> {

    const rb = new RequestBuilder(this.rootUrl, CarroControllerService.RemoverPath, 'delete');
    if (params) {
      rb.path('placa', params.placa, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<any>;
      })
    );
  }

  /**
   * Método utilizado para remover uma entidiade pela placa informada
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `remover$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  remover(params: {
    placa: string;
  },
  context?: HttpContext

): Observable<any> {

    return this.remover$Response(params,context).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

  /**
   * Path part for operation incluir
   */
  static readonly IncluirPath = '/api/v1/carro';

  /**
   * Inclusão de carro
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `incluir()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  incluir$Response(params: {
    body: CarroIncluirDto
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Carro>> {

    const rb = new RequestBuilder(this.rootUrl, CarroControllerService.IncluirPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Carro>;
      })
    );
  }

  /**
   * Inclusão de carro
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `incluir$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  incluir(params: {
    body: CarroIncluirDto
  },
  context?: HttpContext

): Observable<Carro> {

    return this.incluir$Response(params,context).pipe(
      map((r: StrictHttpResponse<Carro>) => r.body as Carro)
    );
  }

  /**
   * Path part for operation desalugar
   */
  static readonly DesalugarPath = '/api/v1/carro/{placa}/desalugar-carro';

  /**
   * Método utilizado para desalugar um carro
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `desalugar()` instead.
   *
   * This method doesn't expect any request body.
   */
  desalugar$Response(params: {
    placa: string;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<CarroDto>> {

    const rb = new RequestBuilder(this.rootUrl, CarroControllerService.DesalugarPath, 'patch');
    if (params) {
      rb.path('placa', params.placa, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CarroDto>;
      })
    );
  }

  /**
   * Método utilizado para desalugar um carro
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `desalugar$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  desalugar(params: {
    placa: string;
  },
  context?: HttpContext

): Observable<CarroDto> {

    return this.desalugar$Response(params,context).pipe(
      map((r: StrictHttpResponse<CarroDto>) => r.body as CarroDto)
    );
  }

  /**
   * Path part for operation alugar
   */
  static readonly AlugarPath = '/api/v1/carro/{placa}/alugar-carro';

  /**
   * Método utilizado para alugar um carro
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `alugar()` instead.
   *
   * This method doesn't expect any request body.
   */
  alugar$Response(params: {
    placa: string;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<CarroDto>> {

    const rb = new RequestBuilder(this.rootUrl, CarroControllerService.AlugarPath, 'patch');
    if (params) {
      rb.path('placa', params.placa, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CarroDto>;
      })
    );
  }

  /**
   * Método utilizado para alugar um carro
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `alugar$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  alugar(params: {
    placa: string;
  },
  context?: HttpContext

): Observable<CarroDto> {

    return this.alugar$Response(params,context).pipe(
      map((r: StrictHttpResponse<CarroDto>) => r.body as CarroDto)
    );
  }

  /**
   * Path part for operation listAll
   */
  static readonly ListAllPath = '/api/v1/carro/listar';

  /**
   * Listagem Geral
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `listAll()` instead.
   *
   * This method doesn't expect any request body.
   */
  listAll$Response(params?: {
  },
  context?: HttpContext

): Observable<StrictHttpResponse<any>> {

    const rb = new RequestBuilder(this.rootUrl, CarroControllerService.ListAllPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<any>;
      })
    );
  }

  /**
   * Listagem Geral
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `listAll$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  listAll(params?: {
  },
  context?: HttpContext

): Observable<any> {

    return this.listAll$Response(params,context).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

}
