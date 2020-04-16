import { MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, Validators } from '@angular/forms';

@Component({
  templateUrl: './new-menu-dialog.component.html',
  styleUrls: ['./new-menu-dialog.component.scss']
})
export class NewMenuDialogComponent {

  fields = new FormArray([
    new FormControl('', Validators.required)
  ])

  constructor(public dialogRef: MatDialogRef<NewMenuDialogComponent>) { }


  add() {
    this.fields.push(new FormControl('', Validators.required))
  }

  delete(index:any) {
    this.fields.removeAt(index)
  }

  submit() {
    if (this.fields.valid) {
      console.log(this.fields.value)
      this.dialogRef.close(this.fields.value)
    }
  }

}
