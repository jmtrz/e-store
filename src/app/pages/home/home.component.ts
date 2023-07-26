import { Component } from '@angular/core';

const ROWS_HEIGHT: {[id:number]:number} = { 1: 400, 3: 355, 4:350 };

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent {

  rowHeight: number;
  columns:number;
  category:string | undefined;

  constructor(){
    this.columns = 3;
    this.rowHeight = ROWS_HEIGHT[this.columns];    
  }

  onColumnsChange(columnNumber:number):void{
    this.columns = columnNumber;
  }

  onShowCategory(newCategory:string): void {
    this.category = newCategory;
  }
}
