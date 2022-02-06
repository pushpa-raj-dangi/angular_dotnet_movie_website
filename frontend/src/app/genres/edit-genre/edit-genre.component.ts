import { Router, ActivatedRoute } from '@angular/router';
import { GenresService } from './../genres.service';
import { Component, OnInit, Output } from '@angular/core';
import { GenreDto, GenreGetDto } from '../genre.model';

@Component({
  selector: 'app-edit-genre',
  templateUrl: './edit-genre.component.html',
  styleUrls: ['./edit-genre.component.css'],
})
export class EditGenreComponent implements OnInit {

  model: GenreGetDto | any;

  id:number | any;

  constructor(private genreService:GenresService, private router:ActivatedRoute) {}

  ngOnInit(): void {
    this.router.params.subscribe(x=>{this.id = x["id"]});
    this.genreService.getGenre(this.id).subscribe(x=>{
     this.model = x;
     console.log(this.model);

    })
  }

  saveChanges(genre: GenreDto) {
    console.log(genre);
  }
}
