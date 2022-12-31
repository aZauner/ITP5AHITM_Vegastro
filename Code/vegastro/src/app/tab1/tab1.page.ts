import { Component } from '@angular/core';
import * as L from 'leaflet';
import { Geolocation, Geoposition } from '@awesome-cordova-plugins/geolocation/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  address: string = "";
  userMarker!: L.CircleMarker;
  map!: L.Map;
  defaultMarker: L.Icon = L.icon({
    iconUrl: '../../assets/MarkerPoint3.svg',
    iconSize: [22, 22], // size of the icon
  });
  constructor(protected platform: Platform, private geolocation: Geolocation) {
  }
  ngOnInit() {
    //Generate Start map
    this.geolocation.getCurrentPosition().then((resp) => {
      this.map = L.map('map', {
        center: [resp.coords.latitude, resp.coords.longitude],
        zoom: 12,
        renderer: L.canvas(),
      });
      this.userMarker = L.circleMarker([resp.coords.latitude, resp.coords.longitude]).addTo(this.map);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© Vegastro',
      }).addTo(this.map);

      setTimeout(() => {
        this.map.invalidateSize();
      }, 0);
      this.addMarker(48.0349017, 13.7643518, this.defaultMarker);
    });
  }

  // //Get Location of User
  setMapToUserLocation() {
    this.geolocation
      .getCurrentPosition()
      .then((resp) => {
        this.map.panTo([resp.coords.latitude, resp.coords.longitude]);
        this.userMarker.setLatLng([resp.coords.latitude, resp.coords.longitude]);
      })
      .catch((error) => {
        console.log('Error getting location', error);
      });
  }

  addMarker(latitude: number, longitude: number, icon: L.Icon) {
    L.marker([latitude, longitude], { icon: icon }).addTo(this.map);
  }

  addressSearch(enter: Boolean, index?: number) {
    if(document.getElementById("searchbarResultList") != null) {
      document.getElementById("searchbarResultList")?.remove();
    } 
    if(document.getElementById("noDataFound") != null) {
      document.getElementById("noDataFound")?.remove();
    } 
    if(document.getElementById("searchbarLoading") != null) {
      document.getElementById("searchbarLoading")?.remove();
    } 
    
    let loadingBar = document.createElement("ion-spinner");
    loadingBar.setAttribute("id", "searchbarLoading");
    loadingBar.style.zIndex = "100";
    loadingBar.style.margin = "0 0 1vh 50vw";
    loadingBar.style.transform = "translateX(-50%)";
    document.getElementById("searchbar")?.appendChild(loadingBar);
    
    setTimeout(()=>{
      this.addrSearch((data: any) => {
        if(document.getElementById("searchbarLoading") != null) {
          document.getElementById("searchbarLoading")?.remove();
        }
        if (data.length > 0) {
          if(enter) {
            this.map.panTo([parseFloat(data[0].lat), parseFloat(data[0].lon)]);
          } else if (index != undefined && index != null) {
            this.addMarker(parseFloat(data[index].lat), parseFloat(data[index].lon), this.defaultMarker);
          } else {
            if(document.getElementById("searchbarResultList") != null) {
              document.getElementById("searchbarResultList")?.remove();
            } 
            if(document.getElementById("noDataFound") != null) {
              document.getElementById("noDataFound")?.remove();
            } 
            let list = document.createElement("ion-list");
            for(let i = 0; i < data.length; i++) {
              if(data[i].class != "boundary") {
                let item = document.createElement("ion-item");
                let label = document.createElement("p");
                let text = data[i].display_name;
                if(text.length <= 40) {
                  label.innerText = text;
                } else {
                  label.innerText = text.slice(0,40) + "...";
                }
                item.appendChild(label);
                item.addEventListener('click', ()=>{this.addressSearch(true,i)});
                list?.appendChild(item);
              }
            }
            if(list.innerHTML == "") {
              if(document.getElementById("noDataFound") != null) {
                document.getElementById("noDataFound")?.remove();
              } 
              let item = document.createElement("ion-item");
              let label1 = document.createElement("ion-label");
              label1.innerText = "Keine Treffer gefunden";
              item.appendChild(label1);
              item.id = "noDataFound";
              item.style.margin = "0 0 1vh 0";
              item.style.width = "100%";
              item.style.textAlign = "center";
              document.getElementById("searchbar")?.appendChild(item)
            }
            list.id = "searchbarResultList";
            document.getElementById("searchbar")?.appendChild(list);
          }
        } else if (this.address != ""){
          if(document.getElementById("noDataFound") != null) {
            document.getElementById("noDataFound")?.remove();
          } 
          let item = document.createElement("ion-item");
          let label1 = document.createElement("ion-label");
          label1.innerText = "Keine Treffer gefunden";
          item.appendChild(label1);
          item.id = "noDataFound";
          item.style.margin = "0 0 1vh 0";
          item.style.width = "100%";
          item.style.textAlign = "center";
          document.getElementById("searchbar")?.appendChild(item);
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
