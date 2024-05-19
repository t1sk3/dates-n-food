import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { SupabaseService } from '../supabase.service';

export const authGuard: CanActivateFn = async (route, state) => {
  const supabaseService = inject(SupabaseService);
  const user = await supabaseService.getUser();
  return user.user !== null;
};