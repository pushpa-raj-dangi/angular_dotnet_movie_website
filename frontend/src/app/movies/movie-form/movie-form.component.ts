import { ActorsMovieDto } from './../../actors/actor.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MultiSelector } from 'src/app/utils/custom-selector/multi-selector.model';
import { MovieCreateDto } from '../movie.molde';

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.css'],
})
export class MovieFormComponent implements OnInit {
  @Output()
  saveMovies:EventEmitter<MovieCreateDto> = new EventEmitter<MovieCreateDto>();

  @Input()
  title: any;
  @Input()
  movie: MovieCreateDto | any;

  movieForm: FormGroup | any;

  @Input()
  nonSelectedGenres: MultiSelector[] = [];


  @Input()
  nonSelectedTheaters: MultiSelector[] = [];


  @Input()
  selectedActor: ActorsMovieDto[] | any = [];
  

  @Input()
  selectedGenres: MultiSelector[] = [];
  @Input()
  selectedTheaters: MultiSelector[] = [];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.movieForm = this.fb.group({
      name: ['', Validators.required],
      summary: '',
      inTheater: false,
      trailer: '',
      releaseDate: '',
      poster: '',
      genresIds: '',
      theatersIds: '',
      actors:''
    });
    if (this.movie !== undefined) {
      this.movieForm.patchValue(this.movie);
    }
  }
  
  saveMovieChanges() {
    const ids = this.selectedGenres.map((x) => x.key);
    const mids = this.selectedTheaters.map((x) => x.key);
    this.movieForm.get('genresIds').patchValue(ids);
    this.movieForm.get('theatersIds').patchValue(mids);

    const actors = this.selectedActor.map((val: any) => {
      return { id: val.id, character: val.character };
    });

    this.movieForm.get('actors').patchValue(actors);
    this.saveMovies.emit(this.movieForm.value);
  }

  onImageSelected(image: any) {
    console.log(image);

    this.movieForm.get('poster').patchValue(image);
  }

  changeMarkDown(markdownText: any) {
    this.movieForm.get('summary').patchValue(markdownText);
  }
}
