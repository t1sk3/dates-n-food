import { Component } from '@angular/core';
import { SupabaseService } from '../../../services/supabase.service';

@Component({
  selector: 'app-app-header',
  templateUrl: './app-header.component.html',
  styleUrl: './app-header.component.sass'
})
export class AppHeaderComponent {

  constructor(
    private supabaseService: SupabaseService,
  ) { }

  ngOnInit() {
  }

  toggleProfile() {
    console.log('toggling profile')
  }

  logout() {
    this.supabaseService.signOut()
  }
}
