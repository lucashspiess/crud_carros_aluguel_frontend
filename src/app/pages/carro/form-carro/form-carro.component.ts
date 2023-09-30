import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DateAdapter} from "@angular/material/core";
import {CarroControllerService} from "../../../api/services/carro-controller.service";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute, Router} from "@angular/router";
import {SecurityService} from "../../../arquitetura/security/security.service";
import {TipoDto} from "../../../api/models/tipo-dto";
import {TipoControllerService} from "../../../api/services/tipo-controller.service";
import {CarroDto} from "../../../api/models/carro-dto";
import {MessageService} from "../../../arquitetura/message/message.service";
import {FormTipoComponent} from "../../tipo/form-tipo/form-tipo.component";
import {TipoDialogComponent} from "../../tipo-dialog/tipo-dialog.component";

@Component({
  selector: 'app-form-carro',
  templateUrl: './form-carro.component.html',
  styleUrls: ['./form-carro.component.scss']
})
export class FormCarroComponent {
  formGroup!: FormGroup;
  public readonly ACAO_INCLUIR = "Incluir";
  public readonly ACAO_EDITAR = "Editar";

  private carroDto: CarroDto = {
    placa: "", modelo: "", marca: "",
    tipo_nome: "", tipo_id: 0, quilometragem: 0,
    ano: 0, cor: "", status: "", diaria: 0};

  acao: string = this.ACAO_INCLUIR;
  placa!: string;
  tipos: TipoDto[] = [];
  marca!: string;
  modelo!: string;
  cor!: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private _adapter: DateAdapter<any>,
    public carroService: CarroControllerService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private tipoService: TipoControllerService,
    private securityService: SecurityService
  ) {
    this.carregarDados();
    this.createForm();
    this._adapter.setLocale('pt-br');
    this.prepararEdicao();
  }

  ngOnInit(){
    if (!this.securityService.hasRoles(["ROLE_ADMIN"])) {
      this.showMensagemSimples("Usuário não tem permissão para acessar esta página!");
      this.router.navigate(['/carro']);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(TipoDialogComponent);
  }


  createForm() {
      if(this.acao == "Editar"){
        this.carroService.carroControllerObterPorPlaca({placa: this.placa}).subscribe(retorno =>
          this.formGroup = this.formBuilder.group({
            marca: [retorno.marca, Validators.required],
            ano: [retorno.ano, Validators.required],
            modelo: [retorno.modelo, Validators.required],
            cor: [retorno.cor, Validators.required],
            placa: [retorno.placa],
            diaria: [retorno.diaria],
            quilometragem: [retorno.quilometragem, Validators.required],
          }));
      }else{
        this.formGroup = this.formBuilder.group({
          marca: [null, Validators.required],
          ano: [null, Validators.required],
          modelo: [null, Validators.required],
          cor: [null, Validators.required],
          placa: [null, Validators.required],
          diaria: [null, Validators.required],
          quilometragem: [null, Validators.required],
          tipo_id: [null, Validators.required]
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
    this.carroService.carroControllerIncluirCarro({body: this.formGroup.value})
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
      this.carroService.carroControllerObterPorPlaca({placa: placa}).subscribe(
        retorno => {
          this.acao = this.ACAO_EDITAR;
          this.placa = retorno.placa || "";
          this.formGroup.patchValue(retorno);
        }
      )
    }
  }

  private realizarEdicao() {
    this.carroService.carroControllerAlterarCarro({placa: this.placa, body: this.formGroup.value})
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

   carregarDados() {
    this.tipos = this.route.snapshot.data['tipos'];
    this.tipoService.tipoControllerListAll().subscribe(value => {
      this.tipos = value;
    })
  }
}
