import { Component, OnInit } from '@angular/core';
import { LibraryService } from '../services/library.service';

@Component({
  selector: 'app-top-diez',
  templateUrl: './top-diez.page.html',
  styleUrls: ['./top-diez.page.scss'],
})
export class TopDiezPage implements OnInit {
  topDiez:any
  constructor(private libraryService:LibraryService) { }

  ngOnInit() {
    this.obtenerTop10()
  }

  obtenerTop10(){
    this.libraryService.top10Books().then(res => {
      console.log(res)
      this.topDiez = res
    })
  }

}
