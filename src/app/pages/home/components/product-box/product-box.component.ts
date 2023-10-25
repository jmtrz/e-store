import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-product-box',
  templateUrl: "./product-box.component.html",
  styles: [
  ]
})
export class ProductBoxComponent {

  @Output() addToCart = new EventEmitter();

  @Input() fullWidthMode = false;
  @Input() product : Product | undefined;

  // product:Product | undefined = {
  //   id: 1,
  //   title:'snickers',
  //   price:150,
  //   category: 'shoes',
  //   description: 'sample description',
  //   image : "https://via.placeholder.com/150"
  // };

  onAddToCart(): void{
      this.addToCart.emit(this.product);
  }
}
