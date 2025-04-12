import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { WishlistComponent } from './wishlist/wishlist.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  { path: 'wishlist', component: WishlistComponent },
];
