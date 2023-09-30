import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {DateAdapter} from "@angular/material/core";
import {TipoControllerService} from "../../api/services/tipo-controller.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SecurityService} from "../../arquitetura/security/security.service";
import {ClienteControllerService} from "../../api/services/cliente-controller.service";
import {ClienteDto} from "../../api/models/cliente-dto";
import {TipoDto} from "../../api/models/tipo-dto";

@Component({
  selector: 'app-cliente-dialog',
  templateUrl: './cliente-dialog.component.html',
  styleUrls: ['./cliente-dialog.component.scss']
})
export class ClienteDialogComponent implements OnInit {
  formGroup!: FormGroup;
  cpf: number;
  public constructor(
    private formBuilder: FormBuilder,
    public clienteService: ClienteControllerService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<ClienteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: any,
  ) {
      this.cpf = data.cpf;
  }


  ngOnInit(): void {
      this.createForm();
  }

  fechar(): void {
    this.dialogRef.close();
  }

  public handleError = (controlName: string, errorName: string) => {
    return this.formGroup.controls[controlName].hasError(errorName);
  };

  onSubmit(){
    if(this.formGroup.valid){
      this.realizarInclusao();
      this.fechar();
    }
  }
  showMensagemSimples(mensagem: string, duracao: number = 2000) {
    this.snackBar.open(mensagem, 'Fechar', {
      duration: duracao,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      cpf: [this.cpf, Validators.required],
      email: [null, Validators.required],
      nome: [null, Validators.required],
    })
  }


  private realizarInclusao() {
    this.clienteService.clienteControllerIncluirCliente({body: this.formGroup.value})
      .subscribe(retorno => {
        this.showMensagemSimples("Inclusão realizada com sucesso!");
      }, erro => {
        console.log("Erro:" + erro);
      })
  }
}
