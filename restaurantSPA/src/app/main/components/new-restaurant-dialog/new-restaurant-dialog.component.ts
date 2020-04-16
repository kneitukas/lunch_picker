import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-new-restaurant-dialog',
  templateUrl: './new-restaurant-dialog.component.html',
  styleUrls: ['./new-restaurant-dialog.component.scss']
})
export class NewRestaurantDialogComponent implements OnInit {

  restaurant = new FormGroup({
    name: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
    photo: new FormControl(''),
    description: new FormControl(''),
  })
  name = new FormControl('')
  constructor(public dialogRef: MatDialogRef<NewRestaurantDialogComponent>) { }

  ngOnInit(): void { 
  }

  close() {
    if (this.restaurant.valid) {
      this.dialogRef.close(this.restaurant.value)
    }
  }

}
