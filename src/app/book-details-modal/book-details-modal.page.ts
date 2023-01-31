import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, NavParams, ToastController } from '@ionic/angular';
import { LibraryService } from '../services/library.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-book-details-modal',
  templateUrl: './book-details-modal.page.html',
  styleUrls: ['./book-details-modal.page.scss'],
})
export class BookDetailsModalPage implements OnInit {
  book: any
  user_id: any
  like_button: boolean = false
  constructor(private navParams: NavParams,
    private modalController: ModalController,
    private storage: Storage,
    private api: LibraryService, private toastController: ToastController, private libraryService: LibraryService,
    private alerController: AlertController) { }

  async ngOnInit() {

    this.book = this.navParams.get('book');

    this.user_id = await this.storage.get("user_id");
    this.libraryService.getCheckLikeBoot(this.user_id, this.book.id).subscribe((data: any) => {
      this.like_button = data.like
    },
      (error) => this.presentAlert("Opps", "hubo un error", error)
    )

  }

  closeModal() {
    this.modalController.dismiss();
  }

  //no la estoy usando
  async favoriteBook(id: number) {
    // console.log(id)
    let idUser: any
    await this.storage.get('user_id').then(res => {
      // console.log(res)
      idUser = res
    })

    //console.log(idUser)

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

  like() {
    this.libraryService.likeBoot(this.user_id, this.book.id).subscribe((data: any) => {
      this.like_button = true
    }, (error) =>
      console.log(error)
    )
  }

  disLike() {
    this.libraryService.dislike(this.user_id, this.book.id).subscribe((data: any) => {

      if (data.status == "OK") {
        this.like_button = false;
      }
    }, (error) =>
      console.log(error)
    )
  }


  async presentAlert(header: any, subHeader: any, message: any) {
    const alert = await this.alerController.create({
      header: header,
      subHeader: subHeader,
      message: message,
      buttons: ['OK']
    });
    await alert.present();

  }

}
