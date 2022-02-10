import { ActivatedRoute, Router } from '@angular/router';
import { ActorsService } from './../actors.service';
import { Component, OnInit } from '@angular/core';
import { ActorDto, ActorModel } from '../actor.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-actor',
  templateUrl: './edit-actor.component.html',
  styleUrls: ['./edit-actor.component.css'],
})
export class EditActorComponent implements OnInit {
  model: ActorDto | any;
  constructor(
    private actorService: ActorsService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.activateRoute.params.subscribe((x) => {
      this.actorService
        .getById(x['id'])
        .subscribe((response) => (this.model = response));
    });
  }

  saveChanges(actor: ActorModel) {
    this.actorService.edit(this.model.id, actor).subscribe(() => {
      this._snackBar.open('Success', 'close', {
        duration: 5,
      });
      this.router.navigate(['/actors']);
    });
  }
}
