import { Component, OnInit, Input } from '@angular/core';

import { Restaurant } from './restaurant.model';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'mt-restaurant',
  templateUrl: './restaurant.component.html',
  animations: [
    trigger('restaurantAppeared', [
      state('ready', style({ opacity: 1 })),
      transition('void => ready', [ // not need 2 state to animate, it also can animate with only 1 state
        style({ opacity: 0, transform: 'translate(-50px, 0px' }), // x y
        animate('300ms 0s ease-in-out') // ease-in-out start the animation accelerate and finish the animation decelarate
      ])
    ])
  ]
})
export class RestaurantComponent implements OnInit {

  restaurantState = 'ready'

  @Input() restaurant: Restaurant;

  constructor() { }

  ngOnInit() {
  }

}
