import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from '../../../services/supabase.service';

@Component({
  selector: 'app-app-header',
  templateUrl: './app-header.component.html',
  styleUrl: './app-header.component.sass'
})
export class AppHeaderComponent {
  isAdmin = false

  constructor(
    private supabaseService: SupabaseService,
    private router: Router
  ) { }

  ngOnInit() {
    // if screenwidth is less than 768px
    if (window.innerWidth < 768) {
      this.toggleSidenav()
    }
    let userInfo = localStorage.getItem('userInfo');
    let user = userInfo ? JSON.parse(userInfo)[0] : null
    if (user) {
      this.isAdmin = user.role === 'admin'
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
    localStorage.removeItem('user')
    this.supabaseService.signOut()
    this.router.navigate(['/'])
  }
}
