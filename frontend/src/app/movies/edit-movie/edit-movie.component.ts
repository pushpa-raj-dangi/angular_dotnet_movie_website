import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieCreateDto } from '../movie.molde';

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.css'],
})
export class EditMovieComponent implements OnInit {
  id: any;
  @Output()
  movie: MovieCreateDto | any = {
    name: 'name',
    summary: 'summmry',
    inTheater: true,
    trailer: 'trailer.com',
    releaseDate: Date.now,
    poster: 'https://place-hold.it/300x500?text=Poster&fontsize=23',
  };

  constructor(private activatedRouter: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRouter.params.subscribe((x) => {});
  }

  saveMovies(movie: MovieCreateDto) {}
}
