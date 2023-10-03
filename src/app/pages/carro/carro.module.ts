import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListCarroDisponivelComponent } from './list-carro-disponivel/list-carro-disponivel.component';
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
import {MatTabsModule} from "@angular/material/tabs";
import { TabCarroComponent } from './tab-carro/tab-carro.component';
import {ListCarroAlugadoComponent} from "./list-carro-alugado/list-carro-alugado.component";

defineComponents(IgcRatingComponent)
@NgModule({
  declarations: [
    ListCarroDisponivelComponent,
    HomeCarroComponent,
    FormCarroComponent,
    FormAluguelComponent,
    TabCarroComponent,
    ListCarroAlugadoComponent
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
        FlexModule,
        MatTabsModule
    ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CarroModule { }
