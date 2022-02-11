import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TheatersService } from './../theaters.service';
import { Component, OnInit } from '@angular/core';
import { TheaterCreateDto } from '../theater-create-dto';

@Component({
  selector: 'app-create-theater',
  templateUrl: './create-theater.component.html',
  styleUrls: ['./create-theater.component.css'],
})
export class CreateTheaterComponent implements OnInit {
  constructor(private theaterService:TheatersService,private router:Router, private snack:MatSnackBar) {}

  ngOnInit(): void {}

  saveChanges(theater: TheaterCreateDto) {
    
    this.theaterService.createTheaters(theater).subscribe(() => { 
      this.router.navigate(['/theaters']);
      this.snack.open("Theater created successfully", "close", { duration: 2000 });
    }, error => {
      this.snack.open("Error creating theater", "close", { duration: 2000 });
    });
    console.log(theater);

  }
}
