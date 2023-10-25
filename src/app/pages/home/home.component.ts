import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';
import { StoreService } from 'src/app/services/store.service';

const ROWS_HEIGHT: {[id:number]:number} = { 1: 400, 3: 355, 4:350 };

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit, OnDestroy {

  rowHeight: number;
  columns:number;
  category:string | undefined;

  products: Array<Product> | undefined;
  sort = 'desc';
  count = '12';
  productsSubscription : Subscription | undefined;

  constructor(private cartService: CartService, private storeService : StoreService){
    this.columns = 3;
    this.rowHeight = ROWS_HEIGHT[this.columns];    
  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() : void{
   this.productsSubscription = this.storeService.getAllProduct(this.count,this.sort, this.category)
      .subscribe((_products) => {
        this.products = _products;
      });
  }

  onColumnsChange(columnNumber:number):void{
    this.columns = columnNumber;
  }

  onShowCategory(newCategory:string): void {
    this.category = newCategory;
    console.log("this is being called");
    this.getProducts();
  }

  onAddToCart(product: Product) : void {
    this.cartService.addToCart({
      id: product.id,
      product: product.image,
      name: product.title,
      price: product.price,
      quantity: 1,
    });
  }

  onItemsCountChange(newCount:number) : void {
    this.count = newCount.toString();
    this.getProducts();
  }

  onSortChange(newSort: string) : void {
    this.sort = newSort;
    this.getProducts();
  }

  ngOnDestroy(): void {
    if(this.productsSubscription) {
      this.productsSubscription.unsubscribe();
    }
  }
}
