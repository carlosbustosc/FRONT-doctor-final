import { Component, OnInit } from '@angular/core';

/*-----conectar servicio-----*/
import { ServicioService } from '../../servicio/servicio.service';

/*-------usar ruta----------*/
import { Router } from  '@angular/router';

//import * as $ from 'jquery';
declare var $:any;



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  mostrarCerrarSesion:boolean = true;
  nombrePerfil:any = ""

  
  constructor(private conectarServicio:ServicioService, private usarRuta:Router ) {
   
  
   }


  ngOnInit(): void {

    /*----cargar nombre--*/
    if( localStorage.getItem('nombre') ){
      this.nombrePerfil = localStorage.getItem('nombre');
    }
    
    /*-------comprobar si ahy un token en local storage-----*/
    if( localStorage.getItem('Token') ){

      $(".contenedor_nombre_usuario").css('display', 'block');
    }else{
      $(".contenedor_nombre_usuario").css('display', 'none');
    }

    var num = 1;
    $('.flecha_desplegar').click(function() {
      
      if(num == 1){
        $(".seccion_desplegable_perfil").css('display', 'block');
        num = 0;
      }else{
        num = 1;
        $(".seccion_desplegable_perfil").css('display', 'none');
      }
 
    })

  }
  

  cerrarSesion(){
    
    $(".contenedor_nombre_usuario").css('display', 'none');

    this.conectarServicio.cerrarSesion();
    this.usarRuta.navigate(['/login']);
  
  }

}
