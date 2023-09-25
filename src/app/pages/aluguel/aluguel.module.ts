import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListAluguelComponent } from './list-aluguel/list-aluguel.component';
import { HomeAluguelComponent } from './home-aluguel/home-aluguel.component';
import {RouterModule} from "@angular/router";
import {aluguelRoutes} from "./aluguel-routing.module";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {MatButton, MatButtonModule} from "@angular/material/button";
import {MatTableModule} from '@angular/material/table';
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
    ListAluguelComponent,
    HomeAluguelComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(aluguelRoutes),
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
export class AluguelModule { }
