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
import {HttpClient} from "@angular/common/http";
@Component({
  selector: 'app-list-carro-disponivel',
  templateUrl: './list-carro-disponivel.component.html',
  styleUrls: ['./list-carro-disponivel.component.scss']
})
export class ListCarroDisponivelComponent implements OnInit {
  carros: CarroDto[] = [];
  imagem!: any;

  constructor(
    public carroService: CarroControllerService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router,
    public securityService: SecurityService,
    public imagemService: ImagemControllerService,
    public http: HttpClient
  ) {
  }

  ngOnInit(): void {
    this.buscarDados();
  }

  private buscarDados() {
    this.carroService.carroControllerListarDisponiveis().subscribe(data => {
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
        this.imagemService.imagemControllerExcluirFoto({id: confirmed.dado.imagem_id});
        this.remover(confirmed.dado);
      }
    });
  }

  abrirImagem(id: number | undefined){
    this.dialog.open(ImagemDialogComponent, {
      data:{
        id: id
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
      this.router.navigateByUrl('/carro');
    });
  }
}
