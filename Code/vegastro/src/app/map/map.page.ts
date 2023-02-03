import { Component } from '@angular/core';
import * as L from 'leaflet';
import {
  Geolocation,
  Geoposition,
} from '@awesome-cordova-plugins/geolocation/ngx';
import { Platform } from '@ionic/angular';
import axios from 'axios';

@Component({
  selector: 'map',
  templateUrl: 'map.page.html',
  styleUrls: ['map.page.scss'],
})
export class MapPage {  
  address: string = '';
  userLocation: { lat: number; lon: number } = { lat: 0, lon: 0 };
  userMarker!: L.CircleMarker;
  static map: L.Map;
  defaultMarker: L.Icon = L.icon({
    iconUrl: '../../assets/MarkerPoint3.svg',
    iconSize: [22, 22], // size of the icon
  });
  currentNorthEastLat: number = 0;
  currentNorthEastLon: number = 0;
  currentSouthWestLat: number = 0;
  currentSouthWestLon: number = 0;
  activeMarkers : L.Marker[] = [];
  constructor(protected platform: Platform, private geolocation: Geolocation) {}
  ngOnInit() {
    //Generate Start map
    this.geolocation.getCurrentPosition().then((resp) => {
      this.userLocation = {
        lat: resp.coords.latitude,
        lon: resp.coords.longitude,
      };
      MapPage.map = L.map('map', {
        center: [resp.coords.latitude, resp.coords.longitude],
        zoom: 15,
        renderer: L.canvas(),
      });
      this.userMarker = L.circleMarker([
        resp.coords.latitude,
        resp.coords.longitude,
      ]).addTo(MapPage.map);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© Vegastro',
      }).addTo(MapPage.map);

      setTimeout(() => {
        MapPage.map.invalidateSize();
      }, 0);
      this.updateMarkers();
    });

    setInterval(() => {
      this.geolocation.getCurrentPosition().then((resp) => {
        this.userLocation = {
          lat: resp.coords.latitude,
          lon: resp.coords.longitude,
        };
      });
    }, 20000);

    setInterval(() => {
      this.updateMarkers();
    }, 1000);

    
  }

  updateMarkers() {
    const bounds = MapPage.map.getBounds();
    if (
      bounds.getNorthEast().lat != this.currentNorthEastLat ||
      bounds.getNorthEast().lng != this.currentNorthEastLon ||
      bounds.getSouthWest().lat != this.currentSouthWestLat ||
      bounds.getSouthWest().lng != this.currentSouthWestLon
    ) {
      this.currentNorthEastLat = bounds.getNorthEast().lat;
      this.currentNorthEastLon = bounds.getNorthEast().lng;
      this.currentSouthWestLat = bounds.getSouthWest().lat;
      this.currentSouthWestLon = bounds.getSouthWest().lng;
      axios
        .get(
          'http://localhost:3000/restaurant/getNearPosition/' +
            bounds.getNorthEast().lat +
            '/' +
            bounds.getNorthEast().lng +
            '/' +
            bounds.getSouthWest().lat +
            '/' +
            bounds.getSouthWest().lng
        )
        .then((response) => {    
          // console.log(response);

          if (response.data.status != 404) {            
            for(const marker of this.activeMarkers){
              MapPage.map.removeLayer(marker);                          
            }
            this.activeMarkers= [];

            for (const restaurant of response.data) {  
              let marker =  L.marker([restaurant.latitude, restaurant.longitude], { icon: this.defaultMarker }).addTo(MapPage.map); 
              this.activeMarkers.push(marker);
            }
          }
        });
    }
  }

  // //Get Location of User
  setMapToUserLocation() {
    MapPage.map.setView([this.userLocation.lat, this.userLocation.lon], 15);
    this.geolocation
      .getCurrentPosition()
      .then((resp) => {
        MapPage.map.setView([resp.coords.latitude, resp.coords.longitude], 15);
        this.userMarker.setLatLng([
          resp.coords.latitude,
          resp.coords.longitude,
        ]);
      })
      .catch((error) => {
        console.log('Error getting location', error);
      });
  }

  addMarker(latitude: number, longitude: number, icon: L.Icon) {
    L.marker([latitude, longitude], { icon: icon }).addTo(MapPage.map);
  }

  addressSearch(enter: Boolean, index?: number) {
    if (document.getElementById('searchbarResultList') != null) {
      document.getElementById('searchbarResultList')?.remove();
    }
    if (document.getElementById('noDataFound') != null) {
      document.getElementById('noDataFound')?.remove();
    }
    if (document.getElementById('searchbarLoading') != null) {
      document.getElementById('searchbarLoading')?.remove();
    }

    let loadingBar = document.createElement('ion-spinner');
    loadingBar.setAttribute('id', 'searchbarLoading');
    loadingBar.style.zIndex = '100';
    loadingBar.style.margin = '0 0 1vh 50vw';
    loadingBar.style.transform = 'translateX(-50%)';
    document.getElementById('searchbar')?.appendChild(loadingBar);

    setTimeout(() => {
      this.addrSearch((data: any) => {
        if (document.getElementById('searchbarLoading') != null) {
          document.getElementById('searchbarLoading')?.remove();
        }
        if (data.length > 0) {
          if (enter) {
            MapPage.map.setView(
              [parseFloat(data[0].lat), parseFloat(data[0].lon)],
              14
            );
          } else if (index != undefined && index != null) {
            MapPage.map.setView(
              [parseFloat(data[index].lat), parseFloat(data[index].lon)],
              14
            );
          } else {
            if (document.getElementById('searchbarResultList') != null) {
              document.getElementById('searchbarResultList')?.remove();
            }
            if (document.getElementById('noDataFound') != null) {
              document.getElementById('noDataFound')?.remove();
            }
            let list = document.createElement('ion-list');
            for (let i = 0; i < data.length; i++) {
              if (data[i].class != 'boundary') {
                let item = document.createElement('ion-item');
                let label = document.createElement('p');
                let text = data[i].display_name;
                if (text.length <= 40) {
                  label.innerText = text;
                } else {
                  label.innerText = text.slice(0, 40) + '...';
                }
                item.appendChild(label);
                item.addEventListener('click', () => {
                  this.addressSearch(false, i);
                });
                list?.appendChild(item);
              }
            }
            if (list.innerHTML == '') {
              if (document.getElementById('noDataFound') != null) {
                document.getElementById('noDataFound')?.remove();
              }
              let item = document.createElement('ion-item');
              let label1 = document.createElement('ion-label');
              label1.innerText = 'Keine Treffer gefunden';
              item.appendChild(label1);
              item.id = 'noDataFound';
              item.style.margin = '0 0 1vh 0';
              item.style.width = '100%';
              item.style.textAlign = 'center';
              document.getElementById('searchbar')?.appendChild(item);
            }
            list.id = 'searchbarResultList';
            document.getElementById('searchbar')?.appendChild(list);
          }
        } else if (this.address != '') {
          if (document.getElementById('noDataFound') != null) {
            document.getElementById('noDataFound')?.remove();
          }
          let item = document.createElement('ion-item');
          let label1 = document.createElement('ion-label');
          label1.innerText = 'Keine Treffer gefunden';
          item.appendChild(label1);
          item.id = 'noDataFound';
          item.style.margin = '0 0 1vh 0';
          item.style.width = '100%';
          item.style.textAlign = 'center';
          document.getElementById('searchbar')?.appendChild(item);
        }
      }, this.address);
    }, 250);
  }

  addrSearch(callback: Function, address: string) {
    var xmlhttp = new XMLHttpRequest();
    var url =
      'https://nominatim.openstreetmap.org/search?format=json&limit=3&q=' +
      address;
    xmlhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        var arr = JSON.parse(this.responseText);
        callback(arr);
      }
    };
    xmlhttp.open('GET', url, true);
    xmlhttp.send();
  }

  openFilter() {
    const btn = document.getElementById('filter')!;

    if (btn.style.visibility == 'hidden') {
      btn.style.visibility = 'visible';
    } else {
      btn.style.visibility = 'hidden';
    }
  }



}

