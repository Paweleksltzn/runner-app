import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorStatementComponent } from '../error-statement/error-statement.component';
import { LoginComponent } from '../login/login.component';
import { PassResetComponent } from '../login/pass-reset/pass-reset.component';
import { RegistrationComponent } from '../registration/registration.component';

const routes: Routes = [
  { path: 'registration', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'error', component: ErrorStatementComponent},
  { path: 'password-reset', component: PassResetComponent},
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
