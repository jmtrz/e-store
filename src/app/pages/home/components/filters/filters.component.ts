import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-filters',
  templateUrl: "./filters.component.html",
  styles: [
  ]
})
export class FiltersComponent implements OnInit, OnDestroy{

  @Output() showCategory = new EventEmitter<string>();

  categoriesSubscription : Subscription | undefined;

  constructor(private storeService : StoreService ) {}
 
  ngOnInit(): void {
    this.categoriesSubscription = this.storeService.getAlLCategories()
      .subscribe((response) => {
        this.categories = response;
      });
  }

  categories : Array<string> | undefined;

  onShowCategory(category: string):void {
    this.showCategory.emit(category);    
  }

  ngOnDestroy(): void {
    if(this.categoriesSubscription){
      this.categoriesSubscription?.unsubscribe();
    }
  }
}
