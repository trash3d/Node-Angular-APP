import { Component, OnInit, Output, EventEmitter  } from '@angular/core';

@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.component.html',
  styleUrls: ['./filtro.component.css']
})
export class FiltroComponent implements OnInit {
  
  fecha= new Date();
  @Output() onBuscar = new EventEmitter();
  @Output() onRecargue = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
buscar() {
    console.log(this.fecha+"Fecha filtro");
    this.onBuscar.emit(this.fecha);
}
recargar(){this.onRecargue.emit('');}
}
