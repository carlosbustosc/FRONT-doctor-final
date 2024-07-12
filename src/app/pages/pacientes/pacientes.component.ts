import { Component, OnInit } from '@angular/core';

/*---usar Ruta---*/
import { Router } from "@angular/router"


/*----conectar servicio-----*/
import { DoctorService } from 'src/app/services/doctor.service';


/*---sweet alert---*/
import Swal from 'sweetalert2'


@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.css']
})
export class PacientesComponent implements OnInit {
  
  noRegistros = false;

  obtenerPacientes:any[] = []
  pacientesResultadoBusqueda:any = {};

  /*----ngIf----*/
  pacientesAutomaticos:boolean = true;
  pacientesRespuestabusqueda:boolean = false;


  constructor(private usarRuta:Router, private conectarServicio:DoctorService) { }

  ngOnInit(): void {
    

    /*------obteniendo pacientes------*/
    this.conectarServicio.obtenerPacientes()
    .subscribe( (resp:any) => {
       
      this.obtenerPacientes = resp.todosLosPacientes;
      console.log(resp.todosLosPacientes);
        
    }, (error) => {
      console.log(error)
    })

  }

  
  volverInicio(){

    this.usarRuta.navigate( ['/inicio'] )
  }

  /*---registrar---*/
  registrarPacientes(){
    this.usarRuta.navigate( ['/registropacientes'] )
  }


  /*---editar----*/
  editar( pacienteId:any ){
    
   console.log(pacienteId);
   this.usarRuta.navigate( ['/editar', pacienteId] )
  }


  /*-------borrar paciente----*/
  borrarPaciente( pacientes:any ){
    
    console.log(pacientes._id);
    
          Swal.fire({
            title: `¿Desea borrar el registro ${ pacientes.nombre }?`,
            text: "Elige SI para confirmar y No para volver",
            icon: 'warning',
            showCancelButton: true, 
            confirmButtonColor: '#64c6f0',
            cancelButtonColor: '#3176c5',
            confirmButtonText: 'Si, lo quiero borrar'
          }).then((result) => {
            if (result.isConfirmed) {
              

              /*---borrar posicion del formulario----*/
              //this.obtenerPacientes.splice( posicion, 1 );


              /*----borrar registro de base de datos---*/
              this.conectarServicio.borrarPacienteServicio( pacientes._id )
                .subscribe( (respDel:any) => {
                  console.log(respDel);

                  Swal.fire(
                    '¡Se ha borrado el registro!' + pacientes.nombre,
                    `Se borro el paciente ${ pacientes.nombre } correctamente`,
                    'success'
                  )
                
               }, (error) => {

                Swal.fire(
                  error.error.mensaje,
                  '¡No se pudo borrar!',
                  'error'
                )
            
               })
              

              
            }
          })


  
  }


/*----ver informacion----*/
  verInformacion( pacienteKey:any ){
    
    //console.log(pacienteKey)
    /*----ver informacion de cada uno---*/
    this.conectarServicio.verInfo( pacienteKey )
        .subscribe( (resp:any) => {
          
        

          this.usarRuta.navigate( ['/informacion', resp.respuestaDB] )
          
        }, (error) => {
          console.log(error);
       
        })
    
    
    
  }



  /*--------------buscar-----------------*/
  buscar( cedPaciente:any ){
    
   

    this.conectarServicio.filtroBuscar( cedPaciente )
        .subscribe((resp:any) => {
          console.log(resp)

          this.pacientesResultadoBusqueda = resp.respDB[0]
          console.log(this.pacientesResultadoBusqueda)

          this.pacientesAutomaticos = false;
          this.pacientesRespuestabusqueda = true;
          this.noRegistros = false;

                 
        }, (error) => {
          console.log(error.error.mensaje)

          this.pacientesRespuestabusqueda = false;
          this.pacientesAutomaticos = false;
          this.noRegistros = true;

        }) 
  }

  
  barra( valor:any ){
    
    //console.log(valor.length)

    if(valor.length < 1){
          this.pacientesRespuestabusqueda = false;
          this.pacientesAutomaticos = true;
          this.noRegistros = false;
    }
  }

/*--------------buscar-----------------*/



/*-------agendar cita----------*/

AgendarCita( pacienteId:any ){
  
  this.usarRuta.navigate( ['/agendar', pacienteId ] )

}




misCitas( id:any ){
  
  this.usarRuta.navigate( ['/agendar', id ] )


}
  
}
