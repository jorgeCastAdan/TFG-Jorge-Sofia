import { HttpInterceptorFn } from '@angular/common/http';

export const interceptorEjemplopInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};
