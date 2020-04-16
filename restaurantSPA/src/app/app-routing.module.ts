import { NgModule } from "@angular/core";
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { CanDeactivateGuard } from './core/guards/canDeactivate.guard';

const routes: Routes = [
  {
    path: "",
    runGuardsAndResolvers: "always",
    canActivate: [AuthGuard],
    loadChildren: () => import("./main/main.module").then(m => m.MainModule),
  },
  {
    path: "", 

    loadChildren: () =>
      import("./account/account.module").then(m => m.AccountModule)
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
