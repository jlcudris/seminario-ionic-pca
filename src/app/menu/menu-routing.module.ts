import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginGuard } from '../guards/login.guard';

import { MenuPage } from './menu.page';

const routes: Routes = [
  {
    path: '',
    component: MenuPage,
    children:[
      {
      path:"home",
      loadChildren: () => import('../home/home.module').then( m => m.HomePageModule),canActivate:[LoginGuard]
    },
    {
      path: 'authors',
      loadChildren: () => import('../authors/authors.module').then( m => m.AuthorsPageModule)
    },
    {
      path: 'books',
      loadChildren: () => import('../books/books.module').then( m => m.BooksPageModule)
    },
    {
      path: 'favorite-books',
      loadChildren: () => import('../favorite-books/favorite-books.module').then( m => m.FavoriteBooksPageModule)
    },
    {
      path: 'top-diez',
      loadChildren: () => import('../top-diez/top-diez.module').then( m => m.TopDiezPageModule)
    }
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuPageRoutingModule {}
