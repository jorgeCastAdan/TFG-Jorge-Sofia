import { HttpInterceptorFn } from '@angular/common/http';
import { HTTP_API } from '../../environment/environment';

export const httpRequestInterceptor: HttpInterceptorFn = (req, next) => {
  if(req.url.endsWith('.json')){
    return next(req);
  }

  if(!req.url.startsWith('http')){
      req = req.clone({url:`${HTTP_API}/${req.url}`})
  }

  return next(req)
};
