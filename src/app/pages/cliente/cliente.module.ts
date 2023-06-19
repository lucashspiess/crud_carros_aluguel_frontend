import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListClienteComponent } from './list-cliente/list-cliente.component';
import { HomeClienteComponent } from './home-cliente/home-cliente.component';
import {RouterModule} from "@angular/router";
import {clienteRoutes} from "./cliente-routing.module";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {MatButton, MatButtonModule} from "@angular/material/button";
import {MatTableModule} from '@angular/material/table';
import { FormClienteComponent } from './form-cliente/form-cliente.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from "@angular/material/core";
import { defineComponents, IgcRatingComponent} from "igniteui-webcomponents";
import { IgcFormsModule } from 'igniteui-angular';
import { CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {MatDialogModule} from "@angular/material/dialog";

defineComponents(IgcRatingComponent)
@NgModule({
  declarations: [
    ListClienteComponent,
    HomeClienteComponent,
    FormClienteComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(clienteRoutes),
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
    MatDialogModule,
    IgcFormsModule,
    FormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ClienteModule { }
