import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SupabaseService } from '../../../services/supabase.service';

@Component({
  selector: 'app-edit-date-dialog',
  templateUrl: './edit-date-dialog.component.html',
  styleUrl: './edit-date-dialog.component.sass'
})
export class EditDateDialogComponent implements OnInit {
  dateForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private dialogRef: MatDialogRef<EditDateDialogComponent>,
    private supabaseService: SupabaseService,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {
    this.dateForm = this.fb.group({
      title: [data.title, Validators.required],
      description: [data.description, Validators.required],
      costly: [data.costly, Validators.required],
    });
  }

  setPrice(price: number): void {
    this.dateForm.get('costly')?.setValue(price);
    console.log(price);
    console.log(this.dateForm.get('costly')?.value);
  }

  ngOnInit(): void {
    // Add your initialization logic here
  }

  onSubmit(): void {
    if (!this.dateForm.invalid) {
      let newData = this.dateForm.value;
      newData.id = this.data.id;
      this.supabaseService.editDate(newData);
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
      if (span) {
        span.style.color = 'black';
      }
    }
  }

  onLeave(index: number): void {
    // range over 0 - index
    for (let i = 0; i <= index; i++) {
      const span = document.getElementById(`price-${i}`);
      if (span) {
        span.style.color = '';
      }
      span?.classList.remove('hover');
    }
  }
}
