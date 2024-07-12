import { Component, OnInit } from '@angular/core';

/*----usar ruta , recibir parametro----*/
import { Router } from "@angular/router"

/*---agrupar formulario---*/
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


/*-----conectarServicio------*/
import { DoctorService } from 'src/app/services/doctor.service';

/*--sweet alert---*/
import Swal from 'sweetalert2'


@Component({
  selector: 'app-regpacientes',
  templateUrl: './regpacientes.component.html',
  styleUrls: ['./regpacientes.component.css']
})
export class RegpacientesComponent implements OnInit {


  datosPaciente:FormGroup;
  selectCiudades:any[] = []



  constructor(private usarRuta:Router, private fb: FormBuilder, private conectarServicio:DoctorService) { 

    this.datosPaciente = this.fb.group({
      
      nombre:           ["", Validators.required ],
      documento:        ["", Validators.required ],
      edad:             ["", Validators.required ],
      sangre:           ["", Validators.required ],
      patologia:        ["", Validators.required ],
      ciudad:           ["", Validators.required ],
      direccion:        ["", Validators.required ],
      telefono:         ["", Validators.required ],
      correo:           ["", Validators.required ],
      nombreFamiliar:   ["",  ],
      telefonoFamiliar: ["",  ],
      descripcion:      [""]


    })

  }
  
  ngOnInit(): void {
    
    /*--cargar ciudades---*/
    this.conectarServicio.getCiudades()
        .subscribe( (resp:any) => {
          console.log(resp)
            this.selectCiudades = resp;
        })



  }

  /*---validaciones---*/
  get NombreInvalido(){

    return this.datosPaciente.controls['nombre'].invalid && this.datosPaciente.controls['nombre'].touched;
  }

  get documentoNoValido(){

    return this.datosPaciente.controls["documento"].invalid && this.datosPaciente.controls["documento"].touched;
  }

  get edadNoValido(){

    return this.datosPaciente.controls['edad'].invalid && this.datosPaciente.controls['edad'].touched;
  }

  get sangreNoValida(){

    return this.datosPaciente.controls['sangre'].invalid && this.datosPaciente.controls['sangre'].touched;
  }

  get patologiaNoValida(){

    return this.datosPaciente.controls['patologia'].invalid && this.datosPaciente.controls['patologia'].touched;
   }

   get ciudadNoValida(){

    return this.datosPaciente.controls['ciudad'].invalid && this.datosPaciente.controls['ciudad'].touched;
  }

   get direccionNoValida(){

    return this.datosPaciente.controls['direccion'].invalid && this.datosPaciente.controls['direccion'].touched;
   }

   get telefonoNoValido(){

    return this.datosPaciente.controls['telefono'].invalid && this.datosPaciente.controls['telefono'].touched;
   }
   
   get correoNoValido(){

    return this.datosPaciente.controls['correo'].invalid && this.datosPaciente.controls['correo'].touched;
   }

  


  /*----formulario----*/
  registrarPaciente(){
      
    if( this.datosPaciente.invalid ){
        
      Object.values( this.datosPaciente.controls ).forEach( datos => {
        datos.markAsTouched();
      })  
    
    }else{
    
      /*---enviar registro---*/
        this.conectarServicio.registrarPaciente( this.datosPaciente )
            .subscribe( (resp:any) => {
              console.log(resp)

    
              /*----confirmacion alert--*/
               Swal.fire(
                '¡Muy bien!',
                resp.mensaje,
                'success'
              )

              this.datosPaciente.reset();
            

              /*---enrutar--*/
              this.usarRuta.navigate( ['/pacientes'] )

            }, (error) => {
                
              console.log(error.error.mensaje)

              Swal.fire(
                '¡Que mal!',
                error.error.mensaje,
                'error'
              )

            })
        
    
      /*----ver en consola-----*/
      /*
        Object.values( this.datosPaciente.controls).forEach( datos =>{
            
          console.log(datos.value);
      
        })  
        */ 
      
    }
   
  }




  /*----ruta---*/
  volverPacientes(){
  
    this.usarRuta.navigate( ['/pacientes'] )

  }

}
