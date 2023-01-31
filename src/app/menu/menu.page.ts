import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  constructor(private storage:Storage,private menu: MenuController,private navCtrl:NavController) { }

  ngOnInit() {
  }

  closeMenu(){
    this.menu.close();
  }

  logout(){
    this.storage.remove('user')
    this.storage.remove('user_id')
    this.storage.set('isUserLoggedIn',false)
    this.navCtrl.navigateRoot("/login");
  }

  goToAuthors(){
    this.navCtrl.navigateRoot("/menu/authors")
    this.menu.close();
  }

  goToHome(){
    this.navCtrl.navigateRoot("/menu/home")
    this.menu.close();
  }
  goToBooks(){
    this.navCtrl.navigateRoot("/menu/books")
    this.menu.close();
  }

  goToMyFavorite(){
    this.navCtrl.navigateForward("/menu/favorite-books")
    this.menu.close();
  }

}
