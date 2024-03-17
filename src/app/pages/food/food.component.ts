import { Component } from '@angular/core';
import { SupabaseService } from '../../services/supabase.service';
import { MatDialog } from '@angular/material/dialog';
import { AddFoodDialogComponent } from './add-food-dialog/add-food-dialog.component';

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
    public dialog: MatDialog
  ) { }

  async ngOnInit() {
    this.data = await this.supabaseService.getDishes()
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

  openDialog(): void {
    const dialogRef = this.dialog.open(AddFoodDialogComponent);

    dialogRef.afterClosed().subscribe(async result => {
        this.loaded = false
        this.ngOnInit()
    });
  }

  
}
