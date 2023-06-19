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
   * Path part for operation alterarCarro
   */
  static readonly AlterarCarroPath = '/api/v1/carro/{placa}';

  /**
   * Método utilizado para alterar os dados de um carro
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `alterarCarro()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  alterarCarro$Response(params: {
    placa: string;
    body: CarroIncluirDto
  },
  context?: HttpContext

): Observable<StrictHttpResponse<CarroDto>> {

    const rb = new RequestBuilder(this.rootUrl, CarroControllerService.AlterarCarroPath, 'put');
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
   * To access the full response (for headers, for example), `alterarCarro$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  alterarCarro(params: {
    placa: string;
    body: CarroIncluirDto
  },
  context?: HttpContext

): Observable<CarroDto> {

    return this.alterarCarro$Response(params,context).pipe(
      map((r: StrictHttpResponse<CarroDto>) => r.body as CarroDto)
    );
  }

  /**
   * Path part for operation removerCarro
   */
  static readonly RemoverCarroPath = '/api/v1/carro/{placa}';

  /**
   * Método utilizado para remover uma entidiade pela placa informada
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `removerCarro()` instead.
   *
   * This method doesn't expect any request body.
   */
  removerCarro$Response(params: {
    placa: string;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<any>> {

    const rb = new RequestBuilder(this.rootUrl, CarroControllerService.RemoverCarroPath, 'delete');
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
   * To access the full response (for headers, for example), `removerCarro$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  removerCarro(params: {
    placa: string;
  },
  context?: HttpContext

): Observable<any> {

    return this.removerCarro$Response(params,context).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

  /**
   * Path part for operation incluirCarro
   */
  static readonly IncluirCarroPath = '/api/v1/carro';

  /**
   * Inclusão de carro
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `incluirCarro()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  incluirCarro$Response(params: {
    body: CarroIncluirDto
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Carro>> {

    const rb = new RequestBuilder(this.rootUrl, CarroControllerService.IncluirCarroPath, 'post');
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
   * To access the full response (for headers, for example), `incluirCarro$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  incluirCarro(params: {
    body: CarroIncluirDto
  },
  context?: HttpContext

): Observable<Carro> {

    return this.incluirCarro$Response(params,context).pipe(
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
   * Path part for operation listAllCarro
   */
  static readonly ListAllCarroPath = '/api/v1/carro/listar';

  /**
   * Listagem Geral
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `listAllCarro()` instead.
   *
   * This method doesn't expect any request body.
   */
  listAllCarro$Response(params?: {
  },
  context?: HttpContext

): Observable<StrictHttpResponse<any>> {

    const rb = new RequestBuilder(this.rootUrl, CarroControllerService.ListAllCarroPath, 'get');
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
   * To access the full response (for headers, for example), `listAllCarro$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  listAllCarro(params?: {
  },
  context?: HttpContext

): Observable<any> {

    return this.listAllCarro$Response(params,context).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

}
