import { Component, OnInit } from '@angular/core';

import { Restaurant } from './../restaurants/restaurant/restaurant.model';
import { RestaurantService } from './../restaurants/restaurants.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'mt-restaurant-detail',
  templateUrl: './restaurant-detail.component.html'
})
export class RestaurantDetailComponent implements OnInit {

  restaurant: Restaurant

  constructor(
    private restaurantsService: RestaurantService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.restaurantsService.restaurantById(this.route.snapshot.params['id']) // catching the parameter of "id", it'll be used once changing the route to another route
      .subscribe((retornoAPI) => {
        this.restaurant = retornoAPI
      })
  }

}
