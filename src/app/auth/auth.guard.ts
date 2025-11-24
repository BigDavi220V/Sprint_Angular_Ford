

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';


export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  
  const isLogged = localStorage.getItem('usuarioLogado');

  if (isLogged) {
    
    return true;
  } else {
    
    return router.navigate(['/']);
  }
};


export const unauthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const isLogged = localStorage.getItem('usuarioLogado');

  if (isLogged) {
    
    return router.navigate(['/dashboard']);
  } else {
    
    return true;
  }
};