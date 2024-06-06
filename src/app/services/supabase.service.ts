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
      return null
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

  async editDate(date: any) {
    const { data, error } = await this.supabase.from('dates').update(date).eq('id', date.id)
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

  async updateTv(tv: any, isMovie: boolean) {
    const { data, error } = await this.supabase.from(isMovie ? 'movies' : 'series').update(tv).eq('id', tv.id)
    if (error) {
      console.log('error', error)
    }
    return data

  }

  async getUser() {
    const { data, error } = await this.supabase.auth.getUser();
    if (error) {
      console.log('error', error)
    }
    return data
  }

  async getUserInfo() {
    let user = (await this.supabase.auth.getUser()).data.user;
    const { data, error } = await this.supabase.from('users').select('*').eq('uid', user?.id);
    if (error) {
      console.log('error', error)
    }
    return data
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

  async getMovies() {
    const { data, error } = await this.supabase.from('movies').select('*')
    if (error) {
      console.log('error', error)
    }
    return data
  }

  async createMovie(movie: any) {
    const { data, error } = await this.supabase.from('movies').insert(movie)
    if (error) {
      console.log('error', error)
    }
    return data
  }

  async getSeries() {
    const { data, error } = await this.supabase.from('series').select('*')
    if (error) {
      console.log('error', error)
    }
    return data
  }

  async createSeries(series: any) {
    const { data, error } = await this.supabase.from('series').insert(series)
    if (error) {
      console.log('error', error)
    }
    return data
  }

  async deleteTv(tv: any, isMovie: boolean) {
    const { data, error } = await this.supabase.from(isMovie ? 'movies' : 'series').delete().eq('id', tv.id)
    if (error) {
      console.log('error', error)
    }
    return data
  }

  async getAllUsers() {
    const {data: { users }, error} = await this.supabase.auth.admin.listUsers();
    if (error) {
      console.log('error', error)
    }
    return users
  }

  async getQuotes() {
    const { data, error } = await this.supabase
        .from('quotes')
        .select('*, user:users ( id, username )')
        .order('date')
    if (error) {
      console.log('error', error)
    }
    return data
  }

  async getIdFromUsername(username: string) {
    const { data, error } = await this.supabase.from('users').select('id').eq('username', username)
    if (error) {
      console.log('error', error)
    }
    return data
  }

  async createQuote(quote: any) {
    const id = await this.getIdFromUsername(quote.username)
    if (id) {
      quote.said_by = id[0].id
    } else {
      console.log('error', 'User not found')
      return
    }
    delete quote.username
    const { data, error } = await this.supabase.from('quotes').insert(quote)
    if (error) {
      console.log('error', error)
    }
    return data
  }
}
