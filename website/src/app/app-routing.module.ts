import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmailConfirmComponent } from '../components/email-confirm/email-confirm.component';
import { PassChangeComponent } from '../components/pass-change/pass-change.component';
import { ErrorComponent } from 'src/components/error/error.component';
import { ProcessingErrorComponent } from '../components/error/processing-error/processing-error.component';


const appRoutes: Routes = [
  {path: 'confirm/:token' , component: EmailConfirmComponent},
  {path: 'reset-password/:token_pass' , component: PassChangeComponent},
  {path: 'error', component: ErrorComponent},
  {path: 'process-error', component: ProcessingErrorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
