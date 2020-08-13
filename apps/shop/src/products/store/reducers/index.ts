import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import { PizzaState, pizzaReducer } from './pizzas.reducer';
import { toppingReducer, ToppingState } from './toppings.reducer';

import { FEATURES } from 'apps/shop/config';

export interface ProductState {
  pizzas: PizzaState;
  toppings: ToppingState;
}

export const REDUCERS: ActionReducerMap<ProductState> = {
  pizzas: pizzaReducer,
  toppings: toppingReducer,
};

export const selectFeature = createFeatureSelector<ProductState>(
  FEATURES.PRODUCTS
);
