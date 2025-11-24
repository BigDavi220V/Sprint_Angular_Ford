import { Routes } from '@angular/router';

import { authGuard, unauthGuard } from './auth/auth.guard'; 

export const routes: Routes = [
  {
    path: '',
    loadComponent:()=>
      import('./pages/login/login.component').then(m=> m.LoginComponent),
    
   
  },

  {
    path: 'home',
    loadComponent:()=>
      import('./pages/home/home.component').then(m=> m.HomeComponent),
    
    canActivate: [authGuard] 
  },

  {
    path: 'dashboard',
    loadComponent:()=>
      import('./pages/dashboard/dashboard.component').then(m=> m.DashboardComponent),
    
    canActivate: [authGuard] 
  },

 
];