import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {
	fecha:any;
	@Input() registros;
	@Output() onBuscar = new EventEmitter();
	@Output() onRecargue = new EventEmitter();
  constructor(private http: HttpClient) { }

  ngOnInit() {}

filtrar(fecha) {
    this.fecha=fecha;
    console.log(this.fecha+"buscarlista");
    this.onBuscar.emit(this.fecha);
}
recargar(){this.onRecargue.emit('');}
}
