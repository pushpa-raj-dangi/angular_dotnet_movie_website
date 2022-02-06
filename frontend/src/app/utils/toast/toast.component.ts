import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CreateGenreComponent } from 'src/app/genres/create-genre/create-genre.component';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css'],
})
export class ToastComponent implements OnInit {
  @Input()
  error: any;
  durationInSeconds = 5;

  constructor(private _snackBar: MatSnackBar) {}

  openSnackBar() {
    this._snackBar.openFromComponent(CreateGenreComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }

  ngOnInit(): void {}
}
