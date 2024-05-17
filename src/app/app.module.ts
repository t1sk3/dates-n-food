import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { DatesComponent } from './pages/dates/dates.component';
import { AppHeaderComponent } from './pages/components/app-header/app-header.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { FoodComponent } from './pages/food/food.component';
import { AddDateDialogComponent } from './pages/dates/add-date-dialog/add-date-dialog.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { AddFoodDialogComponent } from './pages/food/add-food-dialog/add-food-dialog.component';
import { EditDateDialogComponent } from './pages/dates/edit-date-dialog/edit-date-dialog.component';
import { TvComponent } from './pages/tv/tv.component';
import { AddTvDialogComponent } from './pages/tv/add-tv-dialog/add-tv-dialog.component';
import { EditTvDialogComponent } from './pages/tv/edit-tv-dialog/edit-tv-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DatesComponent,
    AppHeaderComponent,
    FoodComponent,
    AddDateDialogComponent,
    AddFoodDialogComponent,
    EditDateDialogComponent,
    TvComponent,
    AddTvDialogComponent,
    EditTvDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatToolbarModule,
    MatSelectModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
