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

  async getDates() {
    const { data, error } = await this.supabase.from('dates').select('*')
    if (error) {
      console.log('error', error)
    }
    return data
  }

  async createDate(date: any) {
    const { data, error } = await this.supabase.from('dates').insert(date)
    if (error) {
      console.log('error', error)
    }
    return data
  }

  async updateDate(date: any) {
    const { data, error } = await this.supabase.from('dates').update(date).eq('id', date.id)
    if (error) {
      console.log('error', error)
    }
    return data
  }

  getUser() {
    return this.supabase.auth.getUser();
  }

  async getDishes() {
    const { data, error } = await this.supabase.from('dishes').select('*')
    if (error) {
      console.log('error', error)
    }
    return data
  }

  async createDish(dish: any) {
    const { data, error } = await this.supabase.from('dishes').insert(dish)
    if (error) {
      console.log('error', error)
    }
    return data
  }

  async updateDish(dish: any) {
    const { data, error } = await this.supabase.from('dishes').update(dish).eq('id', dish.id)
    if (error) {
      console.log('error', error)
    }
    return data
  }
}
