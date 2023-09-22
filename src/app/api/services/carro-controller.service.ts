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
   * Path part for operation carroControllerObterPorPlaca
   */
  static readonly CarroControllerObterPorPlacaPath = '/api/v1/carro/{placa}';

  /**
   * Método para retornar um carro pela placa
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `carroControllerObterPorPlaca()` instead.
   *
   * This method doesn't expect any request body.
   */
  carroControllerObterPorPlaca$Response(params: {
    placa: string;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<CarroDto>> {

    const rb = new RequestBuilder(this.rootUrl, CarroControllerService.CarroControllerObterPorPlacaPath, 'get');
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
   * To access the full response (for headers, for example), `carroControllerObterPorPlaca$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  carroControllerObterPorPlaca(params: {
    placa: string;
  },
  context?: HttpContext

): Observable<CarroDto> {

    return this.carroControllerObterPorPlaca$Response(params,context).pipe(
      map((r: StrictHttpResponse<CarroDto>) => r.body as CarroDto)
    );
  }

  /**
   * Path part for operation carroControllerAlterarCarro
   */
  static readonly CarroControllerAlterarCarroPath = '/api/v1/carro/{placa}';

  /**
   * Método utilizado para alterar os dados de um carro
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `carroControllerAlterarCarro()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  carroControllerAlterarCarro$Response(params: {
    placa: string;
    body: CarroDto
  },
  context?: HttpContext

): Observable<StrictHttpResponse<CarroDto>> {

    const rb = new RequestBuilder(this.rootUrl, CarroControllerService.CarroControllerAlterarCarroPath, 'put');
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
   * To access the full response (for headers, for example), `carroControllerAlterarCarro$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  carroControllerAlterarCarro(params: {
    placa: string;
    body: CarroDto
  },
  context?: HttpContext

): Observable<CarroDto> {

    return this.carroControllerAlterarCarro$Response(params,context).pipe(
      map((r: StrictHttpResponse<CarroDto>) => r.body as CarroDto)
    );
  }

  /**
   * Path part for operation carroControllerRemoverCarro
   */
  static readonly CarroControllerRemoverCarroPath = '/api/v1/carro/{placa}';

  /**
   * Método utilizado para remover uma entidiade pela placa informada
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `carroControllerRemoverCarro()` instead.
   *
   * This method doesn't expect any request body.
   */
  carroControllerRemoverCarro$Response(params: {
    placa: string;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<any>> {

    const rb = new RequestBuilder(this.rootUrl, CarroControllerService.CarroControllerRemoverCarroPath, 'delete');
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
   * To access the full response (for headers, for example), `carroControllerRemoverCarro$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  carroControllerRemoverCarro(params: {
    placa: string;
  },
  context?: HttpContext

): Observable<any> {

    return this.carroControllerRemoverCarro$Response(params,context).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

  /**
   * Path part for operation carroControllerIncluirCarro
   */
  static readonly CarroControllerIncluirCarroPath = '/api/v1/carro';

  /**
   * Inclusão de carro
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `carroControllerIncluirCarro()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  carroControllerIncluirCarro$Response(params: {
    body: CarroDto
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Carro>> {

    const rb = new RequestBuilder(this.rootUrl, CarroControllerService.CarroControllerIncluirCarroPath, 'post');
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
   * To access the full response (for headers, for example), `carroControllerIncluirCarro$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  carroControllerIncluirCarro(params: {
    body: CarroDto
  },
  context?: HttpContext

): Observable<Carro> {

    return this.carroControllerIncluirCarro$Response(params,context).pipe(
      map((r: StrictHttpResponse<Carro>) => r.body as Carro)
    );
  }

  /**
   * Path part for operation carroControllerDesalugar
   */
  static readonly CarroControllerDesalugarPath = '/api/v1/carro/{placa}/desalugar-carro';

  /**
   * Método utilizado para desalugar um carro
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `carroControllerDesalugar()` instead.
   *
   * This method doesn't expect any request body.
   */
  carroControllerDesalugar$Response(params: {
    placa: string;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<CarroDto>> {

    const rb = new RequestBuilder(this.rootUrl, CarroControllerService.CarroControllerDesalugarPath, 'patch');
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
   * To access the full response (for headers, for example), `carroControllerDesalugar$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  carroControllerDesalugar(params: {
    placa: string;
  },
  context?: HttpContext

): Observable<CarroDto> {

    return this.carroControllerDesalugar$Response(params,context).pipe(
      map((r: StrictHttpResponse<CarroDto>) => r.body as CarroDto)
    );
  }

  /**
   * Path part for operation carroControllerAlugar
   */
  static readonly CarroControllerAlugarPath = '/api/v1/carro/{placa}/alugar-carro';

  /**
   * Método utilizado para alugar um carro
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `carroControllerAlugar()` instead.
   *
   * This method doesn't expect any request body.
   */
  carroControllerAlugar$Response(params: {
    placa: string;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<CarroDto>> {

    const rb = new RequestBuilder(this.rootUrl, CarroControllerService.CarroControllerAlugarPath, 'patch');
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
   * To access the full response (for headers, for example), `carroControllerAlugar$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  carroControllerAlugar(params: {
    placa: string;
  },
  context?: HttpContext

): Observable<CarroDto> {

    return this.carroControllerAlugar$Response(params,context).pipe(
      map((r: StrictHttpResponse<CarroDto>) => r.body as CarroDto)
    );
  }

  /**
   * Path part for operation carroControllerListAllCarro
   */
  static readonly CarroControllerListAllCarroPath = '/api/v1/carro/listar';

  /**
   * Listagem Geral
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `carroControllerListAllCarro()` instead.
   *
   * This method doesn't expect any request body.
   */
  carroControllerListAllCarro$Response(params?: {
  },
  context?: HttpContext

): Observable<StrictHttpResponse<any>> {

    const rb = new RequestBuilder(this.rootUrl, CarroControllerService.CarroControllerListAllCarroPath, 'get');
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
   * To access the full response (for headers, for example), `carroControllerListAllCarro$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  carroControllerListAllCarro(params?: {
  },
  context?: HttpContext

): Observable<any> {

    return this.carroControllerListAllCarro$Response(params,context).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

}
