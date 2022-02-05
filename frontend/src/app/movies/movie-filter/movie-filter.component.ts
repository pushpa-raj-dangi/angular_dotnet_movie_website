import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-movie-filter',
  templateUrl: './movie-filter.component.html',
  styleUrls: ['./movie-filter.component.css'],
})
export class MovieFilterComponent implements OnInit {
  filterForm: FormGroup | any;
  genres = [
    { id: 1, title: 'Drama' },
    { id: 2, title: 'Comedy' },
    { id: 3, title: 'Scifi' },
  ];

  movies = [
    {
      id: 1,
      name: 'movie1',
      image:
        'https://media.services.cinergy.ch/media/cinemanteaser174x240/af96a6ea858dd5fba7feb1e41ee2f8d30d804a57.jpg',
    },
    {
      id: 2,
      name: 'movie2',
      image:
        'https://media.services.cinergy.ch/media/cinemanteaser174x240/af96a6ea858dd5fba7feb1e41ee2f8d30d804a57.jpg',
    },
    {
      id: 3,
      name: 'movie3',
      image:
        'https://media.services.cinergy.ch/media/cinemanteaser174x240/af96a6ea858dd5fba7feb1e41ee2f8d30d804a57.jpg',
    },
    {
      id: 4,
      name: 'movie4',
      image:
        'https://media.services.cinergy.ch/media/cinemanteaser174x240/af96a6ea858dd5fba7feb1e41ee2f8d30d804a57.jpg',
    },
    {
      id: 5,
      name: 'movie5',
      image:
        'https://media.services.cinergy.ch/media/cinemanteaser174x240/af96a6ea858dd5fba7feb1e41ee2f8d30d804a57.jpg',
    },
    {
      id: 6,
      name: 'movie6',
      image:
        'https://media.services.cinergy.ch/media/cinemanteaser174x240/af96a6ea858dd5fba7feb1e41ee2f8d30d804a57.jpg',
    },
    {
      id: 7,
      name: 'movie7',
      image:
        'https://media.services.cinergy.ch/media/cinemanteaser174x240/af96a6ea858dd5fba7feb1e41ee2f8d30d804a57.jpg',
    },
    {
      id: 8,
      name: 'movie8',
      image:
        'https://media.services.cinergy.ch/media/cinemanteaser174x240/af96a6ea858dd5fba7feb1e41ee2f8d30d804a57.jpg',
    },
  ];

  originalMovies = this.movies;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      title: '',
      genreId: '',
      upcoming: false,
      inTheater: false,
    });

    this.filterForm.valueChanges.subscribe((values: any) => {
      console.log(values);

      this.movies = this.originalMovies;
      this.filterMovies(values);
    });
  }

  clearForm() {
    this.filterForm.reset();
  }

  filterMovies(values: any) {
    if (values.title) {
      this.movies = this.movies.filter(
        (m) => m.name.indexOf(values.title) !== -1
      );
    }
  }
}
