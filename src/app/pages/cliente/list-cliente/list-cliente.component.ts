import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {CarroDto} from "../../../api/models/carro-dto";
import {CarroControllerService} from "../../../api/services/carro-controller.service";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {
  ConfirmationDialog,
  ConfirmationDialogResult
} from "../../../core/confirmation-dialog/confirmation-dialog.component";
import {Router} from "@angular/router";
import {ClienteControllerService} from "../../../api/services/cliente-controller.service";
import {ClienteDto} from "../../../api/models/cliente-dto";

@Component({
  selector: 'app-list-cliente',
  templateUrl: './list-cliente.component.html',
  styleUrls: ['./list-cliente.component.scss']
})
export class ListClienteComponent implements OnInit {
  colunasMostrar = ['nome','email','cpf', 'acao'];
  clienteListaDataSource: MatTableDataSource<ClienteDto> = new MatTableDataSource<ClienteDto>([]);

  constructor(
    public clienteService: ClienteControllerService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.buscarDados();
  }

  private buscarDados() {
    this.clienteService.listAllCliente().subscribe(data => {
      this.clienteListaDataSource.data = data;
    })
  }

  remover(clienteDto: ClienteDto) {
    this.clienteService.removerCliente({id: clienteDto.id || 0})
      .subscribe(retorno => {
          this.buscarDados();
          this.showMensagemSimples("Excluído com sucesso ",5000);
          this.atualizar();
        }, error => {
          if (error.status === 500) {
            this.showMensagemSimples("Não é possível excluir um cliente")
          } else {
            this.showMensagemSimples("Erro ao excluir");
          }
        }
      )
  }

  confirmarExcluir(clienteDto: ClienteDto) {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      data: {
        titulo: 'Confirmar?',
        mensagem: `A exclusão de: ${clienteDto.nome} (id: ${clienteDto.id})?`,
        textoBotoes: {
          ok: 'Confirmar',
          cancel: 'Cancelar',
        },
        dado: clienteDto
      },
    });

    dialogRef.afterClosed().subscribe((confirmed: ConfirmationDialogResult) => {
      if (confirmed?.resultado) {
        this.remover(confirmed.dado);
      }
    });
  }

  showMensagemSimples( mensagem: string, duracao: number = 2000) {
    this.snackBar.open(mensagem, 'Fechar', {
      duration: duracao,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  private atualizar() {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigateByUrl('/cliente');
    });
  }
}
