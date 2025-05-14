import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const registradoGuard: CanActivateFn =  () => {
  
  const auth = inject(AuthService)
  const router = inject(Router);
  let usuario;

  auth.usuario$.subscribe(us=> usuario = us)
  
  if(usuario !== 0){
    return true;
  }
  
  router.navigate(['/login'])
  return false;
}