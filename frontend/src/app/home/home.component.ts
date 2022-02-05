import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  moviesList:any=[];
  constructor() { }

  ngOnInit(): void {
    this.moviesList = [
      {id:1,name:"movie1",image:"https://media.services.cinergy.ch/media/cinemanteaser174x240/af96a6ea858dd5fba7feb1e41ee2f8d30d804a57.jpg"},
      {id:2,name:"movie2",image:"https://media.services.cinergy.ch/media/cinemanteaser174x240/af96a6ea858dd5fba7feb1e41ee2f8d30d804a57.jpg"},
      {id:3,name:"movie3",image:"https://media.services.cinergy.ch/media/cinemanteaser174x240/af96a6ea858dd5fba7feb1e41ee2f8d30d804a57.jpg"},
      {id:4,name:"movie4",image:"https://media.services.cinergy.ch/media/cinemanteaser174x240/af96a6ea858dd5fba7feb1e41ee2f8d30d804a57.jpg"},
      {id:5,name:"movie5",image:"https://media.services.cinergy.ch/media/cinemanteaser174x240/af96a6ea858dd5fba7feb1e41ee2f8d30d804a57.jpg"},
      {id:6,name:"movie6",image:"https://media.services.cinergy.ch/media/cinemanteaser174x240/af96a6ea858dd5fba7feb1e41ee2f8d30d804a57.jpg"},
      {id:7,name:"movie7",image:"https://media.services.cinergy.ch/media/cinemanteaser174x240/af96a6ea858dd5fba7feb1e41ee2f8d30d804a57.jpg"},
      {id:8,name:"movie8",image:"https://media.services.cinergy.ch/media/cinemanteaser174x240/af96a6ea858dd5fba7feb1e41ee2f8d30d804a57.jpg"},
    ]
  }

}
