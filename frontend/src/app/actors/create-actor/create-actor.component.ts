import { Component, OnInit } from '@angular/core';
import { ActorModel } from '../actor.model';

@Component({
  selector: 'app-create-actor',
  templateUrl: './create-actor.component.html',
  styleUrls: ['./create-actor.component.css'],
})
export class CreateActorComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  savechanges(actor: ActorModel) {
    console.log('sdlkfjsldjflsfj');

    console.log(actor);
  }
}
