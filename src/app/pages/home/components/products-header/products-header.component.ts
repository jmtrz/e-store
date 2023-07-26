import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-products-header',
  templateUrl: "./products-header.component.html",
  styles: [
  ]
})
export class ProductsHeaderComponent {

  @Output() columnsCountChange = new EventEmitter<number>();

  sort : string;
  itemsShowCount : number;

  constructor() {
    this.sort = 'desc';
    this.itemsShowCount = 12;
  }

  onSortUpdated(newSort: string): void {
    this.sort = newSort;
  }

  onItemsUpdated(count: number): void {
    this.itemsShowCount = count;
  }

  onColumsUpdated(columNumber: number): void {
    this.columnsCountChange.emit(columNumber);
  }
}
