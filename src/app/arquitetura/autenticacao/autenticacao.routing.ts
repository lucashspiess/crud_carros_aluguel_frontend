import {AutenticacaoComponent} from './autenticacao.component';
import {Routes} from '@angular/router';
import {CadastroUsuarioComponent} from "../../pages/usuario-interface/cadastro-usuario/cadastro-usuario.component";

export const AutenticacaoRoutes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: AutenticacaoComponent,
    // loadChildren: () => import('./autenticacao.module').then(m => m.AutenticacaoModule)
  },
  {
    path:"cadastro/novo",
    component:CadastroUsuarioComponent
  }

];

