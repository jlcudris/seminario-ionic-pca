import { Injectable, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import {HttpClient,HttpHeaders} from '@angular/common/http'

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
  urlServer ="https://librarypca.fly.dev/";
  httpHeaders ={headers:new HttpHeaders({"Content-Type": "application/json"})};

  constructor(private storage:Storage,private http:HttpClient) { }

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

  registerUserDb(userData:any){
    let params = {
      "user": userData
    }
    return new Promise( (accept, reject) => {
      this.http.post(`${this.urlServer}signup`,params, this.httpHeaders).subscribe((data: any) => {
        if (data.status == "OK"){
          accept(data.msg);
        }else{
          reject(data.errors)
        }
      },(error) => {
        reject("Error al intentar registrarse")
      })
    })
  }

  loguinUserDb(credentials:any){
    return new Promise( (accept, reject) => {
      let params = {
        "user": credentials
      }
      this.http.post(`${this.urlServer}login`, params, this.httpHeaders).subscribe( (data: any) => {
        if (data.status == "OK") {
          accept(data);
        }else{
          reject(data.errors)
        }
      }, (error) => {
        reject("Error en Login")
      })
    })
  }

}
