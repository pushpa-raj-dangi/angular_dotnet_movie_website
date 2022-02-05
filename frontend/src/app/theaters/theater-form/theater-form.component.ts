import { Coordinate } from './../../utils/map/coordinate';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-theater-form',
  templateUrl: './theater-form.component.html',
  styleUrls: ['./theater-form.component.css'],
})
export class TheaterFormComponent implements OnInit {
  theaterForm: FormGroup | any;
  @Input()
  theater: any;
  @Output()
  onSaveChangs = new EventEmitter<any>();
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.theaterForm = this.fb.group({
      name: ['', Validators.required],
      longitude: ['', Validators.required],
      lattitude: ['', Validators.required],
    });

    if (this.theater !== undefined) {
      this.theaterForm.patchValue(this.theater);
    }
  }
  saveChanges() {
    this.onSaveChangs.emit(this.theaterForm.value);
  }

  changeMarkDown(theater: any) {}

  selectedLocation(coordinate:Coordinate){
    this.theaterForm.patchValue(coordinate);
  }
}
