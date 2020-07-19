import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgregarComponent } from './agregar/agregar.component';
import { FiltroComponent } from './filtro/filtro.component';
import { ListadoComponent } from './listado/listado.component';
import { ItemComponent } from './item/item.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DiarioComponent } from './diario/diario.component';
import { LoginComponent } from './login/login.component';
import { SinginComponent } from './singin/singin.component';


@NgModule({
  declarations: [
    AppComponent,
    AgregarComponent,
    FiltroComponent,
    ListadoComponent,
    ItemComponent,
    DiarioComponent,
    LoginComponent,
    SinginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
