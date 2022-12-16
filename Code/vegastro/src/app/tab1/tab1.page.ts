import { Component } from '@angular/core';
import * as L from 'leaflet';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  map: L.Map | undefined;
  // langitude: number = 0;
  // altitude: number = 0;
  constructor(protected platform: Platform, private geolocation: Geolocation) {          
   }
  ngOnInit() {
    //Generate Start map   
    this.map = L.map('map', {
      center: [48.30694, 14.28583],
      zoom: 12,
      renderer: L.canvas(),
    });

    //Get Position of User
    this.getGeoLocation();

    //Define Icon
    var greenIcon = L.icon({
      iconUrl: '../../assets/icon/zipfel.png',

      iconSize: [50, 50], // size of the icon
      // shadowSize: [50, 64], // size of the shadow
      // iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
      // shadowAnchor: [4, 62],  // the same for the shadow
      // popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
    });

    //Inserts (Optional)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© Vegastro',
    }).addTo(this.map);

    setTimeout(() => {
      this.map?.invalidateSize();
    }, 0);

    //Place Marker on Map
    L.marker([51.5, -0.09], { icon: greenIcon })
      .addTo(this.map)
      .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
      .openPopup();

      
  }

  

  //Get Location of User
  getGeoLocation() {
    this.geolocation
      .getCurrentPosition()
      .then((resp) => {
        //return [resp.coords.latitude, resp.coords.longitude]
        console.log(resp.coords.latitude, resp.coords.longitude);
        
        this.map?.panTo(
          new L.LatLng(resp.coords.latitude, resp.coords.longitude)
        );

        
      })
      .catch((error) => {
        console.log('Error getting location', error);
      });

    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      // data can be a set of coordinates, or an error (if an error occurred).
      // data.coords.latitude
      // data.coords.longitude
    });
  }
}
