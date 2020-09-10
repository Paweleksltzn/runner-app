import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { FirstLevelGuard } from 'src/app/core/auth/authGuards/firstLevelGuard';
import { NotLoggedGuard } from './core/auth/authGuards/notLoggedGuard';

const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./core/auth/auth.module').then(m => m.AuthModule), canActivate: [NotLoggedGuard] },
  { path: 'user/profile', loadChildren: () => import('./features/profiles/user/user.module').then(m => m.UserModule), canActivate: [FirstLevelGuard]},
  { path: 'chat', loadChildren: () => import('./features/profiles/user_param/chat/chat/chat.module').then(m => m.ChatModule), canActivate: [FirstLevelGuard]},
  { path: 'notifications', loadChildren: () => import('./features/notifications/notifications.module').then(m => m.NotificationsPageModule), canActivate: [FirstLevelGuard]},
  { path: 'workout', loadChildren: () => import('./features/workouts/active-workout/active-workout.module').then(m => m.ActiveWorkoutPageModule),
   canActivate: [FirstLevelGuard] },
  { path: 'my-workouts', loadChildren: () => import('./features/workouts/my-workouts/my-workouts.module').then(m => m.MyWorkoutsPageModule),
   canActivate: [FirstLevelGuard] },
  { path: 'workouts-history', loadChildren: () => import('./features/workouts/history/history.module').then(m => m.HistoryPageModule),
   canActivate: [FirstLevelGuard] }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
