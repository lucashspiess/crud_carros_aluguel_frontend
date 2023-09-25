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

import { UsuarioDto } from '../models/usuario-dto';

@Injectable({
  providedIn: 'root',
})
export class UsuarioControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation usuarioControllerObterPorId
   */
  static readonly UsuarioControllerObterPorIdPath = '/api/v1/usuario/{id}';

  /**
   * Obter os dados completos de uma entidiade pelo id informado!
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `usuarioControllerObterPorId()` instead.
   *
   * This method doesn't expect any request body.
   */
  usuarioControllerObterPorId$Response(params: {
    id: number;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<any>> {

    const rb = new RequestBuilder(this.rootUrl, UsuarioControllerService.UsuarioControllerObterPorIdPath, 'get');
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
   * Obter os dados completos de uma entidiade pelo id informado!
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `usuarioControllerObterPorId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  usuarioControllerObterPorId(params: {
    id: number;
  },
  context?: HttpContext

): Observable<any> {

    return this.usuarioControllerObterPorId$Response(params,context).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

  /**
   * Path part for operation usuarioControllerAlterar
   */
  static readonly UsuarioControllerAlterarPath = '/api/v1/usuario/{id}';

  /**
   * Método utilizado para altlerar os dados de uma entidiade
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `usuarioControllerAlterar()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  usuarioControllerAlterar$Response(params: {
    id: number;
    body: UsuarioDto
  },
  context?: HttpContext

): Observable<StrictHttpResponse<any>> {

    const rb = new RequestBuilder(this.rootUrl, UsuarioControllerService.UsuarioControllerAlterarPath, 'put');
    if (params) {
      rb.path('id', params.id, {});
      rb.body(params.body, 'application/json');
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
   * Método utilizado para altlerar os dados de uma entidiade
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `usuarioControllerAlterar$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  usuarioControllerAlterar(params: {
    id: number;
    body: UsuarioDto
  },
  context?: HttpContext

): Observable<any> {

    return this.usuarioControllerAlterar$Response(params,context).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

  /**
   * Path part for operation usuarioControllerRemover
   */
  static readonly UsuarioControllerRemoverPath = '/api/v1/usuario/{id}';

  /**
   * Método utilizado para remover uma entidiade pela id informado
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `usuarioControllerRemover()` instead.
   *
   * This method doesn't expect any request body.
   */
  usuarioControllerRemover$Response(params: {
    id: number;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<any>> {

    const rb = new RequestBuilder(this.rootUrl, UsuarioControllerService.UsuarioControllerRemoverPath, 'delete');
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
   * Método utilizado para remover uma entidiade pela id informado
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `usuarioControllerRemover$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  usuarioControllerRemover(params: {
    id: number;
  },
  context?: HttpContext

): Observable<any> {

    return this.usuarioControllerRemover$Response(params,context).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

  /**
   * Path part for operation usuarioControllerIncluir
   */
  static readonly UsuarioControllerIncluirPath = '/api/v1/usuario/singup';

  /**
   * Método utilizado para realizar a inclusão de um entidade
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `usuarioControllerIncluir()` instead.
   *
   * This method doesn't expect any request body.
   */
  usuarioControllerIncluir$Response(params: {
    modeloDTO: UsuarioDto;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<any>> {

    const rb = new RequestBuilder(this.rootUrl, UsuarioControllerService.UsuarioControllerIncluirPath, 'post');
    if (params) {
      rb.query('modeloDTO', params.modeloDTO, {});
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
   * Método utilizado para realizar a inclusão de um entidade
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `usuarioControllerIncluir$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  usuarioControllerIncluir(params: {
    modeloDTO: UsuarioDto;
  },
  context?: HttpContext

): Observable<any> {

    return this.usuarioControllerIncluir$Response(params,context).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

  /**
   * Path part for operation usuarioControllerListAll
   */
  static readonly UsuarioControllerListAllPath = '/api/v1/usuario';

  /**
   * Listagem Geral
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `usuarioControllerListAll()` instead.
   *
   * This method doesn't expect any request body.
   */
  usuarioControllerListAll$Response(params?: {
  },
  context?: HttpContext

): Observable<StrictHttpResponse<any>> {

    const rb = new RequestBuilder(this.rootUrl, UsuarioControllerService.UsuarioControllerListAllPath, 'get');
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
   * To access the full response (for headers, for example), `usuarioControllerListAll$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  usuarioControllerListAll(params?: {
  },
  context?: HttpContext

): Observable<any> {

    return this.usuarioControllerListAll$Response(params,context).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

  /**
   * Path part for operation usuarioControllerObterPorLogin
   */
  static readonly UsuarioControllerObterPorLoginPath = '/api/v1/usuario/obterPorlogin';

  /**
   * Obtendo Usuario por login
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `usuarioControllerObterPorLogin()` instead.
   *
   * This method doesn't expect any request body.
   */
  usuarioControllerObterPorLogin$Response(params: {
    username: string;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<any>> {

    const rb = new RequestBuilder(this.rootUrl, UsuarioControllerService.UsuarioControllerObterPorLoginPath, 'get');
    if (params) {
      rb.query('username', params.username, {});
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
   * Obtendo Usuario por login
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `usuarioControllerObterPorLogin$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  usuarioControllerObterPorLogin(params: {
    username: string;
  },
  context?: HttpContext

): Observable<any> {

    return this.usuarioControllerObterPorLogin$Response(params,context).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

}
