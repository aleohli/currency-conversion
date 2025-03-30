import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from 'app/environments/environment';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const cloned = req.clone({
    url: `https://api.currencybeacon.com/v1/${req.url}`,
    setHeaders: { Authorization: `Bearer ${environment.apiKey}` },
  });

  return next(cloned);
};
