import { Injectable } from '@angular/core';

/*-----usar HttpClient----*/
import { HttpClient } from "@angular/common/http"

/*---usar map---*/
import { map } from "rxjs/operators"



@Injectable({
  providedIn: 'root'
})
export class ServicioService {
  
  guardarToken:any;

  
  constructor(private http: HttpClient) { 

    this.leerToken();
  
  }

  
  registrarUsuario(formulario:any){
    
    //console.log(formulario)

    //https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

    const Datos = {
      
      nombre     :  formulario.controls['nombre'].value,
      correo     :   formulario.controls['correo'].value,
      pass       :  formulario.controls['contrasena'].value,
  

    }
    
    //console.log(Datos)

    return this.http.post(`https://backed-app-doctor.onrender.com/registroUsuarios`, Datos);
      
    /*
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD_3iSzX2x9xs0BkXCmcg_Gp8NO65wCFZg`, Datos ) 
    */
                                
  }


  /*----loguear contenido---*/
  loginUsuario( login:any ){
    
    //https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

    const datosLogin = {

      correo    : login.controls['usuario'].value,
      pass      : login.controls['pass'].value,
      
    }
    


    return this.http.post(`https://backed-app-doctor.onrender.com/loginUsuarios`, datosLogin)
            .pipe(
              map( (resp:any) => {
                  
                  this.GUARDARToken( resp.token )
                  
                  //guardar nombre usuario
                  console.log(resp.respDB.nombre)
                  localStorage.setItem('nombre', resp.respDB.nombre)
                  
                  
                  return resp;

              })
            )

    /*
    return this.http.post("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD_3iSzX2x9xs0BkXCmcg_Gp8NO65wCFZg" , datosLogin)
                    .pipe(
                      map( (resp:any) => {
                        this.GUARDARToken(resp['idToken'])
                        return resp
                       })
                    )  
    */
   
                    
  }




  /*-----guardar token----*/
  GUARDARToken(token:string){
    
    this.guardarToken = token;
    localStorage.setItem('Token', token);
  }



  /*----leer token----*/
  leerToken(){
      
    if( localStorage.getItem("Token") ){
        
      this.guardarToken = localStorage.getItem("Token");
    
    }else{
      
      this.guardarToken = "";
    }
  
  }


  /*-----comprobar si realmente inicio session------*/
  estaAutenticado():boolean{

    return this.guardarToken.length > 0;

  }


  /*----destruir token-----*/
  cerrarSesion(){
  
    localStorage.removeItem('Token');
    localStorage.removeItem('nombre')

  }



}
