import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DatesComponent } from './pages/dates/dates.component';
import { authGuard } from './services/guards/auth.guard';
import { FoodComponent } from './pages/food/food.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
