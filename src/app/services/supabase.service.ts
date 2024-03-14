import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {

  constructor() { }

  signIn(email: string, password: string) {
    console.log('Signing in with email:', email, 'and password:', password);
  }
}
