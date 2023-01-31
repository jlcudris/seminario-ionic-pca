import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookDetailsModalPage } from './book-details-modal.page';

const routes: Routes = [
  {
    path: '',
    component: BookDetailsModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookDetailsModalPageRoutingModule {}
