import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActorModel } from '../actor.model';
import { ActorsService } from '../actors.service';

@Component({
  selector: 'app-create-actor',
  templateUrl: './create-actor.component.html',
  styleUrls: ['./create-actor.component.css'],
})
export class CreateActorComponent implements OnInit {
  constructor(private actorService: ActorsService, private router: Router) {}

  ngOnInit(): void {}

  savechanges(actor: ActorModel) {
    this.actorService.create(actor).subscribe((x) => {
      console.log(x);
      this.router.navigate(['/actors']);
    });
    console.log(actor);
  }
}
