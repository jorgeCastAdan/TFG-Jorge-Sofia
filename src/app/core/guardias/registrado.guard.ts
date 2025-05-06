import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const registradoGuard: CanActivateFn = (route, state) => {
  let autentificado = false;
  const router = inject(Router);
  
  if(autentificado){
    return true;
  }
  
  return router.navigate(['/login']);
};
