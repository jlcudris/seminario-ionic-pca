import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup,Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthenticateService } from '../services/authenticate.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm:FormGroup;
  type_document = [ 
    {
    name:"C.C",
    value:"cedula",
 
  },
  {
    name:"T.I",
    value:"Tarjeta Identidad",
  },
  {
    name:"NIC",
    value:"Nic",
  }
];

 carreras = [ 
  {
  name:"Ing de Sistemas"
  
},
{
  name:"Ing de Industrial"
 
},
{
  name:"Ing de Civil"
  
},
{
  name:"Arquitecto"
  
}
]

validation_register ={
  name:[
    {type:"required",message:"Nombre requerido"},
    {type:"minLength",message:"como minimo 3 caracteres"}
  ],
  lastName:[
    {type:"required",message:"Apellido requerido"},
    {type:"minLength",message:"El apellido debe ser de al menos 4 caractereres"}
  ],
  
  documentType:[
    {type:"required",message:"Tipo Doc requerido"}
    
  ],
  
  documentNumber:[
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
  constructor(private navCtrol:NavController, private formBuilder: FormBuilder,private authenticate:AuthenticateService) {
    
    this.registerForm =this.formBuilder.group({
      name:new FormControl(
        "",
          Validators.compose([
          Validators.required,
          Validators.minLength(4)
        ])
      ),
      lastName:new FormControl(
        "",
          Validators.compose([
          Validators.required,
          Validators.minLength(4)
        ])
      ),
      documentType:new FormControl(
        "",
          Validators.compose([
          Validators.required
        ])
      ),
      documentNumber:new FormControl(
        "",
        Validators.compose([
        Validators.required,
        Validators.pattern("^[0-9]+[0-9]+[0-9]+$"),
        Validators.minLength(7),
        Validators.maxLength(7),
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

}
