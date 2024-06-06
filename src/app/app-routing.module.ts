import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DatesComponent } from './pages/dates/dates.component';
import { authGuard } from './services/guards/auth.guard';
import { adminGuard } from './services/guards/admin.guard';
import { FoodComponent } from './pages/food/food.component';
import { TvComponent } from './pages/tv/tv.component';
import { AdminComponent } from './pages/admin/admin.component';
import { QuotesComponent } from './pages/quotes/quotes.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'dates',
    component: DatesComponent,
    canActivate: [authGuard]
  },
  {
    path: 'food',
    component: FoodComponent,
    canActivate: [authGuard]
  },
  {
    path: 'quotes',
    component: QuotesComponent,
    canActivate: [authGuard]
  },
  {
    path: 'movies',
    component: TvComponent,
    canActivate: [authGuard]
  },
  {
    path: 'series',
    component: TvComponent,
    canActivate: [authGuard]
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [adminGuard]
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
