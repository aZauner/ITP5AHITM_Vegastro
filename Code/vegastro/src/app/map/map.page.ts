import { Component } from '@angular/core';
import * as L from 'leaflet';
import {
  Geolocation,
  Geoposition,
} from '@awesome-cordova-plugins/geolocation/ngx';
import { Platform } from '@ionic/angular';
import axios from 'axios';
import { NavigationExtras, Router } from '@angular/router';

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
  activeMarkers: L.Marker[] = [];
  fixZoomLevel = 14;
  olderZoomLevel = this.fixZoomLevel - 1;
  oldZoomLevel = this.fixZoomLevel;
  static filters: string[] = []

  constructor(protected platform: Platform, private geolocation: Geolocation, private router: Router) { }

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

    const initInterval = setInterval(() => {
      try {
        MapPage.map.on('drag', (e) => {
          this.updateMarkers();
        });
        MapPage.map.on('zoom', (e) => {
          this.updateMarkers();
        });
        MapPage.map.on('move', (e) => {
          this.updateMarkers();
        });
        clearInterval(initInterval);
      } catch { }
    }, 50)

    MapPage.getFavRests();
  }

  getFavRestsMem = MapPage.getFavRests;

  static getFavRests() {
    if (!sessionStorage.getItem('favouriteRestaurants') && sessionStorage.getItem('userToken')) {
      console.log("dodl");
      
      axios.get('http://localhost:3000/user/favourites/' + sessionStorage.getItem('userToken')).then((response) => {
        let favRestaurants = [];
        if (response.data.favouriteRestaurants.length > 0) {
          for (const restaurant of response.data.favouriteRestaurants) {
            favRestaurants.push(restaurant);
          }
        }
        sessionStorage.setItem('favouriteRestaurants', JSON.stringify(favRestaurants))
      })
    }
  }

  updateMarkers() {
    const bounds = MapPage.map.getBounds();
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
        if (response.data.status != 404) {
          for (const marker of this.activeMarkers) {
            MapPage.map.removeLayer(marker);
          }

          this.activeMarkers = [];
          if (MapPage.filters.length > 0) {
            for (const restaurant of response.data) {
              if (MapPage.filters.includes(restaurant.type)) {
                this.addMarker(restaurant);
              }
            }
          } else {
            for (const restaurant of response.data) {
              this.addMarker(restaurant);
            }
          }


          if (this.oldZoomLevel != MapPage.map.getZoom() && this.olderZoomLevel != this.oldZoomLevel) {
            this.olderZoomLevel = this.oldZoomLevel;
            this.oldZoomLevel = MapPage.map.getZoom()
          }
        }
      });

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

  addMarker(restaurant: any) {
    let marker;
    if (MapPage.map.getZoom() == this.fixZoomLevel && this.oldZoomLevel < this.fixZoomLevel) {
      marker = L.marker([restaurant.latitude, restaurant.longitude], {
        icon: new L.DivIcon({
          className: 'my-div-icon',
          html: '<style>@keyframes fadeInAnimation {0% {opacity: 0;}100% {opacity: 1;}}</style><div style="min-width:fit-content;  transform: translate(-47%,-40%);">' +
            '<img style="height: 40px;width: 40px;display:block;margin: auto auto;" src="../../assets/icon/Marker.svg"/>' +
            '<p style="min-width:fit-content;color: black;white-space: nowrap;font-size:2vh;margin-top:0.5vh;font-weight:bold;' +
            'animation: fadeInAnimation ease 500ms; animation-iteration-count: 1; animation-fill-mode: forwards;">' + restaurant.restaurantName + '</p>' +
            '</div>'
        })
      })
    } else if (MapPage.map.getZoom() >= this.fixZoomLevel) {
      marker = L.marker([restaurant.latitude, restaurant.longitude], {
        icon: new L.DivIcon({
          className: 'my-div-icon',
          html: '<div style="min-width:fit-content;  transform: translate(-47%,-40%);">' +
            '<img style="height: 40px;width: 40px;display:block;margin: auto auto;" src="../../assets/icon/Marker.svg"/>' +
            '<p style="min-width:fit-content;color: black;white-space: nowrap;font-size:2vh;margin-top:0.5vh;font-weight:bold;">' + restaurant.restaurantName + '</p>' +
            '</div>'
        })
      })
    } else if (this.oldZoomLevel > this.fixZoomLevel - 1 && MapPage.map.getZoom() == this.fixZoomLevel - 1 && this.olderZoomLevel >= this.fixZoomLevel - 1) {
      marker = L.marker([restaurant.latitude, restaurant.longitude], {
        icon: new L.DivIcon({
          className: 'my-div-icon',
          html: '<style>@keyframes fadeInAnimation {0%{opacity:1;}100%{opacity:0}}</style>' +
            '<div style=" min-width:fit-content; min-height: fit-content;  transform: translate(-47%,-40%);">' +
            '<img style="height: 40px;width: 40px;display:block;margin: auto auto;" src="../../assets/icon/Marker.svg"/>' +
            '<p style="min-width:fit-content;color: black;white-space: nowrap;font-size:2vh;margin-top:0.5vh;font-weight:bold;' +
            'animation: fadeInAnimation ease 500ms; animation-iteration-count: 1; animation-fill-mode: forwards;">' + restaurant.restaurantName + '</p>' +
            '</div>'
        })
      })
    } else {
      marker = L.marker([restaurant.latitude, restaurant.longitude], {
        icon: new L.DivIcon({
          className: 'my-div-icon',
          html: '<div style="min-width:fit-content;  transform: translate(-47%,-40%);">' +
            '<img style="height: 40px;width: 40px;display:block;margin: auto auto;" src="../../assets/icon/Marker.svg"/>' +
            '<p style="min-width:fit-content;display:block;color: black; opacity: 0; white-space: nowrap;font-size:2vh;margin-top:0.5vh;font-weight:bold;">' + restaurant.restaurantName + '</p>' +
            '</div>'
        })
      })
    }

    marker.addEventListener('click', () => {
      this.getFavRestsMem();
      let inputs = {
        id: restaurant.id,
        image: "pizzaDemo.png",
        restaurantName: restaurant.restaurantName,
        type: restaurant.type,
        stars: 4,
        description: restaurant.description,
        menu: restaurant.menu,
        fromMarker: true
      }

      switch (inputs.type) {
        case "meat":
          inputs.type = "MeatIcon.svg";
          break;
        case "vegetarian":
          inputs.type = "VegetarianIcon.svg";
          break;
        case "vegan":
          inputs.type = "VeganIcon.svg";
          break;
      }

      let navigationExtras: NavigationExtras = {
        state: {
          inputs: inputs
        }
      };
      this.router.navigate(['/tabs', 'restaurantDetail'], navigationExtras);
    });
    marker.addTo(MapPage.map);
    this.activeMarkers.push(marker);
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

  addFilter(filter: string) {
    if (MapPage.filters.includes(filter)) {
      MapPage.filters.splice(MapPage.filters.indexOf(filter), 1)
    } else {
      MapPage.filters.push(filter)
    }
    const btn = document.getElementById(filter)!;
    if(btn.classList.contains("off")){
      btn.classList.add("on")
      btn.classList.remove("off")
    } else {
      btn.classList.add("off")
      btn.classList.remove("on")
    }
    this.updateMarkers();
  }
}

