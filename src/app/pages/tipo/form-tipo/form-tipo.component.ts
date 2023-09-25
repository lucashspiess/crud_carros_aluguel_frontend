import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DateAdapter} from "@angular/material/core";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute, Router} from "@angular/router";
import {ClienteControllerService} from "../../../api/services/cliente-controller.service";
import {SecurityService} from "../../../arquitetura/security/security.service";
import {TipoControllerService} from "../../../api/services/tipo-controller.service";

@Component({
  selector: 'app-form-cliente',
  templateUrl: './form-tipo.component.html',
  styleUrls: ['./form-tipo.component.scss']
})
export class FormTipoComponent {
  formGroup!: FormGroup;
  public readonly ACAO_INCLUIR = "Incluir";
  public readonly ACAO_EDITAR = "Editar";

  acao: string = this.ACAO_INCLUIR;
  id!: number;
  nome!: string;
  descricao!: string;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private _adapter: DateAdapter<any>,
    public tipoService: TipoControllerService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private securityService: SecurityService
  ) {
    this.createForm();
    this._adapter.setLocale('pt-br');
    this.prepararEdicao();
  }

  ngOnInit(){
    if (!this.securityService.hasRoles(["ROLE_ADMIN"])) {
      this.router.navigate(['/']);
    }
  }

  createForm() {
    if (this.acao == "Editar") {
      this.tipoService.tipoControllerObterPorId({id: this.id}).subscribe(retorno =>
        this.formGroup = this.formBuilder.group({
          nome: [retorno.nome, Validators.required],
          descricao: [retorno.descricao, ]
        }));
    } else {
      this.formGroup = this.formBuilder.group({
        nome: [null, Validators.required],
        descricao: [null, Validators.required],
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

  private prepararEdicao() {
    const paramId = this.route.snapshot.paramMap.get('id');
    if (paramId) {
      const id = parseInt(paramId);
      this.tipoService.tipoControllerObterPorId({id: id}).subscribe(
        retorno => {
          this.acao = this.ACAO_EDITAR;
          this.id = retorno.id || 0;
          this.formGroup.patchValue(retorno);
        }
      )
    }
  }

  private realizarEdicao() {
    this.tipoService.tipoControllerAlterar({id: this.id, body: this.formGroup.value})
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
    this.router.navigateByUrl('/tipo');
  }
}
