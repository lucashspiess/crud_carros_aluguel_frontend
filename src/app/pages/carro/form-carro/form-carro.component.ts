import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DateAdapter} from "@angular/material/core";
import {CarroControllerService} from "../../../api/services/carro-controller.service";
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

  acao: string = this.ACAO_INCLUIR;
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
    if(this.acao == "Editar"){
      this.carroService.obterPorPlaca({placa: this.placa}).subscribe(retorno =>
        this.formGroup = this.formBuilder.group({
          ano: [retorno.ano, Validators.required],
          modelo: [retorno.modelo, Validators.required],
          cor: [retorno.cor, Validators.required],
          placa: [retorno.placa],
          diaria: [retorno.diaria],
          quilometragem: [retorno.quilometragem, Validators.required]
        }));
    }else{
        this.formGroup = this.formBuilder.group({
          ano: [null, Validators.required],
          modelo: [null, Validators.required],
          cor: [null, Validators.required],
          placa: [null, Validators.required],
          diaria: [null, Validators.required],
          quilometragem: [null, Validators.required]
        })
    }
  }

  onSubmit() {
    if (this.formGroup.valid) {
      if (!this.placa) {
        this.realizarInclusao();
        this.atualizar();
      } else {
        this.realizarEdicao();
        this.atualizar();
      }
    }
  }

  private realizarInclusao() {
    this.carroService.incluirCarro({body: this.formGroup.value})
      .subscribe(retorno => {
        this.showMensagemSimples("Inclusão realizada com sucesso!");
      }, erro => {
        console.log("Erro:" + erro);
      })
  }

  public handleError = (controlName: string, errorName: string) => {
    return this.formGroup.controls[controlName].hasError(errorName);
  };

  private prepararEdicao() {
    const paramPlaca = this.route.snapshot.paramMap.get('placa');
    if (paramPlaca) {
      const placa = paramPlaca;
      this.carroService.obterPorPlaca({placa: placa}).subscribe(
        retorno => {
          this.acao = this.ACAO_EDITAR;
          this.placa = retorno.placa || "";
          this.formGroup.patchValue(retorno);
        }
      )
    }
  }

  private realizarEdicao() {
    this.carroService.alterarCarro({placa: this.placa, body: this.formGroup.value})
      .subscribe(retorno => {
        this.showMensagemSimples("Edição realizada com sucesso!")
        this.router.navigateByUrl("/carro");
      }, erro => {
      })
  }

  showMensagemSimples(mensagem: string, duracao: number = 2000) {
    this.snackBar.open(mensagem, 'Fechar', {
      duration: duracao,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  atualizar() {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigateByUrl('/carro');
    });
  }
}
