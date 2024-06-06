import { Component } from '@angular/core';
import { SupabaseService } from '../../services/supabase.service';
import { MatDialog } from '@angular/material/dialog';
import { AddQuoteComponent } from './add-quote/add-quote.component';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrl: './quotes.component.sass'
})
export class QuotesComponent {
  quotes: any
  loaded: boolean = false
  constructor(
    private supabaseService: SupabaseService,
    public dialog: MatDialog
  ) { }

  async ngOnInit() {
    this.quotes = await this.supabaseService.getQuotes()
    if (!this.quotes) {
      this.loaded = true
      this.quotes = [];
      return
    }
    for(let quote of this.quotes) {
      if (quote.user == null) {
        quote.user = { username: 'Unknown' }
      }
    }
    this.loaded = true
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddQuoteComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit()
    });
  }
}
