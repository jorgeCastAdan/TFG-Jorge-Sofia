import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { filter, map, take } from 'rxjs';

/**
 * Comprueba si el usuario tiene permisos de admin, en caso afirmativo le permite acceder a la ruta, en caso contrario le redirige al inicio
 * @returns true si es admin y false en caso cotrario
 */
export const adminGuard: CanActivateFn = () => {
  let auth = inject(AuthService)

  let router = inject(Router)

  return auth.usuario$.pipe(
    filter(usuario => usuario !== null),
    take(1),
    map(usuario => {
      if (usuario?.esAdmin) {
        return true;
      } else {
        router.navigate(['/']);
        return false;
      }

    })

  );

};
