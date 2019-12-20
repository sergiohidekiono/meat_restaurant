import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import 'rxjs/add/operator/switchMap';

import { Restaurant } from './restaurant/restaurant.model';
import { RestaurantService } from './restaurants.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'mt-restaurants',
  templateUrl: './restaurants.component.html',
  animations: [
    trigger('toggleSearch', [
      state('hidden', style({
        opacity: 0,
        'max-height': '0px'
      })),
      state('visible', style({
        opacity: 1,
        'max-height': '70px',
        'margin-top': '20px'
      })),
      transition('* => *', animate('250ms 0s ease-in-out'))
    ])
  ]
})
export class RestaurantsComponent implements OnInit {

  searchBarState = 'hidden'

  searchForm: FormGroup
  searchControl: FormControl // the reference to listening the values pressed

  restaurants: Restaurant[] = []

  constructor(
    private restaurantService: RestaurantService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {

    this.searchControl = this.formBuilder.control('')
    this.searchForm = this.formBuilder.group({ // a group of fields which will be inserted values
      searchControl: this.searchControl // searchControl is the name of formControlName it's like an ID
      // otherName: this.searchControl // can have the another field as input or something else to handle
    })

    this.searchControl.valueChanges // for every change it does something
      .switchMap(searchTerm => this.restaurantService.restaurants(searchTerm)) // switchMap will take the last value instead of each value it's consume alot of data process
      .subscribe(restaurants => this.restaurants = restaurants) // get the values

    this.restaurantService.restaurants()
      .subscribe(restaurants => this.restaurants = restaurants)
  }

  toggleSearch() {
    this.searchBarState = this.searchBarState === 'hidden' ? 'visible' : 'hidden'
  }

}
