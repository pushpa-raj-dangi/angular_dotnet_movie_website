import { Coordinate } from './../../utils/map/coordinate';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TheaterCreateDto } from '../theater-create-dto';

@Component({
  selector: 'app-theater-form',
  templateUrl: './theater-form.component.html',
  styleUrls: ['./theater-form.component.css'],
})
export class TheaterFormComponent implements OnInit {
  theaterForm: FormGroup | any;
  @Input()
  model: TheaterCreateDto | any;
  @Output()
  onSaveChangs = new EventEmitter<any>();
  initialCoordinates: Coordinate[] = [];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.theaterForm = this.fb.group({
      name: ['', Validators.required],
      longitude: ['', Validators.required],
      lattitude: ['', Validators.required],
    });

    if (this.model !== undefined) {
      this.theaterForm.patchValue(this.model);
      this.initialCoordinates.push({lattitude: this.model.lattitude, longitude: this.model.longitude});
    }
  }
  saveChanges() {
    this.onSaveChangs.emit(this.theaterForm.value);
  }

  selectedLocation(coordinate:Coordinate){
    this.theaterForm.patchValue(coordinate);
  }
}
