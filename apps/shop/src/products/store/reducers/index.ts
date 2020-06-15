import { PizzaState, pizzaReducer } from './pizzas.reducer';
import {
  ActionReducerMap,
  createSelector,
  createFeatureSelector,
} from '@ngrx/store';

import { FEATURES } from 'apps/shop/config';

export interface ProductState {
  pizzas: PizzaState;
}

export const REDUCERS: ActionReducerMap<ProductState> = {
  pizzas: pizzaReducer,
};

// selectors
export const selectFeature = createFeatureSelector<ProductState>(
  FEATURES.PRODUCTS
);

export const selectPizzaState = createSelector(
  selectFeature,
  (state: ProductState) => state.pizzas
);

export const selectLoading = createSelector(
  selectPizzaState,
  (state: PizzaState) => state.loading
);

export const selectLoaded = createSelector(
  selectPizzaState,
  (state: PizzaState) => state.loaded
);

export const selectPizzas = createSelector(
  selectPizzaState,
  (state: PizzaState) => state.data
);
