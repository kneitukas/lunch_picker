import { RestaurantResolver } from './services/resolvers/restaurant.resolver';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main.component';
import { MenusComponent } from './pages/menus/menus.component';
import { RestaurantsComponent } from './pages/restaurants/restaurants.component';
import { RestaurantComponent } from './pages/restaurant/restaurant.component';


const routes: Routes = [
  {path: '', redirectTo: 'menus', pathMatch: 'full'},
  { path: '', component: MainComponent, children:[
    {path: "menus", component: MenusComponent},
    {path: "restaurants", component: RestaurantsComponent},
    {path: "restaurants/:id", component: RestaurantComponent, resolve: {rest: RestaurantResolver} }
  ] }];

@NgModule({
  declarations: [],  
  imports: [RouterModule.forChild(routes)],  
  exports: [RouterModule],
  providers: [RestaurantResolver]
})
export class MainRoutingModule { }  
