import { Coordinate } from './coordinate';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { latLng, LeafletMouseEvent, marker, Marker, tileLayer } from 'leaflet';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  @Output()
  onSelectedLocation = new EventEmitter<Coordinate>();
  constructor() {}

  ngOnInit(): void {}

  options = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 150,
        attribution: 'ngmovies',
      }),
    ],
    zoom: 18,
    center: latLng(28.3949, 84.124),
  };
  layers: Marker<any>[] = [];

  handleMapClick(event: LeafletMouseEvent) {
    const latittude = event.latlng.lat;
    const longitude = event.latlng.lng;
    console.log({ latittude, longitude });
    this.layers = [];
    this.layers.push(marker([latittude, longitude]));
    this.onSelectedLocation.emit({ longitude, latittude });
  }
}
