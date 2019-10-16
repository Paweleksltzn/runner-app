import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { FirstLevelGuard } from 'src/app/core/auth/authGuards/firstLevelGuard';

const routes: Routes = [
  { path: 'workout', loadChildren: './features/active-workout/active-workout.module#ActiveWorkoutPageModule' },
  { path: 'training', loadChildren: './features/training/training.module#TrainingPageModule', canActivate: [FirstLevelGuard] },
  { path: 'auth', loadChildren: './core/auth/auth.module#AuthModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
