import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SupabaseService } from '../../../services/supabase.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-add-tv-dialog',
  templateUrl: './add-tv-dialog.component.html',
  styleUrl: './add-tv-dialog.component.sass'
})
export class AddTvDialogComponent implements OnInit {
  dateForm: FormGroup;
  isMoviePage: boolean = true;
  titleNotFound: boolean = false;

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

  async onSubmit() {
    if (!this.dateForm.invalid) {
      let data = await fetch('https://www.omdbapi.com/?apikey=' + environment.OMDB_API_KEY + '&t=' + this.dateForm.value.title.replace(' ', '+'))
      .then(response => response.json())
      .then(data => {
        return data;
      });
      if (data.Error || data.Response === 'False') {
        this.titleNotFound = true;
        return;
      }
      let newData = {
        title: data.Title,
        imdb_id: data.imdbID,
        seen: false,
        liked: false,
      };
      this.isMoviePage ? this.supabaseService.createMovie(newData) : this.supabaseService.createSeries(newData);
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
