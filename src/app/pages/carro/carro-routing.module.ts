import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeCarroComponent} from "./home-carro/home-carro.component";
import {ListCarroComponent} from "./list-carro/list-carro.component";
import {FormCarroComponent} from "./form-carro/form-carro.component";

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

