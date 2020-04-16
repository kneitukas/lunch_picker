import { AuthService } from './../../../core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent  {

  loginForm: FormGroup = this.builder.group(
    {
      email: ['', Validators.required],
      password: ['', Validators.required]
    }
  )

  constructor(private builder: FormBuilder, private http: AuthService, private router:Router) { }

  onSubmit() {
    if (this.loginForm.invalid) { 
      return
    }


    this.http.Login(this.loginForm.value)
    .subscribe(
      {
        next: (res) => {
          console.log(res)
          this.router.navigateByUrl("/")
        },
        error: (err) => console.log(err)
      }
    )
  }

}
