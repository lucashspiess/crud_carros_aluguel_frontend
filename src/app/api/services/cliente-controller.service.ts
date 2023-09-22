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
   * Path part for operation clienteControllerObterPorIdCliente
   */
  static readonly ClienteControllerObterPorIdClientePath = '/api/v1/cliente/{id}';

  /**
   * Método para retornar um cliente pelo id
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `clienteControllerObterPorIdCliente()` instead.
   *
   * This method doesn't expect any request body.
   */
  clienteControllerObterPorIdCliente$Response(params: {
    id: number;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<ClienteDto>> {

    const rb = new RequestBuilder(this.rootUrl, ClienteControllerService.ClienteControllerObterPorIdClientePath, 'get');
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
   * To access the full response (for headers, for example), `clienteControllerObterPorIdCliente$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  clienteControllerObterPorIdCliente(params: {
    id: number;
  },
  context?: HttpContext

): Observable<ClienteDto> {

    return this.clienteControllerObterPorIdCliente$Response(params,context).pipe(
      map((r: StrictHttpResponse<ClienteDto>) => r.body as ClienteDto)
    );
  }

  /**
   * Path part for operation clienteControllerAlterarCliente
   */
  static readonly ClienteControllerAlterarClientePath = '/api/v1/cliente/{id}';

  /**
   * Método utilizado para alterar os dados de um cliente
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `clienteControllerAlterarCliente()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  clienteControllerAlterarCliente$Response(params: {
    id: number;
    body: ClienteDto
  },
  context?: HttpContext

): Observable<StrictHttpResponse<ClienteDto>> {

    const rb = new RequestBuilder(this.rootUrl, ClienteControllerService.ClienteControllerAlterarClientePath, 'put');
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
   * To access the full response (for headers, for example), `clienteControllerAlterarCliente$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  clienteControllerAlterarCliente(params: {
    id: number;
    body: ClienteDto
  },
  context?: HttpContext

): Observable<ClienteDto> {

    return this.clienteControllerAlterarCliente$Response(params,context).pipe(
      map((r: StrictHttpResponse<ClienteDto>) => r.body as ClienteDto)
    );
  }

  /**
   * Path part for operation clienteControllerRemoverCliente
   */
  static readonly ClienteControllerRemoverClientePath = '/api/v1/cliente/{id}';

  /**
   * Método utilizado para remover um cliente pelo id informado
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `clienteControllerRemoverCliente()` instead.
   *
   * This method doesn't expect any request body.
   */
  clienteControllerRemoverCliente$Response(params: {
    id: number;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<any>> {

    const rb = new RequestBuilder(this.rootUrl, ClienteControllerService.ClienteControllerRemoverClientePath, 'delete');
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
   * To access the full response (for headers, for example), `clienteControllerRemoverCliente$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  clienteControllerRemoverCliente(params: {
    id: number;
  },
  context?: HttpContext

): Observable<any> {

    return this.clienteControllerRemoverCliente$Response(params,context).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

  /**
   * Path part for operation clienteControllerIncluirCliente
   */
  static readonly ClienteControllerIncluirClientePath = '/api/v1/cliente';

  /**
   * Inclusão de cliente
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `clienteControllerIncluirCliente()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  clienteControllerIncluirCliente$Response(params: {
    body: ClienteDto
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Cliente>> {

    const rb = new RequestBuilder(this.rootUrl, ClienteControllerService.ClienteControllerIncluirClientePath, 'post');
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
   * To access the full response (for headers, for example), `clienteControllerIncluirCliente$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  clienteControllerIncluirCliente(params: {
    body: ClienteDto
  },
  context?: HttpContext

): Observable<Cliente> {

    return this.clienteControllerIncluirCliente$Response(params,context).pipe(
      map((r: StrictHttpResponse<Cliente>) => r.body as Cliente)
    );
  }

  /**
   * Path part for operation clienteControllerListAllCliente
   */
  static readonly ClienteControllerListAllClientePath = '/api/v1/cliente/listar';

  /**
   * Listagem Geral
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `clienteControllerListAllCliente()` instead.
   *
   * This method doesn't expect any request body.
   */
  clienteControllerListAllCliente$Response(params?: {
  },
  context?: HttpContext

): Observable<StrictHttpResponse<any>> {

    const rb = new RequestBuilder(this.rootUrl, ClienteControllerService.ClienteControllerListAllClientePath, 'get');
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
   * To access the full response (for headers, for example), `clienteControllerListAllCliente$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  clienteControllerListAllCliente(params?: {
  },
  context?: HttpContext

): Observable<any> {

    return this.clienteControllerListAllCliente$Response(params,context).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

  /**
   * Path part for operation clienteControllerObterPorCpfCliente
   */
  static readonly ClienteControllerObterPorCpfClientePath = '/api/v1/cliente/cpf/{cpf}';

  /**
   * Método para retornar um cliente pelo cpf
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `clienteControllerObterPorCpfCliente()` instead.
   *
   * This method doesn't expect any request body.
   */
  clienteControllerObterPorCpfCliente$Response(params: {
    cpf: number;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<ClienteDto>> {

    const rb = new RequestBuilder(this.rootUrl, ClienteControllerService.ClienteControllerObterPorCpfClientePath, 'get');
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
   * To access the full response (for headers, for example), `clienteControllerObterPorCpfCliente$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  clienteControllerObterPorCpfCliente(params: {
    cpf: number;
  },
  context?: HttpContext

): Observable<ClienteDto> {

    return this.clienteControllerObterPorCpfCliente$Response(params,context).pipe(
      map((r: StrictHttpResponse<ClienteDto>) => r.body as ClienteDto)
    );
  }

}
