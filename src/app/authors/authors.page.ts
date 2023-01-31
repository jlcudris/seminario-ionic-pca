import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BooksModalPage } from '../books-modal/books-modal.page';
import { LibraryService } from '../services/library.service';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.page.html',
  styleUrls: ['./authors.page.scss'],
})
export class AuthorsPage implements OnInit {
  
  authors:any
  constructor(private modalController:ModalController ,private libraryService:LibraryService ) { }

  ngOnInit() {
    this.libraryService.getAuthors().then( res => {
      this.authors = res;
      //console.log(this.authors)
    })
  }

  async showBooksAuthor(author:any){
    this.libraryService.getBooksForAuthor(author.id).then(async res => {
       const modal = await this.modalController.create({
        component:BooksModalPage,
        componentProps:{
          books: res,
          author: author,
          mostrarInfoAutor: true
        }
       });
        return await modal.present();
    })
    }
}
