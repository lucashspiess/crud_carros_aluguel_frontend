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
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from "@angular/material/core";
import { defineComponents, IgcRatingComponent} from "igniteui-webcomponents";
import { IgcFormsModule } from 'igniteui-angular';
import { CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {MatDialogModule} from "@angular/material/dialog";
import {FormAluguelComponent} from "./form-aluguel/form-aluguel.component";
import {FlexModule} from "@angular/flex-layout";

defineComponents(IgcRatingComponent)
@NgModule({
  declarations: [
    ListCarroComponent,
    HomeCarroComponent,
    FormCarroComponent,
    FormAluguelComponent
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
        MatDialogModule,
        IgcFormsModule,
        FormsModule,
        FlexModule
    ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CarroModule { }
