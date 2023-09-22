import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DateAdapter} from "@angular/material/core";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute, Router} from "@angular/router";
import {ClienteControllerService} from "../../../api/services/cliente-controller.service";

@Component({
  selector: 'app-form-cliente',
  templateUrl: './form-cliente.component.html',
  styleUrls: ['./form-cliente.component.scss']
})
export class FormClienteComponent {
  formGroup!: FormGroup;
  public readonly ACAO_INCLUIR = "Incluir";
  public readonly ACAO_EDITAR = "Editar";

  acao: string = this.ACAO_INCLUIR;
  id!: number;
  cpf!: number;
  placa!: string;
  data_inicio!: string;
  data_fim!: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private _adapter: DateAdapter<any>,
    public clienteService: ClienteControllerService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.createForm();
    this._adapter.setLocale('pt-br');
    this.prepararEdicao();
  }

  createForm() {
    if (this.acao == "Editar") {
      this.clienteService.clienteControllerObterPorIdCliente({id: this.id}).subscribe(retorno =>
        this.formGroup = this.formBuilder.group({
          cpf: [retorno.cpf, Validators.required],
          email: [retorno.email, Validators.required],
          nome: [retorno.nome, Validators.required],
        }));
    } else {
      const paramCpf = this.route.snapshot.paramMap.get('cpf');
      const paramPlaca = this.route.snapshot.paramMap.get('placa');
      const paramInicio = this.route.snapshot.paramMap.get('data_inicio');
      const paramFim = this.route.snapshot.paramMap.get('data_fim');
      if (paramCpf && paramPlaca && paramInicio && paramFim) {
        this.data_inicio = paramInicio;
        this.data_fim = paramFim;
        this.cpf = parseInt(paramCpf);
        this.placa = paramPlaca;
      }
      this.formGroup = this.formBuilder.group({
        cpf: [this.cpf, Validators.required],
        email: [null, Validators.required],
        nome: [null, Validators.required],
      })
    }
  }

  onSubmit() {
    if (this.formGroup.valid) {
      if (!this.id) {
        this.realizarInclusao();
        this.atualizar();
      } else {
        this.realizarEdicao();
        this.atualizar();
      }
    }
  }

  private realizarInclusao() {
    this.clienteService.clienteControllerIncluirCliente({body: this.formGroup.value})
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
    const paramId = this.route.snapshot.paramMap.get('id');
    if (paramId) {
      const id = parseInt(paramId);
      this.clienteService.clienteControllerObterPorIdCliente({id: id}).subscribe(
        retorno => {
          this.acao = this.ACAO_EDITAR;
          this.id = retorno.id || 0;
          this.formGroup.patchValue(retorno);
        }
      )
    }
  }

  private realizarEdicao() {
    this.clienteService.clienteControllerAlterarCliente({id: this.id, body: this.formGroup.value})
      .subscribe(retorno => {
        this.showMensagemSimples("Edição realizada com sucesso!")
        this.router.navigateByUrl("/cliente");
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
    if (this.placa) {
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigateByUrl(`/carro/${this.placa}/${this.cpf}/${this.data_inicio}/${this.data_fim}/aluguel`);
      });
    } else {
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigateByUrl('/cliente');
      });
    }
  }
}
