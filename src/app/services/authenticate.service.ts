import { Injectable, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';

interface storage {
  career:string
  documentNumber:string
  documentType:string
  email:string
  lastName:string
  name:string
  password:string
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  constructor(private storage:Storage) { }

  async loginUser(credentials:any){
    let datosLogin = await this.storage.get('user').then((res:storage) => {
      return res
    })
   
    console.log(datosLogin)
    return new Promise((accept, reject)=>{
      if(datosLogin){
        if(credentials.email == datosLogin.email && credentials.password == atob(datosLogin.password)){
          accept("Login exitoso");
        }else{
          reject("Lofin Fallido");
        }
      }else{
        reject("Lofin Fallido no existe user en local storage");
      }
    })

  }



  registerUser(userData:any){
    userData.password =btoa(userData.password);
    return this.storage.set("user",userData);
  }

}
