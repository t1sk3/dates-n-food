import { Component } from '@angular/core';
import { SupabaseService } from '../../services/supabase.service';
import { MatDialog } from '@angular/material/dialog';
import { AddDateDialogComponent } from './add-date-dialog/add-date-dialog.component';

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
    public dialog: MatDialog
  ) { }

  async ngOnInit() {
    this.data = await this.supabaseService.getDates()
    this.sortData('title')
    this.loaded = true
  }

  sortData(sortBy: string): void {
    this.data.sort((a: any, b: any) => {
      if (a[sortBy] < b[sortBy]) {
        return -1;
      }
      if (a[sortBy] > b[sortBy]) {
        return 1;
      }
      return 0;
    });
  }

  toggleDone(date: any) {
    date.done = !date.done
    console.log(date)
    this.supabaseService.updateDate(date)
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddDateDialogComponent);

    dialogRef.afterClosed().subscribe(async result => {
        this.loaded = false
        this.ngOnInit()
    });
}
}
