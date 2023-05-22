import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListCarroComponent } from './list-carro/list-carro.component';
import { HomeCarroComponent } from './home-carro/home-carro.component';
import {RouterModule} from "@angular/router";
import {carroRoutes} from "./carro-routing.module";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {MatButton, MatButtonModule} from "@angular/material/button";
import {MatTableModule} from '@angular/material/table';
import { FormCarroComponent } from './form-carro/form-carro.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from "@angular/material/core";
@NgModule({
  declarations: [
    ListCarroComponent,
    HomeCarroComponent,
    FormCarroComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(carroRoutes),
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ]
})
export class CarroModule { }
