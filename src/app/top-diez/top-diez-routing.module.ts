import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TopDiezPage } from './top-diez.page';

const routes: Routes = [
  {
    path: '',
    component: TopDiezPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TopDiezPageRoutingModule {}
