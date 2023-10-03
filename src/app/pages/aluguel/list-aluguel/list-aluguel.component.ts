import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Router} from "@angular/router";
import {AluguelControllerService} from "../../../api/services/aluguel-controller.service";
import {AluguelDto} from "../../../api/models/aluguel-dto";

@Component({
  selector: 'app-list-tipo',
  templateUrl: './list-aluguel.component.html',
  styleUrls: ['./list-aluguel.component.scss']
})
export class ListAluguelComponent implements OnInit {
  colunasMostrar = ['cpf_cliente','placa','data_inicio','data_fim','valor'];
  aluguelListaDataSource: MatTableDataSource<AluguelDto> = new MatTableDataSource<AluguelDto>([]);

  constructor(
    public aluguelService: AluguelControllerService,
  ) {
  }

  ngOnInit(): void {
    this.buscarDados();
  }

  private buscarDados() {
    this.aluguelService.aluguelControllerListAllAluguel().subscribe(data => {
      this.aluguelListaDataSource.data = data;
    })
  }
}
