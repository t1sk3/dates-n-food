import { Injectable } from '@angular/core';
import {
  AuthChangeEvent,
  AuthSession,
  Session,
  User,
} from '@supabase/supabase-js'
import { supabase } from './supabaseClient'

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  [x: string]: any
  private supabase = supabase
  _session: AuthSession | null = null

  constructor() { }

  signIn(email: string, password: string) {
    console.log('Signing in with email:', email, 'and password:', password);
  }

  signUp(email: string, password: string) {
    console.log('Signing up with email:', email, 'and password:', password);
  }

  signOut() {
    console.log('Signing out');
  }

  authChanges(callback: (event: AuthChangeEvent, session: Session | null) => void) {
    return this.supabase.auth.onAuthStateChange(callback)
  }
}
