import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const registradoGuard: CanActivateFn =  () => {
  
  const auth = inject(AuthService)
  const router = inject(Router);
  
  if(auth.usuario !== null){
    return true;
  }
  
  return router.parseUrl('/login')
}