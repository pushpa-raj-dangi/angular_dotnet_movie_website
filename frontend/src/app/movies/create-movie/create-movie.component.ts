import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { movieCreateDto } from '../movie.molde';

@Component({
  selector: 'app-create-movie',
  templateUrl: './create-movie.component.html',
  styleUrls: ['./create-movie.component.css'],
})
export class CreateMovieComponent implements OnInit {
  @Input()
  movie: movieCreateDto | any;
  constructor() {}

  ngOnInit(): void {}

  saveChanges(movie: movieCreateDto) {
    console.log(movie);
  }
}
