import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeCarroComponent} from "./home-carro/home-carro.component";
import {ListCarroComponent} from "./list-carro/list-carro.component";
import {FormCarroComponent} from "./form-carro/form-carro.component";
import {FormAluguelComponent} from "./form-aluguel/form-aluguel.component";

export const carroRoutes: Routes = [
  {
    path: "carro",
    component: HomeCarroComponent,
    children: [
      {
        path: "",
        component: ListCarroComponent
      },
      {
        path: ":placa/:cpf/:data_inicio/:data_fim/aluguel",
        component: FormAluguelComponent
      },
      {
        path: ":placa/aluguel",
        component: FormAluguelComponent
      },
      {
        path: "novo",
        component: FormCarroComponent
      },
      {
        path: ":placa",
        component: FormCarroComponent
      }
    ]
  }
];

