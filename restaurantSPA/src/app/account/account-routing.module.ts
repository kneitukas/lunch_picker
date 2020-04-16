import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';


const routes: Routes = [
  {path: "", redirectTo: "login", pathMatch: "full"},
  { 
    path: '', component: AccountComponent, children: [
      { path: "login", component: LoginComponent }, 
      { path: "register", component: RegisterComponent },
    ] 
  }];  
 
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
}) 
export class AccountRoutingModule { }  
    