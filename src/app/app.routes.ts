import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { NoAuthGuard } from './guards/no-auth.guard';

export const routes: Routes = [
  {
    path: '',
    canActivate: [NoAuthGuard],
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'create',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/alarm-create/alarm-create.module').then(m => m.AlarmCreateModule)
  },
  {
    path: 'edit/:id',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/alarm-edit/alarm-edit.module').then(m => m.AlarmEditModule)
  },
  {
    path: 'history',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/history/history.module').then(m => m.HistoryModule)
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];