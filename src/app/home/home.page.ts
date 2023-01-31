import { Component } from '@angular/core';
import { MenuController, ModalController, NavController } from '@ionic/angular';
import { LibraryService } from '../services/library.service';
import { BooksModalPage } from '../books-modal/books-modal.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  slideOpt ={
    initialSlide:0,
    slidesPerView:1,
    centerSlides:true,
    speed:400
  }

authors:any;
booksOff:any;

slideOps={
  initialSlide:1,
  slidesPerView:4,
  centerSlides:true,
  speed:400
}
 

  constructor(
     private libraryService:LibraryService,
     private modalController:ModalController,
     private navCtrl:NavController,
     private menu:MenuController
     ) {}

  ionViewDidEnter(){
    this.libraryService.getAuthors().then( res => {
      this.authors = res;
      //console.log(this.authors)
    })

    this.booksOff = this.libraryService.getBooksOffline();
    console.log(this.booksOff.books);
  }

 async showBooksAuthor(author:any){
  this.libraryService.getBooksForAuthor(author.id).then(async res => {
     const modal = await this.modalController.create({
      component:BooksModalPage,
      componentProps:{
        books: res,
        author: author,
        mostrarInfoAutor: false
      }
     });
      return await modal.present();
  })
  }

  goToAuthors(){
    this.navCtrl.navigateForward("/menu/authors")
    this.menu.close();
  }

  goToBooks(){
    this.navCtrl.navigateForward("/menu/books")
    this.menu.close();
  }
  goToMyFavorite(){
    this.navCtrl.navigateForward("/menu/favorite-books")
    this.menu.close();
  }

  goTotopDiez(){
    this.navCtrl.navigateForward("/menu/top-diez")
    this.menu.close();
  }
}
