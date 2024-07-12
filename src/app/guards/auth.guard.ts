import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';


/*-----conectar servicio----*/
import { ServicioService } from '../servicio/servicio.service';

/*---usar ruta----*/
import { Router } from "@angular/router"

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(private conectarServicio:ServicioService, private usarRuta:Router){}


  canActivate(): boolean {
      
    if( this.conectarServicio.estaAutenticado() == true){
      
      return true;

    }else{
        
      this.usarRuta.navigate(['login']);
      return false;

    }
  
  return true;

  }
  
}
