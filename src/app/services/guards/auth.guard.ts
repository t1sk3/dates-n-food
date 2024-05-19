import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { SupabaseService } from '../supabase.service';

export const authGuard: CanActivateFn = (route, state) => {
  const supabaseService = inject(SupabaseService);
  const user = supabaseService.getUser();
  return user !== null;
};