import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {
  ConfirmationDialog,
  ConfirmationDialogResult
} from "../../../core/confirmation-dialog/confirmation-dialog.component";
import {Router} from "@angular/router";
import {ClienteDto} from "../../../api/models/cliente-dto";
import {TipoDto} from "../../../api/models/tipo-dto";
import {TipoControllerService} from "../../../api/services/tipo-controller.service";
import {SecurityService} from "../../../arquitetura/security/security.service";

@Component({
  selector: 'app-list-tipo',
  templateUrl: './list-tipo.component.html',
  styleUrls: ['./list-tipo.component.scss']
})
export class ListTipoComponent implements OnInit {
  colunasMostrar = ['nome','descricao', 'acao'];
  tipoListaDataSource: MatTableDataSource<TipoDto> = new MatTableDataSource<ClienteDto>([]);
  securityService!: SecurityService;

  constructor(
    public tipoService: TipoControllerService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    public router: Router
  ) {
  }

  ngOnInit(){
    if (!this.securityService.hasRoles(["ROLE_ADMIN"])) {
      this.showMensagemSimples("Usuário não tem permissão para acessar esta página!");
      this.router.navigate(['/']);
    } else {
      this.buscarDados();
    }
  }

  private buscarDados() {
    this.tipoService.tipoControllerListAll().subscribe(data => {
      this.tipoListaDataSource.data = data;
    })
  }

  remover(tipoDto: TipoDto) {
    this.tipoService.tipoControllerRemover({id: tipoDto.id || 0})
      .subscribe(retorno => {
          this.buscarDados();
          this.showMensagemSimples("Excluído com sucesso ",5000);
          this.atualizar();
        }, error => {
          if (error.status === 500) {
            this.showMensagemSimples("Não é possível excluir um tipo")
          } else {
            this.showMensagemSimples("Erro ao excluir");
          }
        }
      )
  }

  confirmarExcluir(tipoDto: TipoDto) {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      data: {
        titulo: 'Confirmar?',
        mensagem: `A exclusão de: ${tipoDto.nome} (id: ${tipoDto.id})?`,
        textoBotoes: {
          ok: 'Confirmar',
          cancel: 'Cancelar',
        },
        dado: tipoDto
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
      this.router.navigateByUrl('/tipo');
    });
  }
}
