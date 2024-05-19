import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from '../../../services/supabase.service';

@Component({
  selector: 'app-app-header',
  templateUrl: './app-header.component.html',
  styleUrl: './app-header.component.sass'
})
export class AppHeaderComponent {
  isAdmin = false;
  username = null;

  constructor(
    private supabaseService: SupabaseService,
    private router: Router
  ) { }

  async ngOnInit() {
    // if screenwidth is less than 768px
    if (window.innerWidth < 768) {
      this.toggleSidenav()
    }
    let user = await this.supabaseService.getUserInfo();
    if (user) {
      this.isAdmin = user[0].role === 'admin'
      this.username = user[0].username
    }
  }

  toggleProfile() {
    console.log('toggling profile')
  }

  toggleSidenav() {
    let list = document.getElementById('options-list')
    if (list) {
      list.style.height === '0px' ? list.style.height = 'auto' : list.style.height = '0px';
      list.style.opacity === '0' ? list.style.opacity = '1' : list.style.opacity = '0';
    }
  }

  toAdmin() {
    this.router.navigate(['/admin'])
  }

  logout() {
    this.supabaseService.signOut()
    this.router.navigate(['/'])
  }
}
