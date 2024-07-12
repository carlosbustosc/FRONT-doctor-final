import { Component, OnInit } from '@angular/core';

/*---volver---*/
import { Location } from "@angular/common"


/*---recibir informacion----*/
import { ActivatedRoute } from "@angular/router"


/*-----conectar servicio-------*/
import { DoctorService } from 'src/app/services/doctor.service';


@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.component.html',
  styleUrls: ['./informacion.component.css']
})
export class InformacionComponent implements OnInit {
  
  informacionDetallePaciente:any = {}
  

  IDpaciente:any;

  constructor(private volver:Location, 
              private recibirParametro:ActivatedRoute,
              private conectarServicio: DoctorService ) { }

  ngOnInit(): void {

    this.recibirParametro.params.subscribe( informacion => {
        console.log(informacion);

        this.informacionDetallePaciente = informacion;

        console.log( informacion['id'] );
        this.IDpaciente = informacion['id']; 
    })

  
  }

  volverPacientes(){
    
    this.volver.back();

  }

}
