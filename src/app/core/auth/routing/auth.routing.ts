import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { RegistrationComponent } from '../registration/registration.component';
import { NotLoggedGuard } from 'src/app/core/auth/authGuards/notLoggedGuard';

const routes: Routes = [
  { path: 'registration', component: RegistrationComponent, canActivate: [NotLoggedGuard]},
  { path: 'login', component: LoginComponent, canActivate: [NotLoggedGuard]},
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
