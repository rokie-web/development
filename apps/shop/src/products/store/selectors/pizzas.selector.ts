import { createSelector } from '@ngrx/store';

import { selectRouter } from '../../../app/store';

import { Pizza } from '../../models/pizza.model';
import { ProductState, selectFeature } from '../reducers';
import { PizzaState, adapter } from '../reducers/pizzas.reducer';

import {
  selectToppingsEntities,
  selectSelectedToppings,
} from './toppings.selector';

const { selectAll, selectEntities } = adapter.getSelectors();

export const selectPizzaState = createSelector(
  selectFeature,
  (state: ProductState) => state.pizzas
);

export const selectPizzaLoading = createSelector(
  selectPizzaState,
  (state: PizzaState) => state.loading
);

export const selectPizzaLoaded = createSelector(
  selectPizzaState,
  (state: PizzaState) => state.loaded
);

export const selectAllPizzas = createSelector(selectPizzaState, selectAll);

export const selectPizzasEntities = createSelector(
  selectPizzaState,
  selectEntities
);

export const selectedPizza = createSelector(
  selectPizzasEntities,
  selectRouter,
  (entities, router): Pizza => {
    return router.state && entities[router.state.params.pizzaId];
  }
);

export const selectPizzaVisualised = createSelector(
  selectedPizza,
  selectToppingsEntities,
  selectSelectedToppings,
  (pizza, toppingEntities, selectedToppings) => {
    const toppings = selectedToppings.map((id) => toppingEntities[id]);

    return { ...pizza, toppings };
  }
);
