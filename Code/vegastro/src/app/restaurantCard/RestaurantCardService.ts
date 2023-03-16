
import {
  ComponentFactoryResolver,
  Injectable,
  Injector,
  ApplicationRef,
} from '@angular/core';
import axios from 'axios';
import {
  RestaurantCard,
  RestaurantCardInputs,
} from './restaurantCard.component';
@Injectable()
export class RestaurantCardService {
  constructor(
    private resolver: ComponentFactoryResolver,
    private injector: Injector,
    private app: ApplicationRef
  ) {}

  async addDynamicComponent(inputs: RestaurantCardInputs) {
    await this.getAverageStarts(inputs.id).then((starRating) => {
           
    inputs.stars =  Math.round(starRating * 100) / 100
      const factory = this.resolver.resolveComponentFactory(RestaurantCard);
      const div = document.createElement('div');
      document.getElementById('restaurantCards')!.appendChild(div);
      const component = factory.create(this.injector, [], div);
      switch (inputs.type) {
        case 'meat':
          inputs.type = 'MeatIcon.svg';
          break;
        case 'vegetarian':
          inputs.type = 'VegetarianIcon.svg';
          break;
        case 'vegan':
          inputs.type = 'VeganIcon.svg';
          break;
      }
      if (inputs.description.length > 150) {
        inputs.preDescr = inputs.description.slice(0, 150) + ' ...';
      } else {
        inputs.preDescr = inputs.description;
      }
      component.instance.inputs = inputs;
      this.app.attachView(component.hostView);
    });
  }

  async addDynamicComponentFav(inputs: RestaurantCardInputs) {
    await this.getAverageStarts(inputs.id).then((starRating) => {
      inputs.stars = starRating;      

      const factory = this.resolver.resolveComponentFactory(RestaurantCard);
      const div = document.createElement('div');
      document.getElementById('favouriteRestaurants')!.appendChild(div);
      const component = factory.create(this.injector, [], div);
      switch (inputs.type) {
        case 'meat':
          inputs.type = 'MeatIcon.svg';
          break;
        case 'vegetarian':
          inputs.type = 'VegetarianIcon.svg';
          break;
        case 'vegan':
          inputs.type = 'VeganIcon.svg';
          break;
      }
      if (inputs.description.length > 150) {
        inputs.preDescr = inputs.description.slice(0, 150) + ' ...';
      } else {
        inputs.preDescr = inputs.description;
      }
      component.instance.inputs = inputs;
      this.app.attachView(component.hostView);      
    });
  }
  

  async getAverageStarts(id: string) {
    let ratingstars = 0;
    await axios
      .get('http://localhost:3000/rating/byRestaurant/' + id)
      .then((response) => {
        let sumStars = 0;
        if (response.data.length > 0) {
          for (const star of response.data) {
            sumStars += star.stars;
          }
          ratingstars = sumStars / response.data.length;
        }        
      });
    return ratingstars;
  }
}
