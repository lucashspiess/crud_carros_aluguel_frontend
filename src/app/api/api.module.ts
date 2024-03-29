/* tslint:disable */
/* eslint-disable */
import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfiguration, ApiConfigurationParams } from './api-configuration';

import { UsuarioControllerService } from './services/usuario-controller.service';
import { TipoControllerService } from './services/tipo-controller.service';
import { ClienteControllerService } from './services/cliente-controller.service';
import { CarroControllerService } from './services/carro-controller.service';
import { AuthApiService } from './services/auth-api.service';
import { AluguelControllerService } from './services/aluguel-controller.service';
import { ImagemControllerService } from './services/imagem-controller.service';

/**
 * Module that provides all services and configuration.
 */
@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [
    UsuarioControllerService,
    TipoControllerService,
    ClienteControllerService,
    CarroControllerService,
    AuthApiService,
    AluguelControllerService,
    ImagemControllerService,
    ApiConfiguration
  ],
})
export class ApiModule {
  static forRoot(params: ApiConfigurationParams): ModuleWithProviders<ApiModule> {
    return {
      ngModule: ApiModule,
      providers: [
        {
          provide: ApiConfiguration,
          useValue: params
        }
      ]
    }
  }

  constructor( 
    @Optional() @SkipSelf() parentModule: ApiModule,
    @Optional() http: HttpClient
  ) {
    if (parentModule) {
      throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
    }
    if (!http) {
      throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
      'See also https://github.com/angular/angular/issues/20575');
    }
  }
}
