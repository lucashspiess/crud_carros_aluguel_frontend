import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./core/home/home.component";
import {carroRoutes} from "./pages/carro/carro-routing.module";

const routes: Routes = [
/*  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },*/
  {
    path: "",
    component: HomeComponent,
    children: [...carroRoutes]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
