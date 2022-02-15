import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { GenresService } from 'src/app/genres/genres.service';
import { movieDto } from './../movie.molde';
import { GenreDto } from 'src/app/genres/genre.model';
import { MoviesService } from './../movies.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';
import { Location } from '@angular/common';

@Component({
  selector: 'app-movie-filter',
  templateUrl: './movie-filter.component.html',
  styleUrls: ['./movie-filter.component.css'],
})
export class MovieFilterComponent implements OnInit {
  filterForm: FormGroup | any;
  genres: GenreDto[] | any;

  movies: movieDto[] | any;

  perPage = 10;

  initialFormValue: any;

  currentPage = 1;
  limit:any;


  constructor(private fb: FormBuilder, private activatedRouter: ActivatedRoute, private movieService: MoviesService, private genreService: GenresService, private location: Location) { }

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      name: '',
      genreId: '',
      upcomings: false,
      inTheater: false,
    });

    this.initialFormValue = this.filterForm.value;
    this.readParamsFromUrl();

    
    this.genreService.getGenres().subscribe((genres: any) => {
      this.genres = genres;

      this.filterMovies(this.filterForm.value);
      this.filterForm.valueChanges.subscribe((values: any) => {
        console.log(values);

        this.filterMovies(values);
        this.writeParamsInUrl();
      });
      
    })
    
  }

  clearForm() {
    this.filterForm.patchValue(this.initialFormValue);
  }


  private readParamsFromUrl()
  {
    this.activatedRouter.queryParams.subscribe((params: any) => {
      var obj:any = {};
      if (params.name) {
        obj.name = params.name;
      }
      if (params.genreId) {
        obj.genreId = Number(params.genreId);
      }
      if (params.upcomings) {
        obj.upcomings = params.upcomings;
      }

      if (params.inTheater) {
        obj.inTheater = params.inTheater;
      }

      if (params.perPage) {
        this.perPage = params.perPage;
      }
      this.filterForm.patchValue(obj);
    })
}
  private writeParamsInUrl() {
    const queryStrings = [];

    const formValues = this.filterForm.value;

    if (formValues.name){
      queryStrings.push(`name=${formValues.name}`);
    }

    if (formValues.genreId != '0'){
      queryStrings.push(`genreId=${formValues.genreId}`);
    }

    if (formValues.upcomings){
      queryStrings.push(`upcomings=${formValues.upcomings}`);
    }

    if (formValues.inTheaters){
      queryStrings.push(`inTheaters=${formValues.inTheaters}`);
    }

    queryStrings.push(`page=${this.currentPage}`);
    queryStrings.push(`perPage=${this.perPage}`);

    this.location.replaceState('movies/filter', queryStrings.join('&'));
      
  }

  paginatorUpdate(event:PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.perPage = event.pageSize;
    this.writeParamsInUrl();
    this.filterMovies(this.filterForm.value);
  }

  onDelete() {
    this.filterMovies(this.filterForm.value);
  }

  
  filterMovies(values: any) {
    values.page = this.currentPage;
    values.perPage = this.perPage;

    this.movieService.filter(values).subscribe((response: HttpResponse<movieDto[]> | any) => {
      this.movies = response.body;
      this.limit = response.headers.get("perPage");
    })
  }

  
}
