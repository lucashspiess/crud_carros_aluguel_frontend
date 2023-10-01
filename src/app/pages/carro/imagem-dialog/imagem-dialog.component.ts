import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-cliente-dialog',
  templateUrl: './imagem-dialog.component.html',
  styleUrls: ['./imagem-dialog.component.scss']
})
export class ImagemDialogComponent implements OnInit {
  formGroup!: FormGroup;
  caminho: number;
  public constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<ImagemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: any,
  ) {
      this.caminho = data.caminho;
  }


  ngOnInit(): void {
  }

  fechar(): void {
    this.dialogRef.close();
  }

  public handleError = (controlName: string, errorName: string) => {
    return this.formGroup.controls[controlName].hasError(errorName);
  };
}
