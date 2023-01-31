import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup,Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthenticateService } from '../services/authenticate.service';
import {AlertController} from '@ionic/angular'

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm:FormGroup;
  type_document = [ 
    {
    name:"Cedula",
    value:"cc",
 
  },
  {
    name:"Tarjeta identidad",
    value:"ti",
  },
  {
    name:"Cedula extrangeria",
    value:"ce",
  },
  
  {
    name:"registro civil",
    value:"rc",
  }
];

 carreras = [ 
  {
  name:"Ing de Sistemas",
  value:"sistemas",
  
},
{
  name:"Ing de Industrial",
  value:"industrial",
 
},
{
  name:"Contaduria",
  value:"contaduria",
  
},
{
  name:"Administracion",
  value:"administracion",
  
}
]

validation_register ={
  name:[
    {type:"required",message:"Nombre requerido"},
    {type:"minLength",message:"como minimo 3 caracteres"}
  ],
  last_name:[
    {type:"required",message:"Apellido requerido"},
    {type:"minLength",message:"El apellido debe ser de al menos 4 caractereres"}
  ],
  
  document_type:[
    {type:"required",message:"Tipo Doc requerido"}
    
  ],
  
  document_number:[
    {type:"required",message:"el numero de documento es requerido"},
    {type:"pattern",message:"num Doc incorrecto"},
    {type:"minLength",message:" El num Doc debe tener por lo menos 7 numeros"},
    {type:"maxLength",message:" El num Doc debe tener maximo  10 numeros"},
  ],
  
  career:[
    {type:"required",message:"Debe elegir una carrera"}
   
  ],
  email:[
    {type:"required",message:"Email obligatorio"},
    {type:"pattern",message:"Tu email no es valido"}
  ],
  password:[
    {type:"required",message:"Password obligatorio"},
    {type:"minLength",message:"La contraseña debe ser de al menos 4 caractereres"}
  ]
}
//^[a-zA-Z0-9_.-]
  constructor(private navCtrol:NavController, private formBuilder: FormBuilder,private authenticate:AuthenticateService,
    private alerController:AlertController) {
    
    this.registerForm =this.formBuilder.group({
      name:new FormControl(
        "",
          Validators.compose([
          Validators.required,
          Validators.minLength(4)
        ])
      ),
      last_name:new FormControl(
        "",
          Validators.compose([
          Validators.required,
          Validators.minLength(4)
        ])
      ),
      document_type:new FormControl(
        "",
          Validators.compose([
          Validators.required
        ])
      ),
      document_number:new FormControl(
        "",
        Validators.compose([
        Validators.required,
        Validators.pattern("^[0-9]+[0-9]+[0-9]+$"),
        Validators.minLength(7),
        Validators.maxLength(10),
      ])
      ),
      
      career:new FormControl(
        "",
        Validators.compose([
        Validators.required
        ])
      ),
      email:new FormControl(
        "",
        Validators.compose([
        Validators.required,
        Validators.pattern("^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")

        ])
      ),
      password:new FormControl(
        "",
        Validators.compose([
        Validators.required,
        Validators.minLength(4)
  
        ])
      )
    })

   }

  ngOnInit() {
  }
  goToLogin(){
    this.navCtrol.navigateBack("/login");
  }

  registerUser(register_form: any){
    console.log(register_form);
    this.authenticate.registerUser(register_form).then(()=>{
      this.navCtrol.navigateForward("/login");
    })
  }

//metodo de la db
  registerUserDb(register_form: any){
    console.log(register_form);
    this.authenticate.registerUserDb(register_form).then(()=>{
      this.navCtrol.navigateForward("/login");
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
