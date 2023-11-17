import {
    ComponentFactoryResolver,
    Injectable,
    Injector,
    ApplicationRef
} from '@angular/core'
import { Meal, MealInputs } from './meal.component'
@Injectable()
export class MealService {
    constructor(private resolver: ComponentFactoryResolver, private injector: Injector, private app: ApplicationRef) {
    }

    addDynamicComponent(inputs: MealInputs) {
        const factory = this.resolver.resolveComponentFactory(Meal);
        const div = document.createElement("div");
        document.getElementById("meals")!.appendChild(div);
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

        component.instance.inputs = inputs;
        this.app.attachView(component.hostView);
    }
}