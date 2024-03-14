import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SupabaseService } from '../services/supabase.service';

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
    private supabaseService: SupabaseService
  ) { }

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  onSubmit() {
    const { email, password } = this.loginForm.value;
    if (this.loginForm.valid && email && password) {
      console.log('Logging in with email:', email, 'and password:', password)
      this.supabaseService.signIn(email, password);
    } else {
      this.loginError = 'Please enter a valid email and password';
    }
  }
}
