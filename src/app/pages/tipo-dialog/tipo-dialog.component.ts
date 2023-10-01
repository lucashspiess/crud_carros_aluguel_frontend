import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {DateAdapter} from "@angular/material/core";
import {TipoControllerService} from "../../api/services/tipo-controller.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-tipo-dialog',
  templateUrl: './tipo-dialog.component.html',
  styleUrls: ['./tipo-dialog.component.scss']
})
export class TipoDialogComponent implements OnInit{
  formGroup!: FormGroup;

  public constructor(
    public dialogRef: MatDialogRef<TipoDialogComponent>,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private _adapter: DateAdapter<any>,
    public tipoService: TipoControllerService,
    private snackBar: MatSnackBar
  ) {
    this.createForm();
    this._adapter.setLocale('pt-br');
  }
  ngOnInit(): void {
  }

  cancelar(): void {
    this.dialogRef.close();
  }

  createForm() {
      this.formGroup = this.formBuilder.group({
        nome: [null, Validators.required],
        descricao: [null, Validators.required],
      })
    }

  onSubmit() {
    if (this.formGroup.valid) {
      this.realizarInclusao();
    }
  }


  private realizarInclusao() {
    this.tipoService.tipoControllerIncluir({body: this.formGroup.value})
      .subscribe(retorno => {
        this.showMensagemSimples("Inclusão realizada com sucesso!");
      }, erro => {
        console.log("Erro:" + erro);
      })
  }

  public handleError = (controlName: string, errorName: string) => {
    return this.formGroup.controls[controlName].hasError(errorName);
  };

  showMensagemSimples(mensagem: string, duracao: number = 2000) {
    this.snackBar.open(mensagem, 'Fechar', {
      duration: duracao,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
