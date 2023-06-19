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

import { Cliente } from '../models/cliente';
import { ClienteDto } from '../models/cliente-dto';

@Injectable({
  providedIn: 'root',
})
export class ClienteControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation obterPorIdCliente
   */
  static readonly ObterPorIdClientePath = '/api/v1/cliente/{id}';

  /**
   * Método para retornar um cliente pelo id
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `obterPorIdCliente()` instead.
   *
   * This method doesn't expect any request body.
   */
  obterPorIdCliente$Response(params: {
    id: number;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<ClienteDto>> {

    const rb = new RequestBuilder(this.rootUrl, ClienteControllerService.ObterPorIdClientePath, 'get');
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
        return r as StrictHttpResponse<ClienteDto>;
      })
    );
  }

  /**
   * Método para retornar um cliente pelo id
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `obterPorIdCliente$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  obterPorIdCliente(params: {
    id: number;
  },
  context?: HttpContext

): Observable<ClienteDto> {

    return this.obterPorIdCliente$Response(params,context).pipe(
      map((r: StrictHttpResponse<ClienteDto>) => r.body as ClienteDto)
    );
  }

  /**
   * Path part for operation alterarCliente
   */
  static readonly AlterarClientePath = '/api/v1/cliente/{id}';

  /**
   * Método utilizado para alterar os dados de um cliente
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `alterarCliente()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  alterarCliente$Response(params: {
    id: number;
    body: ClienteDto
  },
  context?: HttpContext

): Observable<StrictHttpResponse<ClienteDto>> {

    const rb = new RequestBuilder(this.rootUrl, ClienteControllerService.AlterarClientePath, 'put');
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
        return r as StrictHttpResponse<ClienteDto>;
      })
    );
  }

  /**
   * Método utilizado para alterar os dados de um cliente
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `alterarCliente$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  alterarCliente(params: {
    id: number;
    body: ClienteDto
  },
  context?: HttpContext

): Observable<ClienteDto> {

    return this.alterarCliente$Response(params,context).pipe(
      map((r: StrictHttpResponse<ClienteDto>) => r.body as ClienteDto)
    );
  }

  /**
   * Path part for operation removerCliente
   */
  static readonly RemoverClientePath = '/api/v1/cliente/{id}';

  /**
   * Método utilizado para remover um cliente pelo id informado
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `removerCliente()` instead.
   *
   * This method doesn't expect any request body.
   */
  removerCliente$Response(params: {
    id: number;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<any>> {

    const rb = new RequestBuilder(this.rootUrl, ClienteControllerService.RemoverClientePath, 'delete');
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
   * Método utilizado para remover um cliente pelo id informado
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `removerCliente$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  removerCliente(params: {
    id: number;
  },
  context?: HttpContext

): Observable<any> {

    return this.removerCliente$Response(params,context).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

  /**
   * Path part for operation incluirCliente
   */
  static readonly IncluirClientePath = '/api/v1/cliente';

  /**
   * Inclusão de cliente
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `incluirCliente()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  incluirCliente$Response(params: {
    body: ClienteDto
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Cliente>> {

    const rb = new RequestBuilder(this.rootUrl, ClienteControllerService.IncluirClientePath, 'post');
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
        return r as StrictHttpResponse<Cliente>;
      })
    );
  }

  /**
   * Inclusão de cliente
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `incluirCliente$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  incluirCliente(params: {
    body: ClienteDto
  },
  context?: HttpContext

): Observable<Cliente> {

    return this.incluirCliente$Response(params,context).pipe(
      map((r: StrictHttpResponse<Cliente>) => r.body as Cliente)
    );
  }

  /**
   * Path part for operation listAllCliente
   */
  static readonly ListAllClientePath = '/api/v1/cliente/listar';

  /**
   * Listagem Geral
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `listAllCliente()` instead.
   *
   * This method doesn't expect any request body.
   */
  listAllCliente$Response(params?: {
  },
  context?: HttpContext

): Observable<StrictHttpResponse<any>> {

    const rb = new RequestBuilder(this.rootUrl, ClienteControllerService.ListAllClientePath, 'get');
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
   * To access the full response (for headers, for example), `listAllCliente$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  listAllCliente(params?: {
  },
  context?: HttpContext

): Observable<any> {

    return this.listAllCliente$Response(params,context).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

  /**
   * Path part for operation obterPorCpfCliente
   */
  static readonly ObterPorCpfClientePath = '/api/v1/cliente/cpf/{cpf}';

  /**
   * Método para retornar um cliente pelo cpf
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `obterPorCpfCliente()` instead.
   *
   * This method doesn't expect any request body.
   */
  obterPorCpfCliente$Response(params: {
    cpf: number;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<ClienteDto>> {

    const rb = new RequestBuilder(this.rootUrl, ClienteControllerService.ObterPorCpfClientePath, 'get');
    if (params) {
      rb.path('cpf', params.cpf, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ClienteDto>;
      })
    );
  }

  /**
   * Método para retornar um cliente pelo cpf
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `obterPorCpfCliente$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  obterPorCpfCliente(params: {
    cpf: number;
  },
  context?: HttpContext

): Observable<ClienteDto> {

    return this.obterPorCpfCliente$Response(params,context).pipe(
      map((r: StrictHttpResponse<ClienteDto>) => r.body as ClienteDto)
    );
  }

}
