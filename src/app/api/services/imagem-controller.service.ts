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
  static readonly ImagemControllerUploadImagemPath = '/api/v1/imagem/upload';

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
   * Path part for operation imagemControllerObterPeloId
   */
  static readonly ImagemControllerObterPeloIdPath = '/api/v1/imagem';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `imagemControllerObterPeloId()` instead.
   *
   * This method doesn't expect any request body.
   */
  imagemControllerObterPeloId$Response(params: {
    requestID: number;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<string>> {

    const rb = new RequestBuilder(this.rootUrl, ImagemControllerService.ImagemControllerObterPeloIdPath, 'get');
    if (params) {
      rb.query('requestID', params.requestID, {});
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
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `imagemControllerObterPeloId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  imagemControllerObterPeloId(params: {
    requestID: number;
  },
  context?: HttpContext

): Observable<string> {

    return this.imagemControllerObterPeloId$Response(params,context).pipe(
      map((r: StrictHttpResponse<string>) => r.body as string)
    );
  }

}
