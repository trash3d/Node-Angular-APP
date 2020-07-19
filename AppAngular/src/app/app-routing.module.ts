import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DiarioComponent } from './diario/diario.component';
import { LoginComponent } from './login/login.component';
import { AgregarComponent } from './agregar/agregar.component';
import { SinginComponent } from './singin/singin.component';
const routes: Routes = [
			{ path: '', component: LoginComponent },
			{ path: 'diario', component: DiarioComponent },
			{ path: 'agregar', component: AgregarComponent },
			{ path: 'signin', component: SinginComponent }
  			];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
