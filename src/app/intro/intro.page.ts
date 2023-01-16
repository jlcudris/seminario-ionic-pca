import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {


  slideOpt ={
    initialSlide:0,
    slidesPerview:1,
    centerSlides:true,
    speed:400
  }

  slides_nuevos=[
    {
      title:"Gato 1",
      img:"https://www.zooplus.es/magazine/wp-content/uploads/2022/05/Cuanto-pesa-un-gato-2.jpeg",
      descripcion:"Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      class:null
    },
    {
      title:"Gato 2",
      img:"https://www.zooplus.es/magazine/wp-content/uploads/2022/05/Cuanto-pesa-un-gato-2.jpeg",
      descripcion:"Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      class:null
    },
    {
      title:"The game of thrones",
      img:"assets/gamet.jpg",
      descripcion:"  El libro mejor vendido de la serie A Song of Ice and Fire escrito por George R.R, es llevado a la pantalla chica cuando HBO decide recrear esta historia épica de fantasía",
      class:""
    },
    {
      title:"Harry Potter",
      img:"assets/harry.jpg",
      descripcion:" El día de su cumpleaños, Harry Potter descubre que es hijo de dos conocidos hechiceros, de los que ha heredado poderes mágicos.",
      class:null
    }
  ]
  constructor(private router: Router) { }

  finish(){
    
    this.router.navigateByUrl("/home");
  }

  ngOnInit() {
  }

}
