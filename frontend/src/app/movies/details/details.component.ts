import { movieDto } from './../movie.molde';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { MoviesService } from './../movies.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  movie: movieDto | any;
  constructor(private movieService: MoviesService, private activatedRouter:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRouter.params.subscribe((params:any) => {
      this.movieService.getById(params['id']).subscribe((movie:any) => {
        this.movie = movie;
      });
    }
  }

}
