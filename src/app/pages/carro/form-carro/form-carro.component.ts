import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DateAdapter} from "@angular/material/core";
import {CarroControllerService} from "../../../api/services/carro-controller.service";
import {CarroDto} from "../../../api/models/carro-dto";
import {
  ConfirmationDialog,
  ConfirmationDialogResult
} from "../../../core/confirmation-dialog/confirmation-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-form-carro',
  templateUrl: './form-carro.component.html',
  styleUrls: ['./form-carro.component.scss']
})
export class FormCarroComponent {
  formGroup!: FormGroup;
  public readonly ACAO_INCLUIR = "Incluir";
  public readonly ACAO_EDITAR = "Editar";

  acao : string = this.ACAO_INCLUIR;
  placa!: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private _adapter: DateAdapter<any>,
    public carroService: CarroControllerService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.createForm();
    this._adapter.setLocale('pt-br');
    this.prepararEdicao();
  }
  createForm() {
    this.formGroup = this.formBuilder.group({
      ano: [null, Validators.required],
      modelo: [null, Validators.required],
      cor: [null, Validators.required],
      placa: [null, Validators.required],
      quilometragem: [null, Validators.required]
    });
  }

  onSubmit() {
    if (this.formGroup.valid) {
      if(!this.placa){
        this.realizarInclusao();
        this.atualizar();
      }else{
        this.realizarEdicao();
        this.atualizar();
      }
    }
  }

  private realizarInclusao() {
    console.log("Dados:", this.formGroup.value);
    this.carroService.incluir({body: this.formGroup.value})
      .subscribe(retorno => {
        console.log("Retorno:", retorno);
        this.showMensagemSimples("Inclusão realizada com sucesso!");
      }, erro => {
        console.log("Erro:" + erro);
      })
  }

  public handleError = (controlName: string, errorName: string) => {
    return this.formGroup.controls[controlName].hasError(errorName);
  };

  confirmarAcao(carroDto: CarroDto, acao: string) {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      data: {
        titulo: 'Mensagem!!!',
        mensagem: `Ação de ${acao} dados: ${carroDto.modelo} (placa: ${carroDto.placa}) realizada com sucesso!`,
        textoBotoes: {
          ok: 'ok',
        },
      },
    });

  }

  private prepararEdicao() {
    const paramPlaca = this.route.snapshot.paramMap.get('placa');
    if (paramPlaca){
      const placa = paramPlaca;
      console.log("placa",paramPlaca);
      this.carroService.obterPorPlaca({placa: placa}).subscribe(
        retorno => {
          this.acao = this.ACAO_EDITAR;
          console.log("retorno", retorno);
          this.placa = retorno.placa || "";
          this.formGroup.patchValue(retorno);
        }
      )
    }
  }

  private realizarEdicao() {
    this.carroService.alterar({placa: this.placa, body: this.formGroup.value})
      .subscribe(retorno => {
        this.confirmarAcao(retorno, this.ACAO_EDITAR);
        this.router.navigateByUrl("/carro");
      }, erro => {
        console.log("Erro:" + erro);
      })
  }
  showMensagemSimples( mensagem: string, duracao: number = 2000) {
    this.snackBar.open(mensagem, 'Fechar', {
      duration: duracao,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  atualizar(){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigateByUrl('/carro');
    });
  }
}
