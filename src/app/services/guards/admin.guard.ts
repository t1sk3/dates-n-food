import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { SupabaseService } from '../supabase.service';

export const adminGuard: CanActivateFn = async (route, state) => {
  const supabaseService = inject(SupabaseService);
  let data = await supabaseService.getUserInfo();
  return data !== null && data.length > 0 && data[0].role === 'admin';
};