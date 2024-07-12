import { Component, OnInit } from '@angular/core';

/*-----conectar servicio-----*/
import { DoctorService } from 'src/app/services/doctor.service';


/*---importar sweeta alert---*/
import Swal from 'sweetalert2'

 

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.css']
})
export class CitasComponent implements OnInit {
  
  citasPacientes:any[] = [];
  nombre:any

  guardarUnaCita:any = {}

  Citas = true;
  cita = false;

  constructor(private conectarServicio:DoctorService  ) { }

  ngOnInit(): void {
    
    this.conectarServicio.obtenerDatosCita()
        .subscribe( (resp:any) => {
         
          console.log(resp.respDB);
          this.citasPacientes = resp.respDB;
          this.nombre = resp.respDB.nombre
        
        }, (error) => {
          console.log(error)
        })

  }
  

  borrarCita( id:any ){
    

    Swal.fire({
      title: `¿Desea Borrar la cita?`,
      text:   `se borrara la cita`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText : 'No borrar',
      confirmButtonText: 'si, borrar!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.conectarServicio.borrarCita( id ) 
        .subscribe( (resp:any) => {
          
        

          if(resp){
            Swal.fire(
              "El registro " + " " + resp.mensaje, 
            )

          }
  
        }, (error) => {
          console.log(error)
        })
       
        

        
      }
    })

    
    
  }


  
  filtrarCita( valor:any ){
    
    this.conectarServicio.filtrarCita( valor ) 
        .subscribe( (resp:any) => {
            
          this.guardarUnaCita = resp.respDB
          console.log(this.guardarUnaCita)

          this.Citas = false;
          this.cita  = true;

        }, (error) => {

          console.log(error)
        })

  }


  refrescarCita( valor:any ){
    
     if(valor.length == 0){
        
          this.Citas = true;
          this.cita  = false;

     }
  }


}
