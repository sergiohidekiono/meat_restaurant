import { NotificationService } from './../../shared/messages/notification.service';
import { MenuItem } from './../menu-item/menu-item.model';
import { CartItem } from './cart-item.model';
import { Injectable } from '@angular/core';

@Injectable()
export class ShoppingCartService {
  items: CartItem[] = []

  constructor(private notificationService: NotificationService) { }

  clear() {
    this.items = []
  }

  addItem(item: MenuItem) {
    let foundItem = this.items.find(myItem => myItem.menuItem.id === item.id)

    if (foundItem) { // if exist a quantity already it'll add +1
      this.increaseQty(foundItem)
    } else { // else add the quantity to 1
      this.items.push(new CartItem(item))
    }
    this.notificationService.notify(`You add an item ${item.name}`)
  }

  increaseQty(item: CartItem) {
    item.quantity = item.quantity + 1
  }

  decreaseQty(item: CartItem) {
    item.quantity = item.quantity - 1

    if (item.quantity === 0) {
      this.removeItem(item)
    }
  }

  removeItem(item: CartItem) {
    this.items.splice(this.items.indexOf(item), 1) // from the index which index I want to remove? and the quantity I'll remove 1 from that index
    this.notificationService.notify(`You add an item ${item.menuItem.name}`)
  }

  total(): number {
    return this.items
      .map(item => item.value())
      .reduce((prev, value) => prev + value, 0)
  }
}
