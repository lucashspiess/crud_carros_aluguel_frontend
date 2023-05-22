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
import {FormCarroComponent} from "../form-carro/form-carro.component";

@Component({
  selector: 'app-list-carro',
  templateUrl: './list-carro.component.html',
  styleUrls: ['./list-carro.component.scss']
})
export class ListCarroComponent implements OnInit {
  colunasMostrar = ['modelo', 'cor', 'ano', 'quilometragem','placa','status', 'acao'];
  carroListaDataSource: MatTableDataSource<CarroDto> = new MatTableDataSource<CarroDto>([]);

  constructor(
    public carroService: CarroControllerService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.buscarDados();
  }

  private buscarDados() {
    this.carroService.listAll().subscribe(data => {
      this.carroListaDataSource.data = data;
      this.carroListaDataSource.sort;
    })
  }

  remover(carroDto: CarroDto) {
    this.carroService.remover({placa: carroDto.placa || ""})
      .subscribe(retorno => {
          this.buscarDados();
          this.showMensagemSimples("Excluído com sucesso ",5000);
          this.atualizar();
        }, error => {
          if (error.status === 500) {
            this.showMensagemSimples("Não é possível excluir um carro alugado")
          } else {
            this.showMensagemSimples("Erro ao excluir");
          }
        }
      )
  }

  confirmarExcluir(carroDto: CarroDto) {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      data: {
        titulo: 'Confirmar?',
        mensagem: `A exclusão de: ${carroDto.modelo} (placa: ${carroDto.placa})?`,
        textoBotoes: {
          ok: 'Confirmar',
          cancel: 'Cancelar',
        },
        dado: carroDto
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

  alugar(placa: string){
    this.carroService.alugar({placa: placa}).subscribe();
    this.atualizar();
  }

  desalugar(placa: string){
    this.carroService.desalugar({placa: placa}).subscribe();
    this.atualizar();
  }

  private atualizar() {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigateByUrl('/carro');
    });
  }
}
