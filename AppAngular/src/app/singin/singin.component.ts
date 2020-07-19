import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-singin',
  templateUrl: './singin.component.html',
  styleUrls: ['./singin.component.css']
})
export class SinginComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
  }
	nombreUsuario="";
    	password= "";
    	error="";
async signin() {
	
	try {
   		
      		let body = {
        			nombreUsuario: this.nombreUsuario,
        			password: this.password
     			   }

      		let nuevoDiario = await this.http.post('http://localhost:3000/api/crearusuario', {nombreUsuario: this.nombreUsuario, password: this.password}, {withCredentials: true}).toPromise();
		this.router.navigateByUrl('/');
    	    }
    	catch (err) {
     			this.error = "Usuario y Password incorrectos";
   		    }
		}

}
