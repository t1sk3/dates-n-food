import { CanActivateFn } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {
  const data = localStorage.getItem('userInfo');
  console.log('data: ', data);
  if (data !== null && JSON.parse(data)[0].role === 'admin') {
    return true;
  }
  return false;
};
