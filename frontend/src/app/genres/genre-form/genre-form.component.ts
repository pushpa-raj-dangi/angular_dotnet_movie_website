import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { firstLetterCapital } from 'src/app/validators/firstLetterCapital';
import { GenreDto } from '../genre.model';

@Component({
  selector: 'app-genre-form',
  templateUrl: './genre-form.component.html',
  styleUrls: ['./genre-form.component.css'],
})
export class GenreFormComponent implements OnInit {
  @Output()
  onSaveChanges: EventEmitter<GenreDto> = new EventEmitter<GenreDto>();
  @Input()
  model: GenreDto | any;
  constructor(private router: Router, private formBuilder: FormBuilder) {}

  form: FormGroup | any;
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: [
        '',
        [Validators.required, Validators.minLength(3)],
      ],
    });

    if (this.model !== undefined) {
      this.form.patchValue(this.model);
    }
  }

  savechanges() {
    this.onSaveChanges.emit(this.form.value);
  }

  getErrorMessage() {
    const field = this.form.get('name');
    if (field.hasError('required')) {
      return 'Name field is required';
    }
    if (field.hasError('minlength')) {
      return 'Name should have minimum length 3';
    }

    if (field.hasError('firstLetterCapital')) {
      return 'Fiirst letter uppercase';
    }
    return '';
  }
}
