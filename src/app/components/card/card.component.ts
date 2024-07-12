
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  
  /*---
  ----de padre a hijo----
  @Input() pacientesResultadoBusqueda:any[] = []
  @Input() pacientesRespuestabusqueda:any = {}



  -----de hijo a padre----
  @Output() AgendarCitaM     = new EventEmitter;
  @Output() verInformacionM  = new EventEmitter;
  @Output() editarM          = new EventEmitter;
  @Output() borrarPacienteM  = new EventEmitter;


  AgendarCita( pacienteId:any ){
    this.AgendarCitaM.emit( pacienteId )
  }

  verInformacion( pacienteID2:any ){
    
    this.verInformacionM.emit( pacienteID2 );
  }

  editar( pacienteID2:any ){
    
    this.editarM.emit( pacienteID2 )
  }

  borrarPaciente( valor1:any, valor2:any ){
      
    this.borrarPacienteM.emit(valor1, valor2)
  }

---*/


  constructor() { }

  ngOnInit(): void {
  }

}


