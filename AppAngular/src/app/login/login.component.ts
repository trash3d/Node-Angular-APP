import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
  }
	nombreUsuario="";
    	password= "";
    	error="";
async login() {
	
	try {
   		
      		let body = {
        			nombreUsuario: this.nombreUsuario,
        			password: this.password
     			   }

      		let nuevoDiario = await this.http.post('http://localhost:3000/api/login', {nombreUsuario: this.nombreUsuario, password: this.password}, {withCredentials: true}).toPromise();
		this.router.navigateByUrl('/diario');
    	    }
    	catch (err) {
     			this.error = "Usuario y Password incorrectos";
   		    }
		}
signin(){this.router.navigateByUrl('/signin');}
}
