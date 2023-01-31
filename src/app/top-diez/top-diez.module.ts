import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TopDiezPageRoutingModule } from './top-diez-routing.module';

import { TopDiezPage } from './top-diez.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TopDiezPageRoutingModule
  ],
  declarations: [TopDiezPage]
})
export class TopDiezPageModule {}
