import { CanActivateFn } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {
  const data = localStorage.getItem('userInfo');
  return data !== null && JSON.parse(data)[0].role === 'admin'
};
