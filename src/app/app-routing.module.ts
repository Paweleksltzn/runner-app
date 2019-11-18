import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { FirstLevelGuard } from 'src/app/core/auth/authGuards/firstLevelGuard';

const routes: Routes = [
  { path: 'auth', loadChildren: './core/auth/auth.module#AuthModule' },
  { path: 'user/profile', loadChildren: './features/profiles/user/user.module#UserModule', canActivate: [FirstLevelGuard]},
  { path: 'workout', loadChildren: './features/workouts/active-workout/active-workout.module#ActiveWorkoutPageModule',
   canActivate: [FirstLevelGuard] },
  { path: 'my-workouts', loadChildren: './features/workouts/my-workouts/my-workouts.module#MyWorkoutsPageModule',
   canActivate: [FirstLevelGuard] },
  { path: 'workouts-history', loadChildren: './features/workouts/history/history.module#HistoryPageModule', canActivate: [FirstLevelGuard] }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
