import { Component, OnInit } from '@angular/core';

/*---FormGroup--*/
import { FormGroup, FormBuilder, Validators } from "@angular/forms"

/*----conectar servicio-----*/
import { ServicioService } from 'src/app/servicio/servicio.service'; 


/*----usar ruta-----*/
import { Router } from "@angular/router"


/*----sweet alert----*/
import Swal from 'sweetalert2'

//import * as $ from 'jquery';
declare var $:any;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  login:FormGroup

  EmailNoExiste:boolean = false;
  claveNoValida:boolean = false;

  constructor( private fb: FormBuilder, private conectarServicio: ServicioService, private usarRuta: Router ) { 
    
    this.login = this.fb.group({
      
      usuario: ["", Validators.required],
      pass :   ["", Validators.required],
      check: false 
      

    })

  }




  ngOnInit(): void {
    
    /*---si extiste el correo en local Storage cargarlo---*/
    if( localStorage.getItem('correo') ){
        
      this.login = this.fb.group({
        usuario: localStorage.getItem('correo'),
        pass: "",
        check: true
      })
    }
    
  }





  get usuarioNoValido(){
    
    return this.login.controls['usuario'].invalid && this.login.controls['usuario'].touched;
  }

  get passNoValido(){
    
    return this.login.controls['pass'].invalid && this.login.controls['pass'].touched;
  }


  

  ingresar(){

    if( this.login.invalid ){
      
      Object.values( this.login.controls ).forEach( campos => {

       campos.markAsTouched();   

      })

    }else{

        this.conectarServicio.loginUsuario( this.login )
            .subscribe( (resp:any) => {
             
              console.log(resp)
              

            
              this.claveNoValida  = false;//mensaje *ngIf
              this.login.reset();//resetiar formulario

              this.usarRuta.navigate(['inicio'])//navigar a pantalla de ingreso

              //----mostrar inicio cerrar sesion---
              $(".contenedor_nombre_usuario").css('display', 'block');


              //----guardar en local storage solo si esta check----
              if(this.login.value.check == true){
                localStorage.setItem("correo", resp.email)
              }
              
              
    

            }, (err) => {
                
              console.log(err.error.mensaje)

              Swal.fire(
                '¡Que mal!',
                 err.error.mensaje,
                'error'
              )


            })

    }
  }
}
