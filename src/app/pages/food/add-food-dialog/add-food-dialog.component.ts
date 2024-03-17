import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SupabaseService } from '../../../services/supabase.service';

@Component({
  selector: 'app-add-food-dialog',
  templateUrl: './add-food-dialog.component.html',
  styleUrl: './add-food-dialog.component.sass'
})
export class AddFoodDialogComponent {
  foodForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private dialogRef: MatDialogRef<AddFoodDialogComponent>,
    private supabaseService: SupabaseService
    ) {
    this.foodForm = this.fb.group({
      title: ['', Validators.required],
      time_span: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      price: ['', Validators.required],
      link: [''],
    });
  }

  setPrice(price: number): void {
    this.foodForm.get('price')?.setValue(price);
  }

  onSubmit(): void {
    if (this.foodForm.valid) {
      this.supabaseService.createDish(this.foodForm.value);
    }
    // reload data
    this.dialogRef.close();
  }

  onCancel(): void {
    // close dialog
    this.foodForm.reset();
    this.dialogRef.close();
  }

  onHover(index: number): void {
    // range over 0 - index
    for (let i = 0; i <= index; i++) {
      const span = document.getElementById(`price-${i}`);
      span?.classList.remove('inactive');
      span?.classList.add('hover');
      console.log(span);
    }
  }

  onLeave(index: number): void {
    // range over 0 - index
    for (let i = 0; i <= index; i++) {
      const span = document.getElementById(`price-${i}`);
      span?.classList.add('inactive');
      span?.classList.remove('hover');
    }
  }
}
