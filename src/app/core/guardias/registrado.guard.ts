import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const registradoGuard: CanActivateFn = async (
  route: ActivatedRouteSnapshot,
  _: RouterStateSnapshot
): Promise<boolean | UrlTree> => {
  
  const auth = inject(AuthService)
  const router = inject(Router);
  const token = await auth.getToken()
  
  if(token){
    return true;
  }
  
  return router.parseUrl('/login')
}