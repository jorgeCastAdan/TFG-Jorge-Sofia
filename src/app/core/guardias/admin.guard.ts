import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { filter, map, take } from 'rxjs';

export const adminGuard: CanActivateFn = (route, state) => {
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
