import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SupabaseService } from '../../../services/supabase.service';

@Component({
  selector: 'app-add-date-dialog',
  templateUrl: './add-date-dialog.component.html',
  styleUrls: ['./add-date-dialog.component.sass']
})
export class AddDateDialogComponent implements OnInit {
  dateForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private dialogRef: MatDialogRef<AddDateDialogComponent>,
    private supabaseService: SupabaseService
    ) {
    this.dateForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      costly: ['', Validators.required],
    });
  }

  setPrice(price: number): void {
    this.dateForm.get('costly')?.setValue(price);
  }

  ngOnInit(): void {
    // Add your initialization logic here
  }

  onSubmit(): void {
    if (!this.dateForm.invalid) {
      this.supabaseService.createDate(this.dateForm.value);
    }
    // reload data
    this.dialogRef.close();

  }

  onCancel(): void {
    // close dialog
    this.dateForm.reset();
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