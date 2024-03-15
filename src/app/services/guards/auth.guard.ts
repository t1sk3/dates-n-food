import { CanActivateFn } from '@angular/router';
import { supabase } from '../supabaseClient';

export const authGuard: CanActivateFn = async (route, state) => {
  const user = await supabase.auth.getUser();
  if (user.data.user) {
    return true
  } else {
    return false
  }
};
