import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { FormGroup} from "@angular/forms";
import axios from "axios";


@Component({
  selector: 'app-cliente-dialog',
  templateUrl: './imagem-dialog.component.html',
  styleUrls: ['./imagem-dialog.component.scss']
})
export class ImagemDialogComponent implements OnInit {
  formGroup!: FormGroup;
  id: number;
  public constructor(
    private dialogRef: MatDialogRef<ImagemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: any,
  ) {
      this.id = data.id;
  }


  ngOnInit(): void {
  }

  fechar(): void {
    this.dialogRef.close();
  }

  public handleError = (controlName: string, errorName: string) => {
    return this.formGroup.controls[controlName].hasError(errorName);
  };
  protected readonly axios = axios;
}
