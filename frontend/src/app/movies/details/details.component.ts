import { Coordinate, CoordinateWithMessage } from './../../utils/map/coordinate';
import { movieDto } from './../movie.molde';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { MoviesService } from './../movies.service';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  movie: movieDto | any;
  releaseDate: Date | any;
  trailerUrl: SafeResourceUrl | any;
  cordinates: CoordinateWithMessage[] = [];

  constructor(private movieService: MoviesService, private activatedRouter:ActivatedRoute, private sanitize:DomSanitizer) { }

  ngOnInit(): void {
    this.loadMovies();  
  }

  loadMovies() {
    this.activatedRouter.params.subscribe(params => {
      this.movieService.getById(params['id']).subscribe(data => {
        this.movie = data;
        this.releaseDate = new Date(data.releaseDate);
        this.trailerUrl = this.generateYoutubeUrlEmbeded(data.trailer);
        this.cordinates = data.theaters.map((mt:any )=> {
          return {lattitude:mt.lattitude, longitude:mt.longitude, message:mt.name};
        })
        console.log(data);
        
      });
    }, error => {
      console.log(error);
    })
  }
  
  generateYoutubeUrlEmbeded(trailerUrl: any): any {
    if (!trailerUrl) {
      return "";

    }

    let videoUrl = trailerUrl.split('v=')[1];
    const ampercend = videoUrl.indexOf('&');
    if(ampercend !== -1) {
      videoUrl = videoUrl.substring(0, ampercend);
    }

    return this.sanitize.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${videoUrl}`);
  }

    
}
