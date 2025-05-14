import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  let auth = inject(AuthService)

  let router = inject(Router)
  let usuario = auth.usuario;

  if(usuario !== 0){
    if(usuario!.esAdmin){return true}
    else{return router.parseUrl('/')}
  }
  
  return false
};
