import { Component } from '@angular/core';
import { SupabaseService } from '../../services/supabase.service';
import { User } from '@supabase/supabase-js';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.sass'
})
export class AdminComponent {
  users: User[] = []
  constructor(
    private supabaseService: SupabaseService
  ) { }

  ngOnInit() {
    this.getUsers()
  }

  async getUsers() {
    const data = await this.supabaseService.getAllUsers();
    this.users = data
  }
}
