import { MenuItem } from './../menu-item/menu-item.model';
import { CartItem } from './cart-item.model';

export class ShoppingCartService {
  items: CartItem[] = []

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
  }

  total(): number {
    return this.items
      .map(item => item.value())
      .reduce((prev, value) => prev + value, 0)
  }
}
