import { PizzaState, pizzaReducer } from './pizzas.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface ProductState {
  pizzas: PizzaState;
}

export const reducers: ActionReducerMap<ProductState> = {
  pizzas: pizzaReducer,
};
