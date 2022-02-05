import { Component, OnInit } from '@angular/core';
import { ActorDto, ActorModel } from '../actor.model';

@Component({
  selector: 'app-edit-actor',
  templateUrl: './edit-actor.component.html',
  styleUrls: ['./edit-actor.component.css'],
})
export class EditActorComponent implements OnInit {
  constructor() {}

  actor: ActorDto = {
    name: 'ram',
    dateOfBirth: new Date(),
    image:
      'https://media.services.cinergy.ch/media/cinemanteaser174x240/af96a6ea858dd5fba7feb1e41ee2f8d30d804a57.jpg',
    biography: 'this is biography.',
  };
  ngOnInit(): void {}

  saveChanges(actor: ActorModel) {
    console.log(actor);
  }
}
