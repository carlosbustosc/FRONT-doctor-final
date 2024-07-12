import { Component, OnInit } from '@angular/core';

/*---agrupar formulario FormGroup---*/
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

/*-----conectar servicio--------*/
import { DoctorService } from '../../services/doctor.service';


/*-----recibir parametro----*/
import { ActivatedRoute } from '@angular/router'

/*-----Router-----*/
import { Router } from '@angular/router';


/*---importar sweeta alert---*/
import Swal from 'sweetalert2'


@Component({
  selector: 'app-agendar',
  templateUrl: './agendar.component.html',
  styleUrls: ['./agendar.component.css']
})
export class AgendarComponent implements OnInit {
  
  agendarPaciente:FormGroup
  

  /*----datos---*/
  nombrePaciente:any;
  fecha:any;
  hora:any;

  formularioNuevo:boolean = true;

  guardarDatos:any

  datosUnaCita:any

  reAgendar = false
  
  agendaVacia = false

  reagendarVIDUAL = false

  OcultarReagendar = true

  constructor(private usarRuta:Router, 
              private conectarServicio:DoctorService,  
              private fb:FormBuilder, 
              private recibirParametro:ActivatedRoute) { 
    
    /*--requeridos--*/
    this.agendarPaciente = this.fb.group({
      
      nombre:    [ "", Validators.required ],
      documento: [ "", Validators.required ],
      correo:    [ "", Validators.required ],
      sede:      [ "", Validators.required ],
      doctor:    [ "", Validators.required ],
      horario:   [ "", Validators.required ],
      hora:      [ "", Validators.required ]

    })
  }
  
  ngOnInit(): void {
    
   

    this.recibirParametro.params.subscribe( resp => {
      console.log( resp['id'] );

      /*------ver informacion del paciente---*/
      this.conectarServicio.verInfo( resp['id'] )
          .subscribe( (resp:any) => {
            console.log(resp);
              
            this.guardarDatos = resp

            /*---cargar formulario---*/
            this.agendarPaciente.patchValue({
              nombre:    resp.respuestaDB.nombre,
              documento: resp.respuestaDB.cedula,
              correo:    resp.respuestaDB.correo
            })

          })
    
        
    
    })

}

  /*----validaciones----*/
  get nombreNoValido(){
    
    return this.agendarPaciente.controls['nombre'].invalid  &&  this.agendarPaciente.controls['nombre'].touched;
  }

  get documentoNoValido(){
  
    return this.agendarPaciente.controls['documento'].invalid  && this.agendarPaciente.controls['documento'].touched;
  }

  get sedeNoValido(){
    return this.agendarPaciente.controls['sede'].invalid  && this.agendarPaciente.controls['sede'].touched;
  }

  get doctorNoValido(){
      return this.agendarPaciente.controls['doctor'].invalid && this.agendarPaciente.controls['sede'].touched;
  }

  get horarioNoValido(){

    return this.agendarPaciente.controls['horario'].invalid  && this.agendarPaciente.controls['horario'].touched;
  }

  get horaNoValida(){
    
    return this.agendarPaciente.controls['hora'].invalid  && this.agendarPaciente.controls['hora'].touched;
  }

  
  agendar(){
      
    if( this.agendarPaciente.valid ){
      
      /*---------alert-------*/
      Swal.fire({
        title: `¿Desea agendar la cita para ${ this.agendarPaciente.controls['nombre'].value }?`,
        text:   `La cita se realizara en la sede ${ this.agendarPaciente.controls['sede'].value } el dia ${ this.agendarPaciente.controls['horario'].value } a las ${ this.agendarPaciente.controls['hora'].value } con el doctor(a) ${ this.agendarPaciente.controls['doctor'].value }`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText : 'No agendar',
        confirmButtonText: 'si, agendar!'
      }).then((result) => {
        if (result.isConfirmed) {


           //conectar servicio---*/
          this.conectarServicio.AgendarPacienteRegistro( this.agendarPaciente )
          .subscribe( resp => {
            //console.log(resp);

            if(resp){
              Swal.fire(
                'Se agendó correctamente',
                `La cita se realizara en la sede ${ this.agendarPaciente.controls['sede'].value } el dia ${ this.agendarPaciente.controls['horario'].value } a las ${ this.agendarPaciente.controls['hora'].value } con el doctor(a) ${ this.agendarPaciente.controls['doctor'].value }`,
                'success',
                
              )

              //this.usarRuta.navigate( ['/pacientes'] );
              
              this.formularioNuevo = false;
              this.reAgendar = true;

            }
    
          }, (error) => {
                
            Swal.fire(
              'No se puede agendar su cita',
              error.error.mensaje + " elimine o re-agende la que tiene",
              'error',
            )

            //this.usarRuta.navigate( ['/pacientes'] );
            
            this.formularioNuevo = false;
            this.reAgendar = true;
            this.traerCita()


          })
          

          
        }
      })


    }else{
      
      console.log(this.agendarPaciente);
      
      Object.values( this.agendarPaciente.controls ).forEach( campos =>{
        
        campos.markAsTouched();
      
      } )
    }

    
  }
  




