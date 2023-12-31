import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
import { Cart, CartItem } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: "./cart.component.html",
  styles: [
  ]
})
export class CartComponent implements OnInit {

  cart: Cart = { items:[
    {
      product: "https://via.placeholder.com/150",
      name: 'snickers',
      price:150,
      quantity: 1,
      id: 1
    },
    {
      product: "https://via.placeholder.com/150",
      name: 'snickers 2',
      price:150,
      quantity: 1,
      id: 1
    }

  ] };

  dataSource : Array<CartItem> = [];
  displayedColumns: Array<string> = [
    'product',
    'name',
    'price',
    'quantity',
    'total',
    'action'
  ];

  constructor(private cartService: CartService, private http:HttpClient) {}

  ngOnInit(): void {
    this.dataSource = this.cart.items;
    this.cartService.cart.subscribe((_cart: Cart)=> {
      this.cart = _cart;
      this.dataSource = this.cart.items;
    });
  }
  
  getTotal(items: Array<CartItem>):number {
    return this.cartService.getTotal(items);
  }

  onClearCart() {
    this.cartService.clearCart();
  }
  onCheckout():void {  

    this.http.post<Array<CartItem>>('http://localhost:4242/checkout', this.cart.items).subscribe(async(res:any) => {
      let stripe = await loadStripe('pk_test_51NYWKGCq8XoBLk9JdwOwiy13X9E0HytlDsxcYc6ksyk2AHu6iesGqeOmy2TKzYFV0oXj6P9uxHhKLWrYIIA8QKSP00Nm5857wm');
      stripe?.redirectToCheckout({
        sessionId: res.id
      });
    });
  }

  onRemoveFromCart(item: CartItem) : void {
      this.cartService.removeFromCart(item);
  }

  onAddQuantity(item:CartItem) : void {
    this.cartService.addToCart(item);
  }

  onRemoveQuantity(item:CartItem) : void {
    this.cartService.removeQuantity(item);
  }
}
