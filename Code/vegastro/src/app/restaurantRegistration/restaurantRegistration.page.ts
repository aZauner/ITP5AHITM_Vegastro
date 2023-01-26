import { Component } from '@angular/core';

@Component({
  selector: 'restaurants-registration',
  templateUrl: 'restaurantRegistration.page.html',
  styleUrls: ['restaurantRegistration.page.scss']
})
export class RestaurantsRegistrationPage {  
  private  position =  1;

  constructor() {
  }

  customCounterFormatter(inputLength: number, maxLength: number) {
    return `${maxLength - inputLength} characters remaining`;
  }
  
  ngOnInit() {

  }

  
  showElement(elementToShow: string) {        
      this.position = parseInt(elementToShow.slice(5)) ;       
      let elem = document.getElementById(elementToShow);
      document.getElementById('input1')!.style.visibility = 'hidden';
      document.getElementById('input2')!.style.visibility = 'hidden';   
      document.getElementById('input3')!.style.visibility = 'hidden';
      document.getElementById('input4')!.style.visibility = 'hidden';   
      elem!.style.visibility = 'visible';
  }

  nextElem(){    
    let elem = document.getElementById('bred' + this.position)!;
    document.getElementById('bred' + (this.position + 1))?.classList.add('active');
    document.getElementById('hr' + this.position)?.classList.add('active');
    elem.removeChild(elem.firstChild!)
    let icon = document.createElement('ion-icon');
    icon.name = 'checkmark-outline'
    icon.style.margin = "auto auto"
    icon.style.fontSize = "3vh"
    elem.appendChild(icon)
    this.position++;
    this.showElement('input' + this.position)    
  }

}
