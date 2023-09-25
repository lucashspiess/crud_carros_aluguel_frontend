import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {UsuarioControllerService} from "../../../api/services/usuario-controller.service";
import {UsuarioDto} from "../../../api/models/usuario-dto";
import {
  ConfirmationDialog,
  ConfirmationDialogResult
} from "../../../core/confirmation-dialog/confirmation-dialog.component";
import {User} from "../../../arquitetura/security/User";
import {SecurityService} from "../../../arquitetura/security/security.service";
import {AutenticacaoService} from "../../../arquitetura/autenticacao/autenticacao.service";
import {AuthDto} from "../../../api/models/auth-dto";

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.scss']
})
export class CadastroUsuarioComponent {
  formGroup !: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private dialog: MatDialog,
    private usuarioService: UsuarioControllerService,
    private securityService: SecurityService,
    private autenticationService: AutenticacaoService
  ) {
    this.createForm();
  }

  createForm() {

    this.formGroup = this.formBuilder.group({

      login: [null, Validators.required],
      senha: [null, Validators.required],
      nome: [null, Validators.required],
      email: [null, Validators.required],

    })
  }

  public handleError = (controlName: string, errorName: string) => {
    return this.formGroup.controls[controlName].hasError(errorName);
  }


  onSubmit() {

    if (this.formGroup.valid) {
      this.usuarioService.usuarioControllerIncluir({modeloDTO: this.formGroup.value}).subscribe(
        retorno => {
          console.log("Usuario:", retorno.nome, "incluido")
          const novoUsuario: UsuarioDto = retorno
          this.confirmarCadastro(novoUsuario);
        },
        error => {
          console.log("Não funcionou", error);
          alert("Não incluido")
        }
      )
    }

  }

  confirmarCadastro(novoUsuario: UsuarioDto) {

    const dialogRef = this.dialog.open(ConfirmationDialog, {
      data: {
        titulo: 'Mensagem!!!',
        mensagem: `Inclusão de: ${novoUsuario.nome} (ID: ${novoUsuario.codigo}) realiza com sucesso!`,
        textoBotoes: {
          ok: 'ok',
        },
      },
    });
    dialogRef.afterClosed().subscribe((confirmed: ConfirmationDialogResult) => {
      if (confirmed?.resultado) {
        this.realizarLogin(novoUsuario);
      }
    });
  }

  private realizarLogin(novoUsuario: UsuarioDto) {

    // @ts-ignore
    const authDTO: AuthDto = {login: novoUsuario.login, senha: novoUsuario.senha}
    this.autenticationService.login(authDTO).subscribe(data => {
      const user: User = {
        id: data.id,
        nome: data.nome,
        login: data.login,
        expiresIn: data.expiresIn,
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        roles: data.roles
      };

      this.securityService.init(user);
      this.router.navigate(['/']);
    }, error => {
      console.log('erro', error);
      alert(error);
      // }
    });
  }

}
