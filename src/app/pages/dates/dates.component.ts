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
    this.data = await this.supabaseService.getDates()
    this.loaded = true
  }
}
