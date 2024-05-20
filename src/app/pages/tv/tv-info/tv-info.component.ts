import { Component, Input, ElementRef, HostListener } from '@angular/core';
import { environment } from '../../../environments/environment';
import { SupabaseService } from '../../../services/supabase.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-tv-info',
  templateUrl: './tv-info.component.html',
  styleUrl: './tv-info.component.sass',
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
export class TvInfoComponent {
  isMovie: boolean = true;
  isExpanded: boolean = false;
  isDeleted: boolean = false;
  @Input() item: any = null;
  info: any = null;

  constructor(
    private supabaseService: SupabaseService,
    private elementRef: ElementRef
  ){};

  async ngOnInit() {
    fetch(`https://www.omdbapi.com/?apikey=${environment.OMDB_API_KEY}&i=${this.item.imdb_id}`)
      .then(response => response.json())
      .then(data => {
        this.info = data;
        if (this.elementRef) {
          this.elementRef.nativeElement.style.backgroundImage = `url(${this.getBackgroundImage()})`;
        }
      });
    this.isMovie = window.location.pathname.includes('movies');
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const clickedInside = this.elementRef.nativeElement.contains(event.target);
    if (!clickedInside && this.isExpanded) {
      this.isExpanded = false;
    }
  }

  toggleExpanded() {
    this.isExpanded = !this.isExpanded;
  }

  toggleSeen(tvData: any) {
    tvData.seen = !tvData.seen
    this.supabaseService.updateTv(tvData, this.isMovie)
  }

  toggleLike(tvData: any) {
    tvData.liked = !tvData.liked
    this.supabaseService.updateTv(tvData, this.isMovie)
  }

  deleteTv(tvData: any) {
    if (confirm('Are you sure you want to delete ' + tvData.title + '?')) {
      this.supabaseService.deleteTv(tvData, this.isMovie);
      this.isDeleted = true;
    }
  }

  getBackgroundImage(): string {
    return this.info.Poster;
  }
}
