import {Component, ViewChild} from '@angular/core';
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {MatSidenav} from "@angular/material/sidenav";
import {BreakpointObserver} from "@angular/cdk/layout";
import {NavigationEnd, Router} from "@angular/router";
import {delay} from "rxjs";
import {filter} from "rxjs/operators";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CarroDto} from "../../api/models/carro-dto";
import {ConfirmationDialog} from "../confirmation-dialog/confirmation-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {SecurityService} from "../../arquitetura/security/security.service";
import {MessageService} from "../../arquitetura/message/message.service";


@UntilDestroy()
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  admin!: boolean;

  constructor(
    private observer: BreakpointObserver,
    private router: Router,
    private dialog: MatDialog,
    private mensageService: MessageService,
    public securityService: SecurityService
  ) {
  }

  ngOnInit(): void {
    if(this.securityService.credential.accessToken == ""){
      this.router.navigate(['/acesso']);
    }else {

      if (this.securityService.isValid()) {
        this.router.navigate(['/']);
        this.admin = !this.securityService.hasRoles(['ROLE_ADMIN'])
      }
      if (!this.securityService.isValid())
        this.router.navigate(['/acesso']);
    }
  }

  ngAfterViewInit() {
    this.observer
      .observe(['(max-width: 800px)'])
      .pipe(delay(1), untilDestroyed(this))
      .subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });

    this.router.events
      .pipe(
        untilDestroyed(this),
        filter((e) => e instanceof NavigationEnd)
      )
      .subscribe(() => {
        if (this.sidenav.mode === 'over') {
          this.sidenav.close();
        }
      });
  }

  mostrarSobre() {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      data: {
        titulo: 'Sobre',
        mensagem: 'Sistema para controle de carros para aluguel - versão: 3.0',
        textoBotoes: {
          ok: 'Ok'
        },
      },
    });
  }

  mostrarAjuda() {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      data: {
        titulo: 'Ajuda',
        mensagem: 'Caso tenha algum problema, envie email para o endereço lucashs725@gmail.com',
        textoBotoes: {
          ok: 'Ok'
        },
      },
    });
  }

  sair() {
    this.securityService.invalidate();
    this.router.navigate(['/login']);
  }
}
