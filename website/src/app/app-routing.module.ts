import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmailConfirmComponent } from '../components/email-confirm/email-confirm.component';
import { PassChangeComponent } from '../components/pass-change/pass-change.component';


const appRoutes: Routes = [
  {path: 'confirm/:token' , component: EmailConfirmComponent},
  {path: 'reset-password/:token_pass' , component: PassChangeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
