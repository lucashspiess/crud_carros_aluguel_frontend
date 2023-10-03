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
import {AluguelDto} from "../../../api/models/aluguel-dto";
import {AluguelControllerService} from "../../../api/services/aluguel-controller.service";
import {SecurityService} from "../../../arquitetura/security/security.service";
import {MessageService} from "../../../arquitetura/message/message.service";
import {ImagemDialogComponent} from "../imagem-dialog/imagem-dialog.component";
import {ImagemControllerService} from "../../../api/services/imagem-controller.service";
import {Imagem} from "../../../api/models/imagem";
@Component({
  selector: 'app-list-carro',
  templateUrl: './list-carro.component.html',
  styleUrls: ['./list-carro.component.scss']
})
export class ListCarroComponent implements OnInit {
  carros: CarroDto[] = [];
  imagem!: Imagem;

  private readonly PATH_FRONT = "C:\\Portable20231\\workspace\\ueg-prog-webi-faculdade\\src\\carros\\";

  constructor(
    public carroService: CarroControllerService,
    public aluguelService: AluguelControllerService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router,
    public securityService: SecurityService,
    private imagemService: ImagemControllerService
  ) {
  }

  ngOnInit(): void {
    this.buscarDados();
  }

  private buscarDados() {
    this.carroService.carroControllerListAllCarro().subscribe(data => {
      this.carros = data;
    })
  }

  remover(carroDto: CarroDto) {
    this.carroService.carroControllerRemoverCarro({placa: carroDto.placa || ""})
      .subscribe(retorno => {
          this.buscarDados();
          this.showMensagemSimples("Excluído com sucesso ",5000);
          this.atualizar();
        }, error => {
          if (error.status === 500) {
            console.log(carroDto);
            this.showMensagemSimples("Não é possível excluir um carro alugado")
          } else {
            this.showMensagemSimples("Erro ao excluir");
          }
        }
      );
    if(carroDto.imagem_caminhoArq && carroDto.imagem_caminhoFront){
      this.imagemService.imagemControllerExcluirFoto( {path: carroDto.imagem_caminhoArq}).subscribe();
      this.imagemService.imagemControllerExcluirFoto({path: carroDto.imagem_caminhoFront}).subscribe();
    }

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
        console.log(confirmed.dado);
        this.remover(confirmed.dado);
      }
    });
  }

  abrirImagem(caminho: string | undefined){
    this.dialog.open(ImagemDialogComponent, {
      data:{
        caminho: caminho
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

  protected readonly toString = toString;
}
