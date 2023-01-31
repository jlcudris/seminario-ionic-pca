import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookDetailsModalPageRoutingModule } from './book-details-modal-routing.module';

import { BookDetailsModalPage } from './book-details-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BookDetailsModalPageRoutingModule
  ],
  declarations: [BookDetailsModalPage]
})
export class BookDetailsModalPageModule {}
