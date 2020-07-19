import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-diario',
  templateUrl: './diario.component.html',
  styleUrls: ['./diario.component.css']
})
export class DiarioComponent implements OnInit {
	bakup:any;	
	registros:any;
	error:any;  	
	fecha:any;
  constructor(private http: HttpClient) { }
        arry = [1,5,6,3,6,82,5];
  async ngOnInit() {
			try {
      				await this.cargarDiario();
      		   		 }
    			catch (err) {
      				this.error = "Error al iniciar";
					}
		}

  async cargarDiario() { 
			try {
      				let resultado: any;
	
				resultado = await this.http.get("http://localhost:3000/api/descargo", {withCredentials: true}).toPromise();
				this.registros = resultado;
				this.registros.sort((a, b) => {
        							if (b.fecha < a.fecha)
        							return 1

        							if (b.fecha > a.fecha)
          							return -1

        							return 0;

});
				this.bakup = this.registros;
				
				}
    			catch (err) {
      				this.error = "Error: No iniciaste Sesion";
				
						}
				}
filtrar(fecha){
		this.fecha=fecha;
		if(this.bakup!=this.registros){this.registros=this.bakup;}
		let comidasDelDia = [];
		this.registros.forEach(unDiario => {
      		if (unDiario.fecha == this.fecha) {
       		comidasDelDia.push(unDiario);
      }
    });

    this.registros = comidasDelDia;
    console.log(this.registros);
    console.log(this.fecha);
}
}
