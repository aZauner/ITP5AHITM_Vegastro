import {
    ComponentFactoryResolver,
    Injectable,
    Injector,
    ApplicationRef
} from '@angular/core'
import { RestaurantCard, RestaurantCardInputs } from './restaurantCard.component'
@Injectable()
export class RestaurantCardService {
    constructor(private resolver: ComponentFactoryResolver, private injector: Injector, private app: ApplicationRef) {
    }

    addDynamicComponent(inputs: RestaurantCardInputs) {
        const factory = this.resolver.resolveComponentFactory(RestaurantCard);
        const div = document.createElement("div");
        document.getElementById("restaurantCards")!.appendChild(div);
        const component = factory.create(this.injector, [], div);
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
        if(inputs.description.length > 150) {
            inputs.description = inputs.description.slice(0,150) + " ...";
        }
        component.instance.inputs = inputs;
        this.app.attachView(component.hostView);
    }
}