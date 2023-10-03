import { Component } from '@angular/core';
import {SecurityService} from "../../../arquitetura/security/security.service";

@Component({
  selector: 'app-tab-carro',
  templateUrl: './tab-carro.component.html',
  styleUrls: ['./tab-carro.component.scss']
})
export class TabCarroComponent {
  constructor(public securityService: SecurityService,) {
  }

}
