import { HomeDto } from './../movies/movie.molde';
import { MoviesService } from './../movies/movies.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  moviesInTheaters: any;
  upcomingsMovies: any;
  constructor(private movieService:MoviesService) { }

  ngOnInit(): void {
    this.loadMovies();
  }

  onDelete() {
    
  }

  private loadMovies() {
     this.movieService.getAllMovies().subscribe((x: HomeDto) => {
      console.log(x);
      
      this.moviesInTheaters = x.inTheaters;
      this.upcomingsMovies = x.upcomings;
    })
  }
}
