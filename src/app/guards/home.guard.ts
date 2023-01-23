import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate,Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {Storage} from '@ionic/storage'

@Injectable({
  providedIn: 'root'
})
export class HomeGuard implements CanActivate {
  constructor(private storage :Storage, private router: Router){
  }


  async canActivate() {
  
    const introShowedRedirect= await this.storage.get('isIntroShowed');
    if(introShowedRedirect){
      this.router.navigateByUrl('/menu/home');
    }
    return true;
    
  }
  
}
