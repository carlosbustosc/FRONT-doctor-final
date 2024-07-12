import { Component, OnInit } from '@angular/core';

/*---controlar formulario FormGroup----*/
import { FormGroup, FormBuilder, Validators } from "@angular/forms"

/*-------conectar servicio--------*/
import { ServicioService } from 'src/app/servicio/servicio.service';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  formulario:FormGroup
  
  constructor( private fb : FormBuilder, private conectarServicio: ServicioService ) { 
    
    this.formulario = this.fb.group({
  
      nombre:       ["", Validators.required],/*---validar si hay algo en el campo--*/
     
      correo:       ["", Validators.required],
      contrasena:   ["", Validators.required],
      contrasena2 : ["", Validators.required]

    })

  }

  ngOnInit(): void {
  
  }
  

  /*------validar si el campo es valido o no------*/
  get nombreNoValido(){

    return this.formulario.controls['nombre'].invalid && this.formulario.controls['nombre'].touched;
  }


  get correoNoValido(){

    return this.formulario.controls['correo'].invalid  && this.formulario.controls['correo'].touched
  }

  get contrasenaNoValido(){

    return this.formulario.controls['contrasena'].invalid && this.formulario.controls['contrasena'].touched;
  }

  get contrasena2NoValida(){

      var valor1 = this.formulario.controls['contrasena'].value;
      var valor2 = this.formulario.controls['contrasena2'].value;
      
      if(valor1 == valor2){

        return false;

      }else{

        return true;
      }
  }



  registrar(){
  

    if( this.formulario.invalid){
    
      Object.values( this.formulario.controls ).forEach( valor => {
        
        valor.markAsTouched();

      })
    }else{ 
      
    /*
    console.log("nombre: "      + this.formulario.controls['nombre'].value);
    console.log("contraseña: "  + this.formulario.controls['contrasena'].value);
    console.log("contraseña2: " + this.formulario.controls['contrasena2'].value);
    */
    

      this.conectarServicio.registrarUsuario( this.formulario )
      
          .subscribe( (resp:any) => {
            
            console.log(resp);

            if(resp.status == "error"){
              
              Swal.fire(
                '¡Que mal!',
                '!El usuario ya existe!, cambia de correo',
                'error'
              )


            }else{
                
              
            Swal.fire(
              '¡Muy bien!',
              '¡Se ha registrado correctamente!',
              'success'
            )

            }


          } )
          
      

      this.formulario.reset();
    }

  }
}
