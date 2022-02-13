import { ActorDto } from './../../actors/actor.model';
import { MultiSelector } from 'src/app/utils/custom-selector/multi-selector.model';
import { movieDto, MoviePutDto } from './../movie.molde';
import { MoviesService } from './../movies.service';
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
  movie: movieDto | any;

  selectedGenres: MultiSelector[] | any;
  nonSelectedGenres: MultiSelector[] | any;

  selectedTheatres: MultiSelector[] | any;
  nonSelectedTheatres: MultiSelector[] | any;

  selectedActors: ActorDto[] | any;


  constructor(private activatedRouter: ActivatedRoute, private movieService:MoviesService) {}

  ngOnInit(): void {
    this.activatedRouter.params.subscribe((x) => {

      this.movieService.putGet(x['id']).subscribe((putGetDto: MoviePutDto) => {
        this.movie = putGetDto.movie;
     

     this.selectedActors = putGetDto.selectedGenre.map((genre:any)=>{
       return <MultiSelector>{key:genre.id, value:genre.name};

     });
        
         this.nonSelectedGenres = putGetDto.nonSelectedGenre.map((genre:any)=>{
       return <MultiSelector>{key:genre.id, value:genre.name};

         });
        
         this.selectedTheatres = putGetDto.selectedTheater.map((genre:any)=>{
       return <MultiSelector>{key:genre.id, value:genre.name};

         });
        
        this.nonSelectedTheatres = putGetDto.nonSelectedGenre.map((genre:any)=>{
       return <MultiSelector>{key:genre.id, value:genre.name};

         });
        
        
        this.selectedActors = putGetDto.actors;


   
    });
    });
  }

  saveMovies(movie: MovieCreateDto) {}
}
