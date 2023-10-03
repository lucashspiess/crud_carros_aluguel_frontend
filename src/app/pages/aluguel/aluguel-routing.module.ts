import { Routes } from '@angular/router';
import {ListAluguelComponent} from "./list-aluguel/list-aluguel.component";
import {HomeAluguelComponent} from "./home-aluguel/home-aluguel.component";

export const aluguelRoutes: Routes = [
  {
    path: "aluguel",
    component: HomeAluguelComponent,
    children: [
      {
        path: "",
        component: ListAluguelComponent
      }
    ]
  }
];

