import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DateAdapter} from "@angular/material/core";
import {CarroControllerService} from "../../../api/services/carro-controller.service";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute, Router} from "@angular/router";
import {AluguelControllerService} from "../../../api/services/aluguel-controller.service";
import {
  ConfirmationDialog,
  ConfirmationDialogResult
} from "../../../core/confirmation-dialog/confirmation-dialog.component";
import {AluguelDto} from "../../../api/models/aluguel-dto";
import {ClienteControllerService} from "../../../api/services/cliente-controller.service";

@Component({
  selector: 'app-form-cliente',
  templateUrl: './form-aluguel.component.html',
  styleUrls: ['./form-aluguel.component.scss']
})
export class FormAluguelComponent {
  formGroup!: FormGroup;
  placa!: string;
  cpf!: number;
  data_inicio: Date = new Date();
  data_fim: Date = new Date();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private _adapter: DateAdapter<any>,
    public aluguelService: AluguelControllerService,
    public carroService: CarroControllerService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    public clienteService: ClienteControllerService
  ) {
    this.createForm();
    this._adapter.setLocale("pt-br");
  }

  createForm() {
    const paramPlaca = this.route.snapshot.paramMap.get('placa');
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
      this.carroService.obterPorPlaca({placa: placa}).subscribe(
        retorno => {
          this.placa = retorno.placa || "";
          this.formGroup.patchValue({placa: retorno.placa});
        }
      )
      this.formGroup = this.formBuilder.group({
        placa: [placa, Validators.required],
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
    this.carroService.obterPorPlaca({placa: aluguelDto.placa || ""}).subscribe(retorno => {
      this.aluguelService.incluirAluguel({placa: aluguelDto.placa || "", body: aluguelDto}).subscribe(retorno1 => {
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
            this.aluguelService.removerAluguel({id: retorno1.id || 0}).subscribe();
          }
        });
      })
    })
  }

  verificarCliente(aluguelDto: AluguelDto) {
    this.clienteService.obterPorCpfCliente({cpf: aluguelDto.cpf_cliente || 0}).subscribe(retorno =>{
      this.confirmarAluguel(aluguelDto);
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
            const paramInicio = new Date(aluguelDto.data_inicio || "");
            const paramFim = new Date(aluguelDto.data_fim || "");
            this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
              this.router.navigateByUrl(`/cliente/novo/${aluguelDto.cpf_cliente}/${paramInicio.toISOString()}/${paramFim.toISOString()}/${aluguelDto.placa}`);
            });
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
