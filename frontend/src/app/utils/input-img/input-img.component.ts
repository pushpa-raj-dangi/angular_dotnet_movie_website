import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { toBase64 } from '../utils';

@Component({
  selector: 'app-input-img',
  templateUrl: './input-img.component.html',
  styleUrls: ['./input-img.component.css'],
})
export class InputImgComponent implements OnInit {
  imageBase64: string | any;

  @Input()
  currentImage: string | any;

  @Output()
  onImageSelected = new EventEmitter<File>();

  ngOnInit(): void {}

  change(event: any) {
    if (event.target.files.length > 0) {
      const file: File = event.target.files[0];
      toBase64(file).then((value: any) => (this.imageBase64 = value));
      this.onImageSelected.emit(file);
      this.currentImage = null;
    }
  }
}
