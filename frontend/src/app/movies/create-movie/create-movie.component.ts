import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MoviesService } from './../movies.service';
import { Component, Input, OnInit } from '@angular/core';
import { MovieCreateDto } from '../movie.molde';
import { MultiSelector } from 'src/app/utils/custom-selector/multi-selector.model';
import { ActorsMovieDto } from 'src/app/actors/actor.model';

@Component({
  selector: 'app-create-movie',
  templateUrl: './create-movie.component.html',
  styleUrls: ['./create-movie.component.css'],
})
export class CreateMovieComponent implements OnInit {
  @Input()
  movie: MovieCreateDto | any;

  selectedActor: ActorsMovieDto[] | any;
  noSelectedGenres:MultiSelector[] | any;
  noSelectedTheaters:MultiSelector[] | any;

  constructor(private movieService: MoviesService, private snackbar: MatSnackBar, private router: Router
  ) { }

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

  saveChanges(movie: MovieCreateDto) {
    console.log(movie);

    this.movieService.create(movie).subscribe(x => {
      this.snackbar.open('Movie created successfully', 'close', {
        duration: 2000,
      });
      this.router.navigate(['/movies']);
    }, error => {
      this.snackbar.open(error.error.message, 'close', { duration: 3000 });
    });
  }
}
