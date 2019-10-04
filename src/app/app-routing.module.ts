import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/auth/login/login.component';

const routes: Routes = [
  { path: 'training', loadChildren: './features/training/training.module#TrainingPageModule' },
  { path: 'more', component: LoginComponent }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
