import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-errors',
  templateUrl: './errors.component.html',
  styleUrls: ['./errors.component.css']
})
export class ErrorsComponent implements OnInit {

  @Input()
  errors:string[] = [];
  constructor(private snack:MatSnackBar) { }

  ngOnInit(): void {
    this.errors.forEach(error => {
      this.snack.open(error, '', {
        duration: 2000,
      });
    });
  }

}
