import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { SupabaseService } from '../supabase.service';

@Injectable({
  providedIn: 'root'
})
export class authGuard implements CanActivate {
  constructor(
    private router: Router,
    private supabase: SupabaseService
    ) {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    const data = await this.supabase.getUser()

    if (data.data.user) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}