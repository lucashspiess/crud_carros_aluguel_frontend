import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeClienteComponent} from "./home-cliente/home-cliente.component";
import {ListClienteComponent} from "./list-cliente/list-cliente.component";
import {FormClienteComponent} from "./form-cliente/form-cliente.component";

export const clienteRoutes: Routes = [
  {
    path: "cliente",
    component: HomeClienteComponent,
    children: [
      {
        path: "",
        component: ListClienteComponent
      },
      {
        path: "novo",
        component: FormClienteComponent
      },
      {
        path: ":id",
        component: FormClienteComponent
      },
      {
        path: "novo/:cpf/:placa",
        component: FormClienteComponent
      }
    ]
  }
];

