import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DateAdapter} from "@angular/material/core";
import {CarroControllerService} from "../../../api/services/carro-controller.service";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute, Router} from "@angular/router";
import {SecurityService} from "../../../arquitetura/security/security.service";
import {TipoDto} from "../../../api/models/tipo-dto";
import {TipoControllerService} from "../../../api/services/tipo-controller.service";
import {TipoDialogComponent} from "../../tipo-dialog/tipo-dialog.component";
import {ImagemControllerService} from "../../../api/services/imagem-controller.service";
import {Imagem} from "../../../api/models/imagem";

@Component({
  selector: 'app-form-carro',
  templateUrl: './form-carro.component.html',
  styleUrls: ['./form-carro.component.scss']
})
export class FormCarroComponent {
  formGroup!: FormGroup;
  selectedFile!: File
  public readonly ACAO_INCLUIR = "Incluir";
  public readonly ACAO_EDITAR = "Editar";

  imagem_id!: number;

  acao: string = this.ACAO_INCLUIR;
  placa!: string;
  tipos: TipoDto[] = [];

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private _adapter: DateAdapter<any>,
    public carroService: CarroControllerService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private tipoService: TipoControllerService,
    private securityService: SecurityService,
    private imagemService: ImagemControllerService
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
    this.dialog.open(TipoDialogComponent).afterClosed().subscribe(
      () => this.carregarDados()
    );
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
            tipo_id: [retorno.tipo_id, Validators.required],
            imagem_id: [retorno.imagem_id, Validators.required]
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
          tipo_id: [null, Validators.required],
          imagem_id: [null, Validators.required]
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
    } else{
      console.log("inválido: " + JSON.stringify(this.formGroup.value));
    }
  }

  private realizarInclusao() {
    console.log(this.formGroup.value)
    this.carroService.carroControllerIncluirCarro({body: this.formGroup.value})
      .subscribe(retorno => {
        console.log("inlcuido: " + retorno);
        this.showMensagemSimples("Inclusão realizada com sucesso!");
      }, erro => {
        console.log("Erro:" + JSON.stringify(erro));
      })
  }

  public handleError = (controlName: string, errorName: string) => {
    return this.formGroup.controls[controlName].hasError(errorName);
  };

  private prepararEdicao() {
    const paramPlaca = this.route.snapshot.paramMap.get('placa');
    if (paramPlaca) {
      this.carroService.carroControllerObterPorPlaca({placa: paramPlaca}).subscribe(
        retorno => {
          console.log(retorno)
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
        console.log("editado: " + JSON.stringify(retorno));
        this.showMensagemSimples("Edição realizada com sucesso!")
        this.router.navigateByUrl("/carro");
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

  onFileChanged(event: Event) {
    if(event){
      // @ts-ignore
      this.selectedFile = event.target.files[0];
      this.imagemService.imagemControllerUploadImagem({body: {imagemASalvar: this.selectedFile}}).subscribe(
        retorno => this.formGroup.patchValue({imagem_id: retorno})
      );
    }
  }
}
