import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * Comprueba si un usuario esta registrado, en caso afirmativo le deja acceder a la ruta y en caso cotrario redirige al usuario al login
 * @returns true en caso afirmativo o por el contrario false
 */
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