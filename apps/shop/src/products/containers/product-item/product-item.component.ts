import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import * as fromStore from '../../store';
import * as fromActions from '../../store/actions';

import { Pizza } from '../../models/pizza.model';
import { Topping } from '../../models/topping.model';

@Component({
  selector: 'product-item',
  styleUrls: ['product-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,

  template: `
    <div class="product-item">
      <pizza-form
        [pizza]="pizza$ | async"
        [toppings]="toppings$ | async"
        (selected)="onSelect($event)"
        (create)="onCreate($event)"
        (update)="onUpdate($event)"
        (remove)="onRemove($event)"
      >
        <pizza-display [pizza]="visualise$ | async"> </pizza-display>
      </pizza-form>
    </div>
  `,
})
export class ProductItemComponent implements OnInit {
  pizza$: Observable<Pizza>;
  visualise$: Observable<Pizza>;
  toppings$: Observable<Topping[]>;

  constructor(private store: Store<fromStore.ProductState>) {}

  ngOnInit() {
    this.pizza$ = this.store.select(fromStore.selectedPizza).pipe(
      tap((pizza: Pizza = null) => {
        const pizzaExists = !!(pizza && pizza.toppings);
        const toppings = pizzaExists
          ? pizza.toppings.map((topping) => topping.id)
          : [];

        this.store.dispatch(
          fromActions.VISUALISE_TOPPINGS({ selectedToppings: toppings })
        );
      })
    );
    this.visualise$ = this.store.select(fromStore.selectPizzaVisualised);
    this.toppings$ = this.store.select(fromStore.selectAllToppings);
  }

  onSelect(event: number[]) {
    this.store.dispatch(
      fromActions.VISUALISE_TOPPINGS({ selectedToppings: event })
    );
  }

  onCreate(event: Pizza) {
    this.store.dispatch(fromActions.CREATE_PIZZA({ pizza: event }));
  }

  onUpdate(event: Pizza) {
    this.store.dispatch(fromActions.UPDATE_PIZZA({ pizza: event }));
  }

  onRemove(event: Pizza) {
    const remove = window.confirm('Are you sure?');
    if (remove) {
      this.store.dispatch(fromActions.REMOVE_PIZZA({ pizza: event }));
    }
  }
}
