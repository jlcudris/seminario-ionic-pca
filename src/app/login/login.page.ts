import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,FormControl,Validators } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { AuthenticateService } from '../services/authenticate.service';
import { Storage } from '@ionic/storage-angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm:FormGroup;
  validation_message ={
    email:[
      {type:"required",message:"Email obligatorio"},
      {type:"pattern",message:"Tu email no es valido"}
    ],
    password:[
      {type:"required",message:"Password obligatorio"},
      {type:"minSize",message:"La contraseña debe ser de al menos 5 caractereres"}
    ]
  }
  
  errorMessage:any;
  
  constructor(private formBuilder:FormBuilder,
    private authenticate:AuthenticateService,
    private navCtrol: NavController,
    private storage:Storage,
    private alerController:AlertController
    ) {
    this.loginForm =this.formBuilder.group({
      email :new FormControl(
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern("^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")

        ])
      ),

      password :new FormControl(
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(5)
  
        ])
      )


    });
   }

  ngOnInit() {

  }

  loginUser(credentials:any){
   
    console.log(credentials);
    this.authenticate.loginUser(credentials).then(res =>{
      this.errorMessage="";
      this.storage.set("isUserLoggedIn",true);
      this.navCtrol.navigateForward("/menu/home")

    }).catch(err=>{
      this.errorMessage =err
    })
  }

  redirectRegister(){
    this.navCtrol.navigateForward("/register")
  }

  loginUserDb(credentials:any){
   
    console.log(credentials);
    this.authenticate.loguinUserDb(credentials).then((res:any) =>{
      this.errorMessage="";
      this.storage.set("isUserLoggedIn",true);
      this.storage.set("user_id",(res.user.id));
      this.navCtrol.navigateForward("/menu/home")

    }).catch(err=>{
      this.presentAlert("Opps","Hubo un error",err)
    })
  }

  async presentAlert(header:any,subHeader:any,message:any){
    const alert = await this.alerController.create({
      header:header,
      subHeader:subHeader,
      message:message,
      buttons:['OK']
    });
    await alert.present();

  }

}
