import {Component, TemplateRef} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DateAdapter} from "@angular/material/core";
import {CarroControllerService} from "../../../api/services/carro-controller.service";
import {MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute, Router} from "@angular/router";
import {AluguelControllerService} from "../../../api/services/aluguel-controller.service";
import {
  ConfirmationDialog,
  ConfirmationDialogResult
} from "../../../core/confirmation-dialog/confirmation-dialog.component";
import {AluguelDto} from "../../../api/models/aluguel-dto";
import {ClienteControllerService} from "../../../api/services/cliente-controller.service";
import {TipoDialogComponent} from "../../tipo-dialog/tipo-dialog.component";
import {ClienteDialogComponent} from "../../cliente-dialog/cliente-dialog.component";
import {ClienteDto} from "../../../api/models/cliente-dto";
import {MessageService} from "../../../arquitetura/message/message.service";
import {TipoDto} from "../../../api/models/tipo-dto";

@Component({
  selector: 'app-form-cliente',
  templateUrl: './form-aluguel.component.html',
  styleUrls: ['./form-aluguel.component.scss']
})
export class FormAluguelComponent {
  formGroup!: FormGroup;
  carro_placa!: string;
  cpf!: number;
  data_inicio: any = new Date();
  data_fim: any = new Date();

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private _adapter: DateAdapter<any>,
    public aluguelService: AluguelControllerService,
    public carroService: CarroControllerService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    public clienteService: ClienteControllerService,
    private messageService: MessageService
  ) {
    this.createForm();
    this._adapter.setLocale("pt-br");
  }

  createForm() {
    const paramPlaca = this.route.snapshot.paramMap.get('carro_placa');
    const paramCpf = this.route.snapshot.paramMap.get('cpf');
    const paramInicio = this.route.snapshot.paramMap.get('data_inicio');
    const paramFim = this.route.snapshot.paramMap.get('data_fim');
    if (paramPlaca) {
      const placa = paramPlaca;
      if(paramCpf && paramInicio && paramFim){
        this.data_inicio = new Date(paramInicio);
        this.data_fim = new Date(paramFim);
        this.cpf = parseInt(paramCpf);
      }
      this.carroService.carroControllerObterPorPlaca({placa: placa}).subscribe(
        retorno => {
          this.carro_placa = retorno.placa || "";
          this.formGroup.patchValue({carro_placa: retorno.placa});
        }
      )
      this.formGroup = this.formBuilder.group({
        carro_placa: [placa, Validators.required],
        cpf_cliente: [this.cpf, Validators.required],
        data_inicio: [new Date(this.data_inicio), Validators.required],
        data_fim: [new Date(this.data_fim), Validators.required],
      })
    }
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

  atualizar() {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigateByUrl('/carro');
    });
  }

  confirmarAluguel(aluguelDto: AluguelDto) {
    aluguelDto.data_inicio = this._adapter.parse(aluguelDto.data_inicio,"dd-MM-yyyy").toLocaleDateString();
    aluguelDto.data_fim = this._adapter.parse(aluguelDto.data_fim,"dd-MM-yyyy").toLocaleDateString();
    this.carroService.carroControllerObterPorPlaca({placa: aluguelDto.carro_placa || ""}).subscribe(retorno => {
      this.aluguelService.aluguelControllerIncluirAluguel({placa: aluguelDto.carro_placa || "", cpf: aluguelDto.cpf_cliente || 0,body: aluguelDto}).subscribe(retorno1 => {
        const dialogRef = this.dialog.open(ConfirmationDialog, {
          data: {
            titulo: 'Confirmar?',
            mensagem: `O aluguel de ${retorno.modelo} placa ${retorno.placa} no valor de R$ ${retorno1.valor}?`,
            textoBotoes: {
              ok: 'Confirmar',
              cancel: 'Cancelar',
            },
            dado: aluguelDto
          }
        })
        dialogRef.afterClosed().subscribe((confirmed: ConfirmationDialogResult) => {
          if (confirmed?.resultado) {
            this.showMensagemSimples("Aluguel realizado com sucesso!");
            this.atualizar();
          } else {
            this.aluguelService.aluguelControllerRemoverAluguel({id: retorno1.id || 0}).subscribe();
          }
        });
      })
    })
  }

  openDialog(element: ClienteDto): void {
    console.log(element);
    const dialogRef = this.dialog.open(ClienteDialogComponent, {data:{cpf: element.cpf}});
  }

  verificarCliente(aluguelDto: AluguelDto) {
    this.clienteService.clienteControllerObterPorCpfCliente({cpf: aluguelDto.cpf_cliente || 0}).subscribe(retorno =>{
        this.confirmarAluguel(aluguelDto);
        this.cpf = aluguelDto.cpf_cliente || 0;
      }
      , error => {
        const dialogRef = this.dialog.open(ConfirmationDialog, {
          data: {
            titulo: 'Não cadastrado',
            mensagem: `Cliente não cadastrado, deseja realizar o cadastro?`,
            textoBotoes: {
              ok: 'Confirmar',
              cancel: 'Cancelar',
            }
          }
        })
        dialogRef.afterClosed().subscribe((confirmed: ConfirmationDialogResult) => {
          if (confirmed?.resultado) {
            this.openDialog({cpf: aluguelDto.cpf_cliente, email: "", nome: ""});
          }
        });
      })
  }

  onSubmit() {
    if (this.formGroup.valid) {
      this.verificarCliente(this.formGroup.value);
    }
  }
}
