import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
 // lo de abajo emula un array de objetos para ver si el formulario funciona
 // despues se borra y esto lo toma de la base de datos
	@Input() registros;
	@Output() onBorre = new EventEmitter();
	error:any;
  constructor(private http: HttpClient) { }

  async ngOnInit() {}
  
	async borrar(id){
			try {
      		let nuevoDiario = await this.http.delete('http://localhost:3000/api/registro/'+ id, {withCredentials: true}).toPromise();
		this.onBorre.emit('');
    	    }
    	catch (err) {
     			this.error = "Error al borrar";
   		    }
		}
}
