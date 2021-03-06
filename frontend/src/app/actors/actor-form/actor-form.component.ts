import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActorDto, ActorModel } from '../actor.model';

@Component({
  selector: 'app-actor-form',
  templateUrl: './actor-form.component.html',
  styleUrls: ['./actor-form.component.css'],
})
export class ActorFormComponent implements OnInit {
  @Input()
  actor: any;

  @Input()
  title: any;

  @Input()
  markdownContent: any;

  actorForm: FormGroup | any;

  @Output()
  onSaveChanges = new EventEmitter<ActorModel>();
  constructor(private fb: FormBuilder) {
    console.log(this.actor);
  }

  ngOnInit(): void {
    this.actorForm = this.fb.group({
      name: ['', Validators.required],
      dateOfBirth: '',
      image: '',
      biography: '',
    });
    if (this.actor !== undefined) {
      this.actorForm.patchValue(this.actor);
    }
    console.log('you ', this.actor);
  }

  onImageSelected(image: any) {
    console.log(image);

    this.actorForm.get('image').patchValue(image);
  }
  changeMarkDown(content: any) {
    this.actorForm.get('biography').patchValue(content);
  }

  saveChanges() {
    this.onSaveChanges.emit(this.actorForm.value);
  }
}
