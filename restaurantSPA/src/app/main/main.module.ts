import { RestaurantComponent } from './pages/restaurant/restaurant.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { NavComponent } from './components/nav/nav.component';

import { MaterialModule } from '../ui/material/material.module';

import { MenusComponent } from './pages/menus/menus.component';
import { RestaurantsComponent } from './pages/restaurants/restaurants.component';
import { NewRestaurantDialogComponent } from './components/new-restaurant-dialog/new-restaurant-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { NewMenuDialogComponent } from './components/new-menu-dialog/new-menu-dialog.component';



@NgModule({
  declarations: [MainComponent, NavComponent, MenusComponent, NewRestaurantDialogComponent, RestaurantsComponent, RestaurantComponent, NewMenuDialogComponent],
  imports: [
    CommonModule,
    MaterialModule,
    MainRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  entryComponents: [NewRestaurantDialogComponent, NewMenuDialogComponent]
})
export class MainModule { } 
