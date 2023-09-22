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
   * Path part for operation aluguelControllerAlterarAluguel
   */
  static readonly AluguelControllerAlterarAluguelPath = '/api/v1/aluguel/{id}';

  /**
   * Método utilizado para alterar os dados de um aluguel
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `aluguelControllerAlterarAluguel()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  aluguelControllerAlterarAluguel$Response(params: {
    id: number;
    body: AluguelDto
  },
  context?: HttpContext

): Observable<StrictHttpResponse<AluguelDto>> {

    const rb = new RequestBuilder(this.rootUrl, AluguelControllerService.AluguelControllerAlterarAluguelPath, 'put');
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
   * To access the full response (for headers, for example), `aluguelControllerAlterarAluguel$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  aluguelControllerAlterarAluguel(params: {
    id: number;
    body: AluguelDto
  },
  context?: HttpContext

): Observable<AluguelDto> {

    return this.aluguelControllerAlterarAluguel$Response(params,context).pipe(
      map((r: StrictHttpResponse<AluguelDto>) => r.body as AluguelDto)
    );
  }

  /**
   * Path part for operation aluguelControllerRemoverAluguel
   */
  static readonly AluguelControllerRemoverAluguelPath = '/api/v1/aluguel/{id}';

  /**
   * Método utilizado para remover um aluguel pelo id informado
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `aluguelControllerRemoverAluguel()` instead.
   *
   * This method doesn't expect any request body.
   */
  aluguelControllerRemoverAluguel$Response(params: {
    id: number;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<any>> {

    const rb = new RequestBuilder(this.rootUrl, AluguelControllerService.AluguelControllerRemoverAluguelPath, 'delete');
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
   * To access the full response (for headers, for example), `aluguelControllerRemoverAluguel$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  aluguelControllerRemoverAluguel(params: {
    id: number;
  },
  context?: HttpContext

): Observable<any> {

    return this.aluguelControllerRemoverAluguel$Response(params,context).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

  /**
   * Path part for operation aluguelControllerIncluirAluguel
   */
  static readonly AluguelControllerIncluirAluguelPath = '/api/v1/aluguel/{placa}/{cpf}';

  /**
   * Inclusão de aluguel
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `aluguelControllerIncluirAluguel()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  aluguelControllerIncluirAluguel$Response(params: {
    placa: string;
    cpf: number;
    body: AluguelDto
  },
  context?: HttpContext

): Observable<StrictHttpResponse<AluguelDto>> {

    const rb = new RequestBuilder(this.rootUrl, AluguelControllerService.AluguelControllerIncluirAluguelPath, 'post');
    if (params) {
      rb.path('placa', params.placa, {});
      rb.path('cpf', params.cpf, {});
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
   * To access the full response (for headers, for example), `aluguelControllerIncluirAluguel$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  aluguelControllerIncluirAluguel(params: {
    placa: string;
    cpf: number;
    body: AluguelDto
  },
  context?: HttpContext

): Observable<AluguelDto> {

    return this.aluguelControllerIncluirAluguel$Response(params,context).pipe(
      map((r: StrictHttpResponse<AluguelDto>) => r.body as AluguelDto)
    );
  }

  /**
   * Path part for operation aluguelControllerObterPelaPlaca
   */
  static readonly AluguelControllerObterPelaPlacaPath = '/api/v1/aluguel/{placa}';

  /**
   * Inclusão de aluguel
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `aluguelControllerObterPelaPlaca()` instead.
   *
   * This method doesn't expect any request body.
   */
  aluguelControllerObterPelaPlaca$Response(params: {
    placa: string;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<AluguelDto>> {

    const rb = new RequestBuilder(this.rootUrl, AluguelControllerService.AluguelControllerObterPelaPlacaPath, 'get');
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
   * To access the full response (for headers, for example), `aluguelControllerObterPelaPlaca$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  aluguelControllerObterPelaPlaca(params: {
    placa: string;
  },
  context?: HttpContext

): Observable<AluguelDto> {

    return this.aluguelControllerObterPelaPlaca$Response(params,context).pipe(
      map((r: StrictHttpResponse<AluguelDto>) => r.body as AluguelDto)
    );
  }

  /**
   * Path part for operation aluguelControllerListAllAluguel
   */
  static readonly AluguelControllerListAllAluguelPath = '/api/v1/aluguel/listar';

  /**
   * Listagem Geral
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `aluguelControllerListAllAluguel()` instead.
   *
   * This method doesn't expect any request body.
   */
  aluguelControllerListAllAluguel$Response(params?: {
  },
  context?: HttpContext

): Observable<StrictHttpResponse<any>> {

    const rb = new RequestBuilder(this.rootUrl, AluguelControllerService.AluguelControllerListAllAluguelPath, 'get');
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
   * To access the full response (for headers, for example), `aluguelControllerListAllAluguel$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  aluguelControllerListAllAluguel(params?: {
  },
  context?: HttpContext

): Observable<any> {

    return this.aluguelControllerListAllAluguel$Response(params,context).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

}
