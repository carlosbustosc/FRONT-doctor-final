import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

/*------formulario reactivo-----*/
import { FormsModule, ReactiveFormsModule } from "@angular/forms"


/*-----paginas componentes---*/
import { NavbarComponent } from './components/navbar/navbar.component';

import { InicioComponent } from './pages/inicio/inicio.component';
import { LoginComponent } from './pages/login/login.component';
import { PacientesComponent } from './pages/pacientes/pacientes.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { RegpacientesComponent } from './pages/regpacientes/regpacientes.component';
import { InformacionComponent } from './pages/informacion/informacion.component';
import { EditarComponent } from './pages/editar/editar.component';
import { AgendarComponent } from './pages/agendar/agendar.component';
import { CitasComponent } from './pages/citas/citas.component';

/*-----usarHttpClientModule-------*/
import { HttpClientModule } from "@angular/common/http";
import { CardComponent } from './components/card/card.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    RegistroComponent,
    InicioComponent,
    PacientesComponent,
    RegpacientesComponent,
    InformacionComponent,
    EditarComponent,
    AgendarComponent,
    CitasComponent,
    CardComponent
   
 
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule

    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
