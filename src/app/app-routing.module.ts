import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/*-----componentes----*/
import { LoginComponent }        from "./pages/login/login.component"
import { RegistroComponent }     from './pages/registro/registro.component';
import { InicioComponent }       from './pages/inicio/inicio.component';
import { PacientesComponent }    from './pages/pacientes/pacientes.component';
import { RegpacientesComponent } from './pages/regpacientes/regpacientes.component';
import { InformacionComponent } from './pages/informacion/informacion.component';
import { EditarComponent } from './pages/editar/editar.component';
import { AgendarComponent } from './pages/agendar/agendar.component';
import { CitasComponent } from './pages/citas/citas.component';




/*---importar guard----*/
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [

  { path: "login",             component: LoginComponent },
  { path: "registro",          component: RegistroComponent },
  { path: "inicio",            component: InicioComponent, canActivate: [ AuthGuard ] },
  { path: "pacientes",         component:  PacientesComponent, canActivate: [ AuthGuard ] },
  { path: "citas",             component: CitasComponent, canActivate: [ AuthGuard ] },
  { path: "registropacientes", component: RegpacientesComponent, canActivate: [ AuthGuard ] },
  { path: "informacion",       component: InformacionComponent, canActivate: [ AuthGuard ] },
  { path: "editar/:id",        component: EditarComponent, canActivate: [ AuthGuard ] },
  { path: "agendar/:id",           component: AgendarComponent, canActivate: [ AuthGuard ] },
  { path: "**", pathMatch: "full", redirectTo:"login" }


];



@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true }  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
