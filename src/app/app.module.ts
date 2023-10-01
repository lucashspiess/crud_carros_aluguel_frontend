import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { HomeComponent } from './core/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import {CarroModule} from "./pages/carro/carro.module";
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule} from "@angular/material/form-field";
import {MatDialogModule} from "@angular/material/dialog";
import { ConfirmationDialog } from './core/confirmation-dialog/confirmation-dialog.component';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {ClienteModule} from "./pages/cliente/cliente.module";
import {LoaderDialogComponent} from "./arquitetura/loader-dialog/loader-dialog.component";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {AutenticacaoModule} from "./arquitetura/autenticacao/autenticacao.module";
import {MessageModule} from "./arquitetura/message/message.module";
import {SecurityModule} from "./arquitetura/security/security.module";
import {UsuarioInterfaceModule} from "./pages/usuario-interface/usuario-interface.module";
import {AppInterceptor} from "./arquitetura/app.interceptor";
import {SecurityInterceptor} from "./arquitetura/security/security.interceptor";
import {LoaderModule} from "./arquitetura/loader/loader.module";
import {TipoModule} from "./pages/tipo/tipo.module";
import {AluguelModule} from "./pages/aluguel/aluguel.module";
import { TipoDialogComponent } from './pages/tipo-dialog/tipo-dialog.component';
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {ClienteDialogComponent} from "./pages/cliente-dialog/cliente-dialog.component";
import {MatCard} from "@angular/material/card";
import {ImagemDialogComponent} from "./pages/carro/imagem-dialog/imagem-dialog.component";
import {FlexModule} from "@angular/flex-layout";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ConfirmationDialog,
    LoaderDialogComponent,
    TipoDialogComponent,
    ClienteDialogComponent,
    ImagemDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    CarroModule,
    MatDialogModule,
    MatSnackBarModule,
    ClienteModule,
    TipoModule,
    AluguelModule,
    UsuarioInterfaceModule,
    MatDialogModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    AutenticacaoModule,
    LoaderModule,
    MessageModule.forRoot(),
    SecurityModule,//TODO conferir a configuração
    SecurityModule.forRoot({
      nameStorage: 'portalSSOSecurityStorage',
      loginRouter: '/acesso/login'
    }),
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FlexModule,
  ],
  providers: [
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SecurityInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
