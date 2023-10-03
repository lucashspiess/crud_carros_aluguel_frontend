import { Routes } from '@angular/router';
import {HomeCarroComponent} from "./home-carro/home-carro.component";
import {FormCarroComponent} from "./form-carro/form-carro.component";
import {FormAluguelComponent} from "./form-aluguel/form-aluguel.component";
import {TabCarroComponent} from "./tab-carro/tab-carro.component";

export const carroRoutes: Routes = [
  {
    path: "carro",
    component: HomeCarroComponent,
    children: [
      {
        path: "",
        component: TabCarroComponent
      },
      {
        path: ":carro_placa/aluguel",
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

