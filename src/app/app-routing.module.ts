import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./core/home/home.component";
import {carroRoutes} from "./pages/carro/carro-routing.module";
import {clienteRoutes} from "./pages/cliente/cliente-routing.module";
import {AutenticacaoRoutes} from "./arquitetura/autenticacao/autenticacao.routing";
import {UsuarioInterfaceRoutes} from "./pages/usuario-interface/usuario-interface-routing.module";
import {tipoRoutes} from "./pages/tipo/tipo-routing.module";
import {aluguelRoutes} from "./pages/aluguel/aluguel-routing.module";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    children: [...carroRoutes, ...clienteRoutes, ...tipoRoutes, ...aluguelRoutes]
  },
  {
    path: "acesso",
    children: [...AutenticacaoRoutes]
  },
  {
    path:"cadastro",
    children:[...UsuarioInterfaceRoutes]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
