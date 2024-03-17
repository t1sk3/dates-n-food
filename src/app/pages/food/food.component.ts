import { Component } from '@angular/core';
import { SupabaseService } from '../../services/supabase.service';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrl: './food.component.sass'
})
export class FoodComponent {
  data: any
  loaded: boolean = false
  constructor(
    private supabaseService: SupabaseService,
  ) { }

  async ngOnInit() {
    this.data = await this.supabaseService.getDishes()
    this.loaded = true
  }
}
