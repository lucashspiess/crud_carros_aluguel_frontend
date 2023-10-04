import {Component, OnInit} from '@angular/core';
import {CarroDto} from "../../../api/models/carro-dto";
import {CarroControllerService} from "../../../api/services/carro-controller.service";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {
  ConfirmationDialog,
  ConfirmationDialogResult
} from "../../../core/confirmation-dialog/confirmation-dialog.component";
import {Router} from "@angular/router";
import {SecurityService} from "../../../arquitetura/security/security.service";
import {ImagemDialogComponent} from "../imagem-dialog/imagem-dialog.component";
import {ImagemControllerService} from "../../../api/services/imagem-controller.service";
@Component({
  selector: 'app-list-carro-alugado',
  templateUrl: './list-carro-alugado.component.html',
  styleUrls: ['./list-carro-alugado.component.scss']
})
export class ListCarroAlugadoComponent implements OnInit {
  carros: CarroDto[] = [];
  constructor(
    public carroService: CarroControllerService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router,
    public securityService: SecurityService,
    public imagemService: ImagemControllerService
  ) {
  }

  ngOnInit(): void {
    this.buscarDados();
  }

  private buscarDados() {
    this.carroService.carroControllerListarAlugados().subscribe(data => {
      this.carros = data;
    })
  }

  abrirImagem(id: number | undefined){
    this.dialog.open(ImagemDialogComponent, {
      data:{
        id: id
      }
    });
  }

  confirmarDevolver(carroDto: CarroDto)
  {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      data: {
        titulo: 'Confirmar?',
        mensagem: `A devolução de: ${carroDto.modelo} (placa: ${carroDto.placa})?`,
        textoBotoes: {
          ok: 'Confirmar',
          cancel: 'Cancelar',
        },
        dado: carroDto
      },
    });

    dialogRef.afterClosed().subscribe((confirmed: ConfirmationDialogResult) => {
      if (confirmed?.resultado) {
        this.desalugar(confirmed.dado.placa);
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

  desalugar(placa: string){
    this.carroService.carroControllerDesalugar({placa: placa}).subscribe();
    this.showMensagemSimples("Carro devolvido com sucesso!");
    this.atualizar();
  }

  private atualizar() {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigateByUrl('/carro');
    });
  }
}
