import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CartItem } from '../common/CartItem';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems: CartItem[] = [];

  /*Subject is a subclass of observable
   we use it to publish events in our code.
   the event will be sent to all of the subscribers*/

  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  constructor() {}

  addToCart(theCartItem: CartItem) {
    //check if we already have the item in our cart
    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem = undefined;

    if (this.cartItems.length > 0) {
      //find the item in the cart based on item id
      for (let tempCartItem of this.cartItems) {
        if (tempCartItem.id === theCartItem.id) {
          existingCartItem = tempCartItem;
          break;
        }
        //check if we found it
        alreadyExistsInCart = existingCartItem != undefined;
      }
      if (alreadyExistsInCart) {
        //increment the quantity
        existingCartItem.quantity++;
      } else {
        //just add the item to the array
        this.cartItems.push(theCartItem);
      }

      //compute cart total price and total quantity
      this.computeCartTotals();
    }
  }
  computeCartTotals() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for (let currentCartItem of this.cartItems) {
      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
      totalQuantityValue += currentCartItem.quantity;
    }

    //publish the new values ... all subscribers will receive the new data
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);
    

  }
}
