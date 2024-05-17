import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SupabaseService } from '../../../services/supabase.service';

@Component({
  selector: 'app-add-tv-dialog',
  templateUrl: './add-tv-dialog.component.html',
  styleUrl: './add-tv-dialog.component.sass'
})
export class AddTvDialogComponent implements OnInit {
  dateForm: FormGroup;
  isMoviePage: boolean = true;

  constructor(
    private fb: FormBuilder, 
    private dialogRef: MatDialogRef<AddTvDialogComponent>,
    private supabaseService: SupabaseService,
    ) {
    this.dateForm = this.fb.group({
      title: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.isMoviePage = window.location.pathname.includes('movies');
  }

  onSubmit(): void {
    if (!this.dateForm.invalid) {
      this.isMoviePage ? this.supabaseService.createMovie(this.dateForm.value) : this.supabaseService.createSeries(this.dateForm.value);
    }
    // reload data
    this.dialogRef.close();

  }

  onCancel(): void {
    // close dialog
    this.dateForm.reset();
    this.dialogRef.close();
  }
}
