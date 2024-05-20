import { Component } from '@angular/core';
import { SupabaseService } from '../../services/supabase.service';
import { MatDialog } from '@angular/material/dialog';
import { AddDateDialogComponent } from './add-date-dialog/add-date-dialog.component';
import { EditDateDialogComponent } from './edit-date-dialog/edit-date-dialog.component';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';

@Component({
  selector: 'app-dates',
  templateUrl: './dates.component.html',
  styleUrl: './dates.component.sass',
  animations: [
    trigger('changeSeen', [
      state('expand_circle_down', style({
        transform: 'scale(1.0)'
      })),
      state('radio_button_unchecked', style({
        transform: 'scale(0.5)'
      })),
      transition('*=>expand_circle_down', animate('200ms', keyframes([
        style({ transform: 'scale(1.0)', offset: 0.5 }),
        style({ transform: 'scale(1.2)', offset: 0.7 }),
        style({ transform: 'scale(1.0)', offset: 1.0 })
      ]))),
      transition('*=>radio_button_unchecked', animate('200ms', keyframes([
        style({ transform: 'scale(0.5)', offset: 0.5 }),
        style({ transform: 'scale(0.3)', offset: 0.7 }),
        style({ transform: 'scale(0.5)', offset: 1.0 })
      ])))
    ])
  ]
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
    if (!this.data) {
      this.loaded = true
      this.data = [];
      return
    }
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
    this.supabaseService.updateDate(date)
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddDateDialogComponent);

    dialogRef.afterClosed().subscribe(async result => {
        this.loaded = false
        this.ngOnInit()
    });
  }

  openEditDialog(date: any): void {
    const dialogRef = this.dialog.open(EditDateDialogComponent, {
      data: date
    });

    dialogRef.afterClosed().subscribe(async result => {
      this.loaded = false
      this.ngOnInit()
    });
  }
}
