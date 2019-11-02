import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { FirstLevelGuard } from 'src/app/core/auth/authGuards/firstLevelGuard';

const routes: Routes = [
  { path: 'workout', loadChildren: './features/workouts/active-workout/active-workout.module#ActiveWorkoutPageModule',
   canActivate: [FirstLevelGuard] },
  { path: 'training', loadChildren: './features/training/training.module#TrainingPageModule', canActivate: [FirstLevelGuard] },
  { path: 'auth', loadChildren: './core/auth/auth.module#AuthModule' },
  { path: 'my-workouts', loadChildren: './features/workouts/my-workouts/my-workouts.module#MyWorkoutsPageModule',
   canActivate: [FirstLevelGuard] }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
