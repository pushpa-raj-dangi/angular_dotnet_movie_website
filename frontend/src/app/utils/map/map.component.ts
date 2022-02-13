import { Coordinate, CoordinateWithMessage } from './coordinate';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { icon, latLng, LeafletMouseEvent, marker, Marker, tileLayer } from 'leaflet';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  @Output()
  onSelectedLocation = new EventEmitter<Coordinate>();
  constructor() {}

  ngOnInit(): void {
    this.layers = this.initialCoordinates.map((value) => {
      const m = marker([value.lattitude, value.longitude]);
      if (value.message){
        m.bindPopup(value.message, {autoClose: false, autoPan: false});
      }
      return m;
    });
  }

  @Input()
  initialCoordinates: any[] = [];


  @Input()
  editMode: boolean = true;

  options = {
    layers: [
      
      
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }),
    ],
    zoom: 10,
    center: latLng(28.3949, 84.124),
  };
  layers: Marker<any>[] = [];

  

  handleMapClick(event: LeafletMouseEvent) {
     if (this.editMode){
      const lattitude = event.latlng.lat;
      const longitude = event.latlng.lng;
      console.log({ lattitude, longitude });
      this.layers = [];
      this.layers.push(marker([lattitude, longitude]));
      this.onSelectedLocation.emit({ lattitude, longitude });
    }
  }
}
