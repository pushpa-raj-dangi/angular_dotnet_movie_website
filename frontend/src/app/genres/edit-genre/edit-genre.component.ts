import { Router, ActivatedRoute } from '@angular/router';
import { GenresService } from './../genres.service';
import { Component, OnInit, Output } from '@angular/core';
import { GenreDto, GenreGetDto } from '../genre.model';

export interface DialogData {
  condition: boolean;
  id: number;
}

@Component({
  selector: 'app-edit-genre',
  templateUrl: './edit-genre.component.html',
  styleUrls: ['./edit-genre.component.css'],
})
export class EditGenreComponent implements OnInit {
  constructor(
    private genreService: GenresService,
    private router: ActivatedRoute,
    private routerN: Router
  ) {}
  gener: GenreGetDto | any;

  ngOnInit(): void {
    this.router.params.subscribe((para: any) => {
      this.genreService.getGenre(para['id']).subscribe((genre: GenreGetDto) => {
        this.gener = genre;
        console.log(this.gener);
      });
    });
  }

  saveChanges(genre: GenreDto) {
    this.genreService.editGenre(this.gener.id, genre).subscribe(() => {
      this.routerN.navigate(['/genres']);
    });
  }
}
