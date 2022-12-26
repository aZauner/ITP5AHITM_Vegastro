import { Component } from '@angular/core';
import * as L from 'leaflet';
import { Geolocation, Geoposition } from '@awesome-cordova-plugins/geolocation/ngx';
import { Platform } from '@ionic/angular';
import { Coordinates } from '@awesome-cordova-plugins/geolocation';
import { AbstractFormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  address: string = "";
  map!: L.Map;
  greenIcon: L.Icon = L.icon({
    iconUrl: '../../assets/icon/zipfel.png',

    iconSize: [50, 50], // size of the icon
  });
  // langitude: number = 0;
  // altitude: number = 0;
  constructor(protected platform: Platform, private geolocation: Geolocation) {
  }
  ngOnInit() {
    //Define Icon


    //Generate Start map
    this.geolocation.getCurrentPosition().then((resp) => {
      this.map = L.map('map', {
        center: [resp.coords.latitude, resp.coords.longitude],
        zoom: 12,
        renderer: L.canvas(),
      });
      L.circleMarker([resp.coords.latitude, resp.coords.longitude]).addTo(this.map);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© Vegastro',
      }).addTo(this.map);

      setTimeout(() => {
        this.map.invalidateSize();
      }, 0);
      this.addMarker(48.0349017, 13.7643518, this.greenIcon);
    });
    //Get Position of User
    //this.setMapToUserLocation();

  }

  // //Get Location of User
  setMapToUserLocation() {
    this.geolocation
      .getCurrentPosition()
      .then((resp) => {
        this.map.panTo([resp.coords.latitude, resp.coords.longitude]);
        L.circleMarker([resp.coords.latitude, resp.coords.longitude]).addTo(this.map)
      })
      .catch((error) => {
        console.log('Error getting location', error);
      });
  }

  addMarker(latitude: number, longitude: number, icon: L.Icon) {
    L.marker([latitude, longitude], { icon: icon }).addTo(this.map);
  }

  addressSearch(enter: Boolean, index?: number) {
    setTimeout(()=>{
      this.addrSearch((data: any) => {
        if(document.getElementById("searchbarResultList") != null) {
          document.getElementById("searchbarResultList")?.remove();
        }      
        if (data.length > 0) {
          if(enter) {
            this.map.panTo([parseFloat(data[0].lat), parseFloat(data[0].lon)]);
          } else if (index != undefined && index != null) {
            this.map.panTo([parseFloat(data[index].lat),parseFloat(data[index].lon)]);
          } else {
            let list = document.createElement("ion-list");
            for(let i = 0; i < data.length; i++) {
              let item = document.createElement("ion-item");
              let label = document.createElement("p");
              let text = data[i].display_name;
              if(text <= 30) {
                label.innerText = text;
              } else {
                label.innerText = text.slice(0,30) + "...";
              }
              item.appendChild(label);
              item.addEventListener('click', ()=>{this.addressSearch(true,i)});
              list?.appendChild(item);
            }
            list.id = "searchbarResultList";
            document.getElementById("searchbar")?.appendChild(list);
          }
        }
      }, this.address);
    }, 250);
    
  }

  addrSearch(callback: Function, address: string) {
    var xmlhttp = new XMLHttpRequest();
    var url = "https://nominatim.openstreetmap.org/search?format=json&limit=3&q=" + address;
    xmlhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        var arr = JSON.parse(this.responseText);
        callback(arr);
      }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
  }


}
