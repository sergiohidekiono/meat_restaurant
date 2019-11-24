import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { RestaurantService } from '../../restaurants/restaurants.service';

@Component({
  selector: 'mt-reviews',
  templateUrl: './reviews.component.html'
})
export class ReviewsComponent implements OnInit {

  reviews: Observable<any>

  constructor(
    private restaurantService: RestaurantService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.reviews = this.restaurantService.reviewsOfRestaurant(this.activatedRoute.parent.snapshot.params['id']) // getting the "id" from the parent component
  }

}
