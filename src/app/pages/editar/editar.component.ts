import { Component, OnInit } from '@angular/core';

/*----usar ruta , recibir parametro----*/
import { Router, ActivatedRoute } from "@angular/router"

/*---agrupar formulario---*/
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


/*-----conectarServicio------*/
import { DoctorService } from 'src/app/services/doctor.service';

/*--sweet alert---*/
import Swal from 'sweetalert2'


@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {

 

  datosPaciente2:FormGroup;
  recibirIDparaMandar:string = ""
  selectCiudades:any[] = []



  constructor(private usarRuta:Router, private fb: FormBuilder, private conectarServicio:DoctorService, private recibirParametro:ActivatedRoute) { 

    this.datosPaciente2 = this.fb.group({
      
      nombre:           ["", Validators.required ],
      cedula:           ["", Validators.required ],
      edad:             ["", Validators.required ],
      tipoSangre:           ["", Validators.required ],
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
    
    /*-------cargar ciudades--------*/
    this.conectarServicio.getCiudades()
        .subscribe( (resp:any) => {
          console.log(resp)
            this.selectCiudades = resp;
        })
    /*-------cargar ciudades--------*/

    

    
      /*---recibir Id--------*/
      this.recibirParametro.params.subscribe( resp => {
        //console.log(resp['id']);
        this.recibirIDparaMandar = resp['id']

        
        /*------------traer informacion---------*/
        this.conectarServicio.verInfo( resp['id'] )
            .subscribe( (resp:any) => {
              console.log(resp)
              
              
              /*---cargar formulario----*/
              this.datosPaciente2.setValue({

                nombre:           resp.respuestaDB.nombre,     
                cedula:           resp.respuestaDB.cedula,     
                edad:             resp.respuestaDB.edad,     
                tipoSangre:       resp.respuestaDB.tipoSangre,     
                patologia:        resp.respuestaDB.patologia,     
                ciudad:           resp.respuestaDB.ciudad,   
                direccion:        resp.respuestaDB.direccion,    
                telefono:         resp.respuestaDB.telefono,   
                correo:           resp.respuestaDB.correo,   
                nombreFamiliar:   resp.respuestaDB.nombreFamiliar,
                telefonoFamiliar: resp.respuestaDB.telefonoFamiliar,
                descripcion:      resp.respuestaDB.descripcion
              
              })


            }, (error) => {
              console.log(error)
            })

      })

  }

  /*---validaciones---*/
  get NombreInvalido(){

    return this.datosPaciente2.controls['nombre'].invalid && this.datosPaciente2.controls['nombre'].touched;
  }

  get documentoNoValido(){

    return this.datosPaciente2.controls["cedula"].invalid && this.datosPaciente2.controls["cedula"].touched;
  }

  get edadNoValido(){

    return this.datosPaciente2.controls['edad'].invalid && this.datosPaciente2.controls['edad'].touched;
  }

  get sangreNoValida(){

    return this.datosPaciente2.controls['tipoSangre'].invalid && this.datosPaciente2.controls['tipoSangre'].touched;
  }

  get patologiaNoValida(){

    return this.datosPaciente2.controls['patologia'].invalid && this.datosPaciente2.controls['patologia'].touched;
   }

   get ciudadNoValida(){

    return this.datosPaciente2.controls['ciudad'].invalid && this.datosPaciente2.controls['ciudad'].touched;
  }

   get direccionNoValida(){

    return this.datosPaciente2.controls['direccion'].invalid && this.datosPaciente2.controls['direccion'].touched;
   }

   get telefonoNoValido(){

    return this.datosPaciente2.controls['telefono'].invalid && this.datosPaciente2.controls['telefono'].touched;
   }
   
   get correoNoValido(){

    return this.datosPaciente2.controls['correo'].invalid && this.datosPaciente2.controls['correo'].touched;
   }



  /*----Actulizar----*/
  ActualizarPacientes(){
    
    /*---datos pa enviar---*/
    console.log(this.datosPaciente2.value);

    /*--enviar id al servicio---*/
    this.conectarServicio.actualizarPaciente( this.recibirIDparaMandar, this.datosPaciente2 )
                          .subscribe( (resp:any) => {
                            console.log(resp);
                            /*----confirmacion alert--*/
                              Swal.fire({
                                position: 'center',
                                icon: 'success',
                                title: resp.mensaje,
                                showConfirmButton: false,
                                timer: 1500
                              })

                
                            /*----volver a pacientes---*/
                            setTimeout( () => {
                              this.usarRuta.navigate([ 'pacientes' ])
                            }, 4000)
                            

                          }, (error => {

                            Swal.fire({
                              position: 'center',
                              icon: 'error',
                              title: error.error.mensaje + " y fallo la actualizacion",
                              showConfirmButton: false,
                              timer: 1500
                            })

                            console.log(error.error.mensaje);
                         
                          }))

  
  }


  /*----ruta---*/
  volverPacientes(){
  
    this.usarRuta.navigate( ['/pacientes'] )

  }

}
