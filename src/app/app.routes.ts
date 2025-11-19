import { Routes } from '@angular/router';
// 💡 Caminho corrigido para sua pasta 'auth'
import { authGuard, unauthGuard } from './auth/auth.guard'; 

export const routes: Routes = [
  {
    path: '',
    loadComponent:()=>
      import('./pages/login/login.component').then(m=> m.LoginComponent),
    // 💡 Aplica o unauthGuard: Se já estiver logado, não pode voltar para o login.
    canActivate: [unauthGuard] 
  },

  {
    path: 'home',
    loadComponent:()=>
      import('./pages/home/home.component').then(m=> m.HomeComponent),
    // 💡 Aplica o authGuard: Precisa estar logado para acessar a Home.
    canActivate: [authGuard] 
  },

  {
    path: 'dashboard',
    loadComponent:()=>
      import('./pages/dashboard/dashboard.component').then(m=> m.DashboardComponent),
    // 💡 Aplica o authGuard: Precisa estar logado para acessar o Dashboard.
    canActivate: [authGuard] 
  },

 
];