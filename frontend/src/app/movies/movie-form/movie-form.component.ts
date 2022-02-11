import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MultiSelector } from 'src/app/utils/custom-selector/multi-selector.model';
import { movieCreateDto } from '../movie.molde';

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.css'],
})
export class MovieFormComponent implements OnInit {
  @Output()
  saveMovies = new EventEmitter<any>();

  @Input()
  movie: movieCreateDto | any;

  movieForm: FormGroup | any;

  @Input()
  nonSelectedGenres: MultiSelector[] = [];
  @Input()
  nonSelectedTheaters: MultiSelector[] = [];

  selectedGenres: MultiSelector[] = [];
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
    });
    if (this.movie !== undefined) {
      this.movieForm.patchValue(this.movie);
    }
  }
  saveChanges() {
    const ids = this.selectedGenres.map((x) => x.key);
    const mids = this.selectedTheaters.map((x) => x.key);
    this.movieForm.get('genresIds').patchValue(ids);
    this.movieForm.get('theatersIds').patchValue(mids);
    this.saveMovies.emit(this.movieForm.value);
    console.log(this.movieForm.value);
  }

  onImageSelected(image: any) {
    console.log(image);

    this.movieForm.get('poster').patchValue(image);
  }

  changeMarkDown(markdownText: any) {
    this.movieForm.get('summary').patchValue(markdownText);
  }
}
