import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  slideOpt ={
    initialSlide:0,
    slidesPerview:1,
    centerSlides:true,
    speed:400
  }

  slides_nuevos=[
    {
      title:"The game of thrones",
      img:"assets/gamet.jpg",
      descripcion:"  El libro mejor vendido de la serie A Song of Ice and Fire escrito por George R.R, es llevado a la pantalla chica cuando HBO decide recrear esta historia épica de fantasía"
    },
    {
      title:"Harry Potter",
      img:"assets/harry.jpg",
      descripcion:" El día de su cumpleaños, Harry Potter descubre que es hijo de dos conocidos hechiceros, de los que ha heredado poderes mágicos."
    }
  ]

  constructor() {}

}
