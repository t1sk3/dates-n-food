import { Component } from '@angular/core';
import { SupabaseService } from '../../services/supabase.service';
import { MatDialog } from '@angular/material/dialog';
import { AddTvDialogComponent } from './add-tv-dialog/add-tv-dialog.component';
import { EditTvDialogComponent } from './edit-tv-dialog/edit-tv-dialog.component';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-tv',
  templateUrl: './tv.component.html',
  styleUrl: './tv.component.sass',
  animations: [
    trigger('changeState', [
      state('expand_circle_down', style({
        transform: 'scale(1.0)'
      })),
      state('radio_button_unchecked', style({
        transform: 'scale(0.5)'
      })),
      transition('*=>expand_circle_down', animate('200ms')),
      transition('*=>radio_button_unchecked', animate('200ms'))
    ])
  ]
})
export class TvComponent {
  data: any
  loaded: boolean = false
  isMoviePage: boolean = true
  constructor(
    private supabaseService: SupabaseService,
    public dialog: MatDialog
  ) { }

  async ngOnInit() {
    this.isMoviePage = window.location.pathname.includes('movies')
    this.data = this.isMoviePage ? await this.supabaseService.getMovies() : await this.supabaseService.getSeries()
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
    if (sortBy === 'liked') {
      this.data.reverse()
    }
  }

  toggleSeen(tvData: any) {
    tvData.seen = !tvData.seen
    this.supabaseService.updateTv(tvData, this.isMoviePage)
  }

  toggleLike(tvData: any) {
    tvData.liked = !tvData.liked
    this.supabaseService.updateTv(tvData, this.isMoviePage)
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddTvDialogComponent);

    dialogRef.afterClosed().subscribe(async result => {
        this.loaded = false
        this.ngOnInit()
    });
  }

  getBackgroundImage(tvData: any): string {
    let imdbId = tvData.imdb_id;
    
    return `url('https://img.omdbapi.com/?apikey=${environment.OMDB_API_KEY}&i=${imdbId}&h=600')`
  }

  openEditDialog(tvData: any): void {
    const dialogRef = this.dialog.open(EditTvDialogComponent, {
      data: tvData
    });

    dialogRef.afterClosed().subscribe(async result => {
      this.loaded = false
      this.ngOnInit()
    });
  }
}
