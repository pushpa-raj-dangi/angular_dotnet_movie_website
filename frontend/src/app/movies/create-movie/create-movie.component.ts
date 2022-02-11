import { MoviesService } from './../movies.service';
import { Component, Input, OnInit } from '@angular/core';
import { movieCreateDto } from '../movie.molde';
import { MultiSelector } from 'src/app/utils/custom-selector/multi-selector.model';

@Component({
  selector: 'app-create-movie',
  templateUrl: './create-movie.component.html',
  styleUrls: ['./create-movie.component.css'],
})
export class CreateMovieComponent implements OnInit {
  @Input()
  movie: movieCreateDto | any;

  noSelectedGenres:MultiSelector[] | any;
  noSelectedTheaters:MultiSelector[] | any;

  constructor(private movieService:MoviesService) {}

  ngOnInit(): void {
    this.movieService.postGet().subscribe(x=>{
      console.log(x.genres);
     this.noSelectedGenres = x.genres.map((genre:any)=>{

       return <MultiSelector>{key:genre.id, value:genre.name};
     })

    });

    this.movieService.postGet().subscribe(x=>{
     this.noSelectedTheaters = x.theaters.map((theater:any)=>{
       return <MultiSelector>{key:theater.id, value:theater.name};
     })

    });


  }

  saveChanges(movie: movieCreateDto) {
    console.log(movie);
  }
}
