import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

import { Restaurant } from './restaurant/restaurant.model';
import { MEAT_API } from './../app.api';
import { MenuItem } from 'app/restaurant-detail/menu-item/menu-item.model';
@Injectable()
export class RestaurantService {

  constructor(private httpClient: HttpClient) { }

  restaurants(search?: string): Observable<Restaurant[]> { // search is optional
    let params: HttpParams = undefined // HttpParams is immutable

    if(search){
      params = new HttpParams().append('q', search)
    }
    return this.httpClient.get<Restaurant[]>(`${MEAT_API}/restaurants`, {params: params})
  }

  restaurantById(id: string): Observable<Restaurant> {
    return this.httpClient.get<Restaurant>(`${MEAT_API}/restaurants/${id}`)
  }

  reviewsOfRestaurant(id: string): Observable<any> {
    return this.httpClient.get(`${MEAT_API}/restaurants/${id}/reviews`)
  }

  menuOfRestaurant(id: string): Observable<MenuItem[]> {
    return this.httpClient.get<MenuItem[]>(`${MEAT_API}/restaurants/${id}/menu`)
  }
}
