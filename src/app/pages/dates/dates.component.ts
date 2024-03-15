import { Component } from '@angular/core';
import { SupabaseService } from '../../services/supabase.service';

@Component({
  selector: 'app-dates',
  templateUrl: './dates.component.html',
  styleUrl: './dates.component.sass'
})
export class DatesComponent {
  data: any
  loaded: boolean = false
  constructor(
    private supabaseService: SupabaseService,
  ) { }

  async ngOnInit() {
    console.log('getting dates')
    this.data = await this.supabaseService.getDates()
    console.log('data', this.data)
    this.loaded = true
  }
}
