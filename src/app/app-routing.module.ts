import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/auth/login/login.component';
import { FirstLevelGuard } from 'src/app/core/auth/authGuards/firstLevelGuard';
import { NotLoggedGuard } from 'src/app/core/auth/authGuards/notLoggedGuard';

const routes: Routes = [
  { path: 'training', loadChildren: './features/training/training.module#TrainingPageModule', canActivate: [FirstLevelGuard] },
  { path: 'auth', loadChildren: './core/auth/auth.module#AuthModule', canActivate: [NotLoggedGuard] }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
