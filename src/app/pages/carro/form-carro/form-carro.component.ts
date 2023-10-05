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
import {TipoDialogComponent} from "../../tipo/tipo-dialog/tipo-dialog.component";
import {ImagemControllerService} from "../../../api/services/imagem-controller.service";
import {ImagemDialogComponent} from "../../../core/imagem-dialog/imagem-dialog.component";

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

  imagem_id!: number | undefined;
  imagemIdAntigo!: number | undefined;
  imagem_path!: string | undefined;

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
      this.showMensagemSimples("Verifique se todos os campos estão preenchidos!");
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
          this.acao = this.ACAO_EDITAR;
          this.placa = retorno.placa || "";
          this.imagem_id = retorno.imagem_id;
          this.imagemIdAntigo = retorno.imagem_id;
          this.formGroup.patchValue(retorno);
        }
      )
    }
  }

  private realizarEdicao() {
    this.carroService.carroControllerAlterarCarro({placa: this.placa, body: this.formGroup.value})
      .subscribe(retorno => {
        if(this.imagemIdAntigo && retorno.imagem_id != this.imagemIdAntigo){
          this.imagemService.imagemControllerExcluirFoto({id: this.imagemIdAntigo}).subscribe();
        }
        console.log("editado: " + retorno);
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

  abrirImagem(id: number | undefined){
    this.dialog.open(ImagemDialogComponent, {
      data:{
        id: id
      }
    });
  }

  cancelar(){
    if(this.imagemIdAntigo){
      if(this.imagem_id && this.imagemIdAntigo != this.imagem_id){
        this.imagemService.imagemControllerExcluirFoto({id: this.imagem_id}).subscribe();
      }
    } else if (this.imagem_id){
      this.imagemService.imagemControllerExcluirFoto({id: this.imagem_id}).subscribe();
    }
    this.router.navigateByUrl('/carro');
  }

  onFileChanged(event: Event) {
    if(event){
      // @ts-ignore
      this.selectedFile = <File>event.target.files[0];
      // @ts-ignore
      if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();
        reader.onload = (event: any) => {
          this.imagem_path = event.target.result;
        }
      }
      this.imagemService.imagemControllerUploadImagem({body: {imagemASalvar: this.selectedFile}}).subscribe(
        retorno => {
          this.imagem_id = retorno.id;
          this.formGroup.patchValue({imagem_id: this.imagem_id});
          console.log(this.formGroup.value);
        }
      );
    }
  }
}
