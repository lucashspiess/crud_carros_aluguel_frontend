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

import { AluguelDto } from '../models/aluguel-dto';

@Injectable({
  providedIn: 'root',
})
export class AluguelControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation alterarAluguel
   */
  static readonly AlterarAluguelPath = '/api/v1/aluguel/{id}';

  /**
   * Método utilizado para alterar os dados de um aluguel
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `alterarAluguel()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  alterarAluguel$Response(params: {
    id: number;
    body: AluguelDto
  },
  context?: HttpContext

): Observable<StrictHttpResponse<AluguelDto>> {

    const rb = new RequestBuilder(this.rootUrl, AluguelControllerService.AlterarAluguelPath, 'put');
    if (params) {
      rb.path('id', params.id, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<AluguelDto>;
      })
    );
  }

  /**
   * Método utilizado para alterar os dados de um aluguel
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `alterarAluguel$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  alterarAluguel(params: {
    id: number;
    body: AluguelDto
  },
  context?: HttpContext

): Observable<AluguelDto> {

    return this.alterarAluguel$Response(params,context).pipe(
      map((r: StrictHttpResponse<AluguelDto>) => r.body as AluguelDto)
    );
  }

  /**
   * Path part for operation removerAluguel
   */
  static readonly RemoverAluguelPath = '/api/v1/aluguel/{id}';

  /**
   * Método utilizado para remover um aluguel pelo id informado
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `removerAluguel()` instead.
   *
   * This method doesn't expect any request body.
   */
  removerAluguel$Response(params: {
    id: number;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<any>> {

    const rb = new RequestBuilder(this.rootUrl, AluguelControllerService.RemoverAluguelPath, 'delete');
    if (params) {
      rb.path('id', params.id, {});
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
   * Método utilizado para remover um aluguel pelo id informado
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `removerAluguel$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  removerAluguel(params: {
    id: number;
  },
  context?: HttpContext

): Observable<any> {

    return this.removerAluguel$Response(params,context).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

  /**
   * Path part for operation obterPelaPlaca
   */
  static readonly ObterPelaPlacaPath = '/api/v1/aluguel/{placa}';

  /**
   * Inclusão de aluguel
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `obterPelaPlaca()` instead.
   *
   * This method doesn't expect any request body.
   */
  obterPelaPlaca$Response(params: {
    placa: string;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<AluguelDto>> {

    const rb = new RequestBuilder(this.rootUrl, AluguelControllerService.ObterPelaPlacaPath, 'get');
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
        return r as StrictHttpResponse<AluguelDto>;
      })
    );
  }

  /**
   * Inclusão de aluguel
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `obterPelaPlaca$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  obterPelaPlaca(params: {
    placa: string;
  },
  context?: HttpContext

): Observable<AluguelDto> {

    return this.obterPelaPlaca$Response(params,context).pipe(
      map((r: StrictHttpResponse<AluguelDto>) => r.body as AluguelDto)
    );
  }

  /**
   * Path part for operation incluirAluguel
   */
  static readonly IncluirAluguelPath = '/api/v1/aluguel/{placa}';

  /**
   * Inclusão de aluguel
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `incluirAluguel()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  incluirAluguel$Response(params: {
    placa: string;
    body: AluguelDto
  },
  context?: HttpContext

): Observable<StrictHttpResponse<AluguelDto>> {

    const rb = new RequestBuilder(this.rootUrl, AluguelControllerService.IncluirAluguelPath, 'post');
    if (params) {
      rb.path('placa', params.placa, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<AluguelDto>;
      })
    );
  }

  /**
   * Inclusão de aluguel
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `incluirAluguel$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  incluirAluguel(params: {
    placa: string;
    body: AluguelDto
  },
  context?: HttpContext

): Observable<AluguelDto> {

    return this.incluirAluguel$Response(params,context).pipe(
      map((r: StrictHttpResponse<AluguelDto>) => r.body as AluguelDto)
    );
  }

  /**
   * Path part for operation listAllAluguel
   */
  static readonly ListAllAluguelPath = '/api/v1/aluguel/listar';

  /**
   * Listagem Geral
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `listAllAluguel()` instead.
   *
   * This method doesn't expect any request body.
   */
  listAllAluguel$Response(params?: {
  },
  context?: HttpContext

): Observable<StrictHttpResponse<any>> {

    const rb = new RequestBuilder(this.rootUrl, AluguelControllerService.ListAllAluguelPath, 'get');
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
   * To access the full response (for headers, for example), `listAllAluguel$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  listAllAluguel(params?: {
  },
  context?: HttpContext

): Observable<any> {

    return this.listAllAluguel$Response(params,context).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

}
