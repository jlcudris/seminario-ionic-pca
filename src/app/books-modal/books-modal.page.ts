import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, NavParams, ToastController } from '@ionic/angular';
import { LibraryService } from '../services/library.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-books-modal',
  templateUrl: './books-modal.page.html',
  styleUrls: ['./books-modal.page.scss'],
})
export class BooksModalPage implements OnInit {

  author: any;
  listBook: any;
  mostrarInfoAutor: boolean = false;
  constructor(private toastController: ToastController, private storage: Storage, private api: LibraryService, private alertController: AlertController, private navParams: NavParams, private modalController: ModalController) { }
  htmlStr: string = 'Plain Text Example &amp; <strong>Bold Text Example</strong>';
  ngOnInit() {
  }

  ionViewDidEnter() {
    const start = []
    this.author = this.navParams.get("author");
    for (let i = 0; i < this.author.popularity;) {
      start.push(i)
      i++
    }
    this.author.cantStart = start
    this.listBook = this.navParams.get("books");
    this.mostrarInfoAutor = this.navParams.get("mostrarInfoAutor");
    // for(let item of this.listBook.genres){
    //   item = item + ' '
    // }
    console.log(this.author)
  }

  closeModal() {
    this.modalController.dismiss();
  }

  obtenerStart(numero: number) {
    return '<ion-icon name="star"></ion-icon>'
  }

  async favoriteBook(id: number) {
    // console.log(id)
    let idUser: any
    await this.storage.get('user_id').then(res => {
      // console.log(res)
      idUser = res
    })

    console.log(idUser)

    const data = {
      "user_id": idUser,
      "book_id": id
    }
    this.api.setFavoriteBook(data).subscribe(res => {
      console.log(res)
      this.presentToast('Libro agregado como favorito', 'bottom')
    }, err => {
      this.presentToast('Opps Ocurrio un error ' + err.error.user[0], 'bottom')
    })
  }

  async presentToast(message: string, position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message,
      duration: 1500,
      position: position
    });

    await toast.present();
  }

  async presentAlertInfo(item: any) {
    const alert = await this.alertController.create({
      header: 'Sinopsis: ' + item.name,
      message: item.resumen,
      buttons: ['OK'],
    });

    await alert.present();
  }
}
