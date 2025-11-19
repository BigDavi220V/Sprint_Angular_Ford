// src/app/auth/auth.guard.ts

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

/**
 * Guardião de Rota para verificar se o usuário está autenticado.
 * Permite o acesso se o 'usuarioLogado' estiver no localStorage; caso contrário, redireciona para a tela de login.
 */
export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  // 1. Verificar se o token/usuário existe no localStorage
  const isLogged = localStorage.getItem('usuarioLogado');

  if (isLogged) {
    // 2. Se o usuário estiver logado, permite o acesso à rota.
    return true;
  } else {
    // 3. Se não estiver logado, bloqueia a navegação e redireciona para a rota de login ('/').
    return router.navigate(['/']);
  }
};

/**
 * Guardião de Rota complementar para bloquear o acesso à tela de Login/Cadastro
 * se o usuário já estiver logado.
 */
export const unauthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const isLogged = localStorage.getItem('usuarioLogado');

  if (isLogged) {
    // 1. Se o usuário estiver logado e tentar ir para a tela de login, redireciona para o dashboard.
    return router.navigate(['/dashboard']);
  } else {
    // 2. Se não estiver logado, permite o acesso (à tela de login).
    return true;
  }
};