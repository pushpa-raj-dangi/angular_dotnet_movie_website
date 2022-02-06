import { GenresService } from './../genres.service';
import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { firstLetterCapital } from 'src/app/validators/firstLetterCapital';
import { GenreDto } from '../genre.model';

@Component({
  selector: 'app-create-genre',
  templateUrl: './create-genre.component.html',
  styleUrls: ['./create-genre.component.css'],
})
export class CreateGenreComponent implements OnInit {
  constructor(private router: Router, private genreService:GenresService) {}

  ngOnInit(): void {}

  savechanges(genreCreate: GenreDto) {

    this.genreService.createGenre(genreCreate).subscribe(()=>{
      this.router.navigate(['/genres']);
    },error=>{
      console.log(error.error);

    });


  }
}
