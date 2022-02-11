import { MatSnackBar } from '@angular/material/snack-bar';
import { Theater } from './../theater.model';
import { ActivatedRoute, Router } from '@angular/router';
import { TheatersService } from './../theaters.service';
import { Component, OnInit } from '@angular/core';
import { TheaterCreateDto } from '../theater-create-dto';

@Component({
  selector: 'app-edit-theater',
  templateUrl: './edit-theater.component.html',
  styleUrls: ['./edit-theater.component.css'],
})
export class EditTheaterComponent implements OnInit {
  constructor(private theaterService:TheatersService, private route:Router, private router:ActivatedRoute, private snack:MatSnackBar) {}

  theater :  any;
  ngOnInit(): void {

    this.router.params.subscribe(params => {
      this.theaterService.getTheater(params['id']).subscribe(data => {
        this.theater = data;
      })
    })

  }
  saveChanges(theater: TheaterCreateDto) {
    console.log(theater);
    
    this.theaterService.updateTheater(this.theater.id,theater).subscribe(()=>{
      this.snack.open('Theater updated successfully', 'OK', { duration: 2000 });
      this.route.navigate(['/theaters']);
    }, error => {
     this.snack.open('Error updating theater', 'OK', {duration: 2000}); 
    }
      ); 
  }
}
