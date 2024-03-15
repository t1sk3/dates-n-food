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

  async signIn(email: string, password: string) {
    return this.supabase.auth.signInWithPassword({ email, password });
  }

  signUp(email: string, password: string) {
    return this.supabase.auth.signUp({ email, password });
  }

  signOut() {
    return this.supabase.auth.signOut()
  }

  authChanges(callback: (event: AuthChangeEvent, session: Session | null) => void) {
    return this.supabase.auth.onAuthStateChange(callback)
  }
}
