import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SupabaseService } from '../../../services/supabase.service';

@Component({
  selector: 'app-add-quote',
  templateUrl: './add-quote.component.html',
  styleUrls: ['./add-quote.component.sass']
})
export class AddQuoteComponent implements OnInit {
  quoteForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private dialogRef: MatDialogRef<AddQuoteComponent>,
    private supabaseService: SupabaseService
    ) {
    this.quoteForm = this.fb.group({
      quote: ['', Validators.required],
      username: ['', Validators.required],
      date: ['', Validators.required],
      description: [''],
    });
  }

  ngOnInit(): void {
    // Add your initialization logic here
  }

  onSubmit(): void {
    if (!this.quoteForm.invalid) {
      this.quoteForm.value.date = new Date(this.quoteForm.value.date)
      this.quoteForm.value.date.setHours(6, 0, 0, 0)
      this.supabaseService.createQuote(this.quoteForm.value);
    }
    // reload data
    this.dialogRef.close();
  }

  onCancel(): void {
    // close dialog
    this.quoteForm.reset();
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