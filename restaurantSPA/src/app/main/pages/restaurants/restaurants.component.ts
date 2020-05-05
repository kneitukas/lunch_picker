import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewRestaurantDialogComponent } from '../../components/new-restaurant-dialog/new-restaurant-dialog.component';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { RestaurantResponse } from 'src/app/models/restaurant.model';

@Component({
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.scss']
})
export class RestaurantsComponent implements OnInit,OnDestroy {
rest : any = []
  constructor(public dialog: MatDialog, private api: ApiService, private router:Router) { }

  ngOnInit(): void {
     this.api.getRestaurants().subscribe( (val: any) => {
       this.rest = [...val]
     } )
  }

  openDialog() {
    let dialogRef = this.dialog.open(NewRestaurantDialogComponent, {
      height: '500px',
      width: '400px',
    }).afterClosed().subscribe( res => {
      if (res) {
        this.api.createRestaurant(res).subscribe( data => {
          console.log(data)
          this.rest.push(data)
        } )
      }
    } );
  }

  openRestaurant(rest: RestaurantResponse) {
   this.router.navigateByUrl(`/restaurants/${rest.id}`)
  }

  ngOnDestroy() {
    console.log("called")
  }
}
