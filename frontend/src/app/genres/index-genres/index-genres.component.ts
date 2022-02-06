import { GenreGetDto } from './../genre.model';
import { GenreDto } from 'src/app/genres/genre.model';
import { GenresService } from './../genres.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index-genres',
  templateUrl: './index-genres.component.html',
  styleUrls: ['./index-genres.component.css']
})
export class IndexGenresComponent implements OnInit {

  genres:GenreGetDto[] | any;
  constructor(private genreSevice:GenresService) { }

  ngOnInit(): void {
    this.genreSevice.getGenres().subscribe(x=>this.genres = x);
  }

}
