import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map'

import { ShoppingCartService } from 'app/restaurant-detail/shopping-cart/shopping-cart.service';
import { CartItem } from 'app/restaurant-detail/shopping-cart/cart-item.model';
import { Order } from './order.model';

import { MEAT_API } from 'app/app.api'
@Injectable()
export class OrderService {

  constructor(
    private shoppingCartService: ShoppingCartService,
    private httpClient: HttpClient
  ) { }

  itemsValue() {
    return this.shoppingCartService.total()
  }

  cartItems(): CartItem[] {
    return this.shoppingCartService.items
  }

  increaseQty(item: CartItem) {
    this.shoppingCartService.increaseQty(item)
  }

  decreaseQty(item: CartItem) {
    this.shoppingCartService.decreaseQty(item)
  }

  remove(item: CartItem) {
    this.shoppingCartService.removeItem(item)
  }

  clear() {
    this.shoppingCartService.clear()
  }

  checkOrder(order: Order): Observable<string> {
    return this.httpClient.post<Order>(`${MEAT_API}/orders`, order)
      .map(order => order.id)
  }
}
