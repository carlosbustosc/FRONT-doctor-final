import { Injectable } from '@angular/core';

/*---usar peticiones Http----*/
import { HttpClient } from "@angular/common/http"

/*----usar map----*/
import { map } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class DoctorService  {

  constructor(private http:HttpClient) { 
     
  }
  
  ngOnInit(): void {

  }


  getCiudades(){

    return this.http.get('https://www.datos.gov.co/resource/xdk5-pm3f.json')
                    
  }

  
/*-------------------------------------------------------------------------------*/
  obtenerPacientes(){
    
    return this.http.get(`https://backed-app-doctor.onrender.com/listarPacientes`)
  
    /*
    return this.http.get('https://citas-abce2.firebaseio.com/paciente.json')
                    .pipe(
                      map(resp => {

                        return this.crearArreglo(resp)
                      
                      })
                    )  
                  */ 
                
  }

  crearArreglo( objetoDeBaseDatos:any ){

    const ArregloDondeSeAlojara:any[] = []

    /*----rederizar objeto y obtener llaves--*/
    Object.keys( objetoDeBaseDatos ).forEach( idBaseD => {
        
        const guardarNuevoArr = objetoDeBaseDatos[idBaseD];// se guarda objeto renderizado
        guardarNuevoArr.id = idBaseD //meter id al arreglo

        ArregloDondeSeAlojara.push(guardarNuevoArr)
    })

    return ArregloDondeSeAlojara;

  }
 
  /*----------------------------------------------------------------------------------*/


  /*--resgitar pacientes---*/
  registrarPaciente( datos:any ){
      
    const datosPaciente = {
      
      id: "",
      nombre:           datos.controls['nombre'].value,
      cedula:           datos.controls['documento'].value,    
      edad:             datos.controls['edad'].value,    
      tipoSangre:       datos.controls['sangre'].value,    
      patologia:        datos.controls['patologia'].value,    
      ciudad:           datos.controls['ciudad'].value,    
      direccion:        datos.controls['direccion'].value,   
      telefono:         datos.controls['telefono'].value,    
      correo:           datos.controls['correo'].value ,   
      nombreFamiliar:   datos.controls['nombreFamiliar'].value,  
      telefonoFamiliar: datos.controls['telefonoFamiliar'].value,
      descripcion:      datos.controls['descripcion'].value,
      
    
    }

    return this.http.post(`https://backed-app-doctor.onrender.com/registroPacientes`, datosPaciente)
  
    /*
    return this.http.post('https://citas-abce2.firebaseio.com/paciente.json', datosPaciente)
    */
                  
  }




  /*------------------------actualizar pacientes-----------------*/
  actualizarPaciente( IDpaciente:any, datos2:any ){

    const datosPaciente2 = {
      
      id: IDpaciente,
      nombre:           datos2.controls['nombre'].value,
      cedula:           datos2.controls['cedula'].value,    
      edad:             datos2.controls['edad'].value,    
      tipoSangre:       datos2.controls['tipoSangre'].value,    
      patologia:        datos2.controls['patologia'].value,    
      ciudad:           datos2.controls['ciudad'].value,    
      direccion:        datos2.controls['direccion'].value,   
      telefono:         datos2.controls['telefono'].value,    
      correo:           datos2.controls['correo'].value ,   
      nombreFamiliar:   datos2.controls['nombreFamiliar'].value,  
      telefonoFamiliar: datos2.controls['telefonoFamiliar'].value,
      descripcion:      datos2.controls['descripcion'].value
      
    
    }
    

    return this.http.put(`https://backed-app-doctor.onrender.com/actulizarPaciente/${ IDpaciente }`, datosPaciente2 )
    /*
    return this.http.put(`https://citas-abce2.firebaseio.com/paciente/${ IDpaciente }.json`, datosPaciente2)
    */
    

  }

  /*------------------------actualizar pacientes-----------------*/


  
  /*----------------borrar paciente---------------*/
  borrarPacienteServicio( IDborrar:string ){
    
    
    console.log(IDborrar)
    return this.http.delete(`https://backed-app-doctor.onrender.com/borrarPaciente/${ IDborrar }`)

    /*
    return this.http.delete( `https://citas-abce2.firebaseio.com/paciente/${ IDborrar }.json` )
    */

  }




  

  verInfo( pacienteLLave:any){
    
    
    return this.http.get(`https://backed-app-doctor.onrender.com/unPaciente/${ pacienteLLave  }`)

    /*
    return this.http.get(`https://citas-abce2.firebaseio.com/paciente/${ pacienteLLave }.json`)
    */
  }




  /*-----------------------------------------buscar----------------------------------*/

  filtroBuscar( cedulaBusqueda:number ){
      

    return this.http.get(`https://backed-app-doctor.onrender.com/buscarNombre/${ cedulaBusqueda }`)



    /*
    return this.http.get(`https://citas-abce2.firebaseio.com/paciente.json`)
                    .pipe(
                      map( resp=>{
                        
                         //--creamos un arreglo nuevo--
                         const GuardarArr:any = []; 
                          
                         
                          Object.values( resp ).forEach( datos => {//--hacemos un bucle de los datos base de datos--
                            //console.log( datos.id)
                            let todosLosDatos = datos;//---traemos todos los datos---

                            let TodosNombres = datos.nombre;//---traemos todos los nombre---
                            let nombresMinuscula = TodosNombres.toLowerCase();//--convertimos a minuscuylas--

                            if( nombresMinuscula.indexOf( nombreBusqueda ) >= 0 ){//---comprobamos si esta el nombre---
                                
                                //console.log(todosLosId)//---solo trae el id de ese---
                                GuardarArr.push( todosLosDatos )//---insertarmos solo el id de la cedula---
                            }

                          })
                          
                          return GuardarArr//---retornamos----
                     
                      })

                    )
            */
  
  }


  /*-------------------------------------buscar---------------------------------------------*/





  /*------------------------agendar cita------------------------*/
   AgendarPacienteRegistro( datosAgendamiento:any ){
    
    const datosAgendar = {
      
      nombre:     datosAgendamiento.controls['nombre'].value,
      correo:     datosAgendamiento.controls['correo'].value,
      documento:  datosAgendamiento.controls['documento'].value,
      sede:       datosAgendamiento.controls['sede'].value,
      doctor:     datosAgendamiento.controls['doctor'].value,
      horario:    datosAgendamiento.controls['horario'].value,
      hora:       datosAgendamiento.controls['hora'].value

    }
    
    return this.http.post(`https://backed-app-doctor.onrender.com/registrarCita/`,  datosAgendar)
    /*
    return this.http.post('https://acceso-66a43-default-rtdb.firebaseio.com/agendar.json', datosAgendar)
                    .pipe(
                      map( resp => {

                        
                        return datosAgendar
                      })
                    )
                    */

   }


   reAgendarPacienteRegistro( datosAgendamiento:any, id:any ){

    const datosAgendar = {
      
      nombre:     datosAgendamiento.controls['nombre'].value,
      correo:     datosAgendamiento.controls['correo'].value,
      documento:  datosAgendamiento.controls['documento'].value,
      sede:       datosAgendamiento.controls['sede'].value,
      doctor:     datosAgendamiento.controls['doctor'].value,
      horario:    datosAgendamiento.controls['horario'].value,
      hora:       datosAgendamiento.controls['hora'].value

    }

    return this.http.put(`https://backed-app-doctor.onrender.com/reagendar/${id}`,  datosAgendar)

   }


   /*--------------obtenerCita-------------------*/
   obtenerDatosCita(){
        

  return this.http.get('https://backed-app-doctor.onrender.com/listarCitas')


    /*
    return this.http.get( `https://acceso-66a43-default-rtdb.firebaseio.com/agendar.json` )
                    .pipe(
                      map( (resp:any) =>{

                        const nuevoArr:any[] = []

                        Object.keys( resp ).forEach( datos => {
                          
                          const objetos = resp[datos];
                          nuevoArr.push( objetos );

                        })

                        return nuevoArr;

                      })
                    )
          */

   }



   /*---borrar cita---*/
   borrarCita( IDusuario:any ){
    
    return this.http.delete(`https://backed-app-doctor.onrender.com/borrarCita/${ IDusuario }`)

   }

  



   /*------------filtrar una cita---------------*/
   filtrarCita( cedula :any ){
    
    return this.http.get(`https://backed-app-doctor.onrender.com/buscarUnaCita/${ cedula }`)
      
   }


   

}


