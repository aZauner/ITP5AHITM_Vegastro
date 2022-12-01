import { Component } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page {
  map: L.Map | undefined;

  constructor() {}

  ngOnInit() {
    this.map = L.map('map', {
      center: [48.30694, 14.28583],
      zoom: 9,
      renderer: L.canvas(),
    });

    var greenIcon = L.icon({
        iconUrl: '../../assets/icon/zipfel.png',        

        iconSize: [50, 50], // size of the icon
        // shadowSize: [50, 64], // size of the shadow
        // iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
        // shadowAnchor: [4, 62],  // the same for the shadow
        // popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap',
    }).addTo(this.map);

    setTimeout(() => {
        this.map?.invalidateSize();
      }, 0);

      L.marker([51.5, -0.09], {icon: greenIcon}).addTo(this.map)
      .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
      .openPopup();
  }
}
