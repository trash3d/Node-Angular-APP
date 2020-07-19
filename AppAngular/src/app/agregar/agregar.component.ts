import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {
    // aca van las propiedades y variables que afectan al ts de agregar
    opcion="0";
    nombre="";
    fecha= "";
    mensaje="";
    error='';
    @Output() onAgregue = new EventEmitter();
  constructor(private http: HttpClient, private router: Router) { }
  ngOnInit() {}

async enviar() {
	try {
		 this.error="";
   		 if (this.nombre == '') {
        				this.error += 'Debes agregar un Nombre.  ';
					}
		if (this.fecha == '') {
        				this.error += 'Debes agregar una Fecha.  ';
					}
		if (this.mensaje == '') {
        				this.error += 'Debes agregar un Mensaje.  ';
					}
		if (this.opcion == '0') {
        				this.error += 'Debes agregar un Estado de animo.  ';
					}
		
      		let body = {
        			nombre: this.nombre,
        			fecha: this.fecha,
        			mensaje: this.mensaje,
				opcion: this.opcion
     			   }

      		let nuevoDiario = await this.http.post('http://localhost:3000/api/descargo', body, {withCredentials: true}).toPromise();
		this.nombre="";
    		this.fecha= "";
    		this.mensaje="";
		this.opcion="0";
		this.onAgregue.emit('');
    	    }
    	catch (err) {
     			this.error = "Error al guardar.  "+this.error;
			console.log(this.error+err);
			
   		    }
		
		}
	
}
