import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SupabaseService } from '../services/supabase.service';

import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.sass'
})
export class LoginComponent {

  loginError: string | null = null;
  [x: string]: any;

  constructor(
    private fb: FormBuilder,
    private supabaseService: SupabaseService,
    private dialog: MatDialog
  ) { }

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  onSubmit() {
    const { email, password } = this.loginForm.value;
    if (this.loginForm.valid && email && password) {
      this.supabaseService.signIn(email, password);
    } else {
      this.loginError = 'Please enter a valid email and password';
    }
  }
}
