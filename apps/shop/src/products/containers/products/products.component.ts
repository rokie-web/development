import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { Store, select } from '@ngrx/store';

import * as fromStore from '../../store';
import { Pizza } from '../../models/pizza.model';

@Component({
  selector: 'products',
  styleUrls: ['products.component.scss'],
  template: `
    <div class="products">
      <div class="products__new">
        <a class="btn btn__ok" routerLink="./new">
          New Pizza
        </a>
      </div>
      <div class="products__list">
        <div *ngIf="!(pizzas$ | async)?.length">
          No pizzas, add one to get started.
        </div>
        <pizza-item *ngFor="let pizza of pizzas$ | async" [pizza]="pizza">
        </pizza-item>
      </div>
    </div>
  `,
})
export class ProductsComponent {
  pizzas$: Observable<Pizza[]>;

  constructor(private store: Store<fromStore.ProductState>) {
    this.pizzas$ = this.store.select(fromStore.selectPizzas);
    this.store.dispatch(fromStore.LOAD_PIZZAS());
  }
}