  REagendar(){


    if( this.agendarPaciente.valid ){
      
      /*---------alert-------*/
      Swal.fire({
        title: `¿Desea agendar la cita para ${ this.agendarPaciente.controls['nombre'].value }?`,
        text:   `La cita se realizara en la sede ${ this.agendarPaciente.controls['sede'].value } el dia ${ this.agendarPaciente.controls['horario'].value } a las ${ this.agendarPaciente.controls['hora'].value } con el doctor(a) ${ this.agendarPaciente.controls['doctor'].value }`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText : 'No agendar',
        confirmButtonText: 'si, agendar!'
      }).then((result) => {
        if (result.isConfirmed) {


           //conectar servicio---*/
          this.conectarServicio.reAgendarPacienteRegistro( this.agendarPaciente, this.datosUnaCita._id )
          .subscribe( resp => {
            //console.log(resp);

            if(resp){
              Swal.fire(
                'Se re-agendó correctamente',
                `La cita se realizara en la sede ${ this.agendarPaciente.controls['sede'].value } el dia ${ this.agendarPaciente.controls['horario'].value } a las ${ this.agendarPaciente.controls['hora'].value } con el doctor(a) ${ this.agendarPaciente.controls['doctor'].value }`,
                'success',
                
              )

              //this.usarRuta.navigate( ['/pacientes'] );
              this.formularioNuevo = false;
              this.reAgendar = true;

            }
    
          }, (error) => {
                
            Swal.fire(
              'No se puede re-agendar su cita',
              error.error.mensaje,
              'error',
            )

          })
          

          
        }
      })


    }else{
      
      console.log(this.agendarPaciente);
      
      Object.values( this.agendarPaciente.controls ).forEach( campos =>{
        
        campos.markAsTouched();
      
      } )
    }


  }



  traerCita(){
  

    this.formularioNuevo = false;
    this.reAgendar = true;

    
    this.conectarServicio.filtrarCita( this.guardarDatos.respuestaDB.cedula )
        .subscribe( (resp:any) => {
          console.log( resp.respDB )

          this.datosUnaCita = resp.respDB
        
        })
  }


  volverForm(){
    this.formularioNuevo = true;
    this.reAgendar = false;
    this.agendaVacia = false;
  }





  eliminarCita(){  

    console.log( this.datosUnaCita._id )


    Swal.fire({
      title: `¿Desea borrar el registro?`,
      text: "Elige SI para confirmar y No para volver",
      icon: 'warning',
      showCancelButton: true, 
      confirmButtonColor: '#64c6f0',
      cancelButtonColor: '#3176c5',
      confirmButtonText: 'Si, lo quiero borrar'
    }).then((result) => {
      if (result.isConfirmed) {
        

    this.conectarServicio.borrarCita(this.datosUnaCita._id )
    .subscribe( resp => {
      console.log(resp)
    
            Swal.fire(
              '¡Se ha borrado el registro!',
              `la cita se borro correctamente`,
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



  reagendar(){
    
    this.formularioNuevo = true;
    this.reAgendar = false;
    this.agendaVacia = false;

    this.reagendarVIDUAL = true
    this.OcultarReagendar = false

  }

}
