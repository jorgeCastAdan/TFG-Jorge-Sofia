import { HttpInterceptorFn } from '@angular/common/http';
import { HTTP_API } from '../../environment/environment';

/**
 * Intercepta las llamadas http y realiza cambios a estas llamadas si acaba en .json o empieza por http
 * @param req La llamada que intercepta
 * @param next Un manejador para volver a lanzar la llamada
 * @returns Devuelve el lanzamiento de una nueva llamada
 */
export const httpRequestInterceptor: HttpInterceptorFn = (req, next) => {
  if(req.url.endsWith('.json')){
    return next(req);
  }

  if(!req.url.startsWith('http')){
      req = req.clone({url:`${HTTP_API}/${req.url}`})
  }

  return next(req)
};
