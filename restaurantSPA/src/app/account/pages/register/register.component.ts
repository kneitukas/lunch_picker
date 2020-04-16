import { AuthService } from './../../../core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MustMatch } from '../../helpers/validators'; 


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private http: AuthService, private router: Router, private builder: FormBuilder) { }

  ngOnInit() {
    this.registerForm = this.builder.group(
      {
        email: ["", [Validators.required, Validators.email]],
        password: ["", Validators.required],
        repeatPass: ["", Validators.required]
      },
      {
        validator: MustMatch("password", "repeatPass")
      }
    )
  }

  onSubmit() {
    console.log(this.registerForm.value) 
    if (this.registerForm.invalid) {
      return
    }
    this.http.Register(this.registerForm.value).subscribe((res : any) => {
      console.log(res)
      this.router.navigateByUrl("/account/login")
    })
  }
}
