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

import { Imagem } from '../models/imagem';

@Injectable({
  providedIn: 'root',
})
export class ImagemControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation imagemControllerUploadImagem
   */
  static readonly ImagemControllerUploadImagemPath = '/imagem/upload';

  /**
   * upload de imagem
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `imagemControllerUploadImagem()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  imagemControllerUploadImagem$Response(params?: {
    body?: {
'imagemASalvar': Blob;
}
  },
  context?: HttpContext

): Observable<StrictHttpResponse<any>> {

    const rb = new RequestBuilder(this.rootUrl, ImagemControllerService.ImagemControllerUploadImagemPath, 'post');
    if (params) {
      rb.body(params.body, 'multipart/form-data');
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
   * upload de imagem
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `imagemControllerUploadImagem$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  imagemControllerUploadImagem(params?: {
    body?: {
'imagemASalvar': Blob;
}
  },
  context?: HttpContext

): Observable<any> {

    return this.imagemControllerUploadImagem$Response(params,context).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

  /**
   * Path part for operation imagemControllerGetImage
   */
  static readonly ImagemControllerGetImagePath = '/imagem/{imageId}';

  /**
   * upload de imagem
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `imagemControllerGetImage()` instead.
   *
   * This method doesn't expect any request body.
   */
  imagemControllerGetImage$Response(params: {
    imageId: number;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<string>> {

    const rb = new RequestBuilder(this.rootUrl, ImagemControllerService.ImagemControllerGetImagePath, 'get');
    if (params) {
      rb.path('imageId', params.imageId, {});
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<string>;
      })
    );
  }

  /**
   * upload de imagem
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `imagemControllerGetImage$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  imagemControllerGetImage(params: {
    imageId: number;
  },
  context?: HttpContext

): Observable<string> {

    return this.imagemControllerGetImage$Response(params,context).pipe(
      map((r: StrictHttpResponse<string>) => r.body as string)
    );
  }

  /**
   * Path part for operation imagemControllerExcluirFoto
   */
  static readonly ImagemControllerExcluirFotoPath = '/imagem';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `imagemControllerExcluirFoto()` instead.
   *
   * This method doesn't expect any request body.
   */
  imagemControllerExcluirFoto$Response(params: {
    id: number;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Imagem>> {

    const rb = new RequestBuilder(this.rootUrl, ImagemControllerService.ImagemControllerExcluirFotoPath, 'delete');
    if (params) {
      rb.query('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Imagem>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `imagemControllerExcluirFoto$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  imagemControllerExcluirFoto(params: {
    id: number;
  },
  context?: HttpContext

): Observable<Imagem> {

    return this.imagemControllerExcluirFoto$Response(params,context).pipe(
      map((r: StrictHttpResponse<Imagem>) => r.body as Imagem)
    );
  }

}
