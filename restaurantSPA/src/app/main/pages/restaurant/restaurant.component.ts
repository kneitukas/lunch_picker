import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NewMenuDialogComponent } from '../../components/new-menu-dialog/new-menu-dialog.component';



@Component({
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss']
})
export class RestaurantComponent implements OnInit {

rest;
weekday;
unasignedMenus = []
menus = [
  {day: "Monday"},
  {day: "Tuesday"},
  {day: "Wednesday"},
  {day: "Thursday"},
  {day: "Friday"},
  {day: "Saturday"},
  {day: "Sunday"}
]

  constructor(private api:ApiService, private route: ActivatedRoute, private dialog: MatDialog) { }
  ngOnInit(): void {
    this.weekday = new Date().getDay() - 1
    console.log(this.weekday)
   this.route.data.subscribe( (val: {rest: any}) => {
      this.rest = val.rest
    }) 
  }

  newMenuDialog() {
    let dialogRef = this.dialog.open(NewMenuDialogComponent, {height: "400px", width: "500px"}).afterClosed().subscribe( val => {
      if (val)
      this.unasignedMenus.push(val)
      console.log(this.unasignedMenus)
    })
  }

  edit() {
    console.log('sds')
  }
}
