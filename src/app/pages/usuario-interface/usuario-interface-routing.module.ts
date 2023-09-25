import {Routes } from '@angular/router'
import {CadastroUsuarioComponent} from "./cadastro-usuario/cadastro-usuario.component";

const routes: Routes = [];

export const UsuarioInterfaceRoutes :Routes = [

  {
    path:"cadastro",
    component:CadastroUsuarioComponent
  }
]
