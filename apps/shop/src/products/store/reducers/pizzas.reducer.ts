import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as fromActions from '../actions';
import { Pizza } from '../../models/pizza.model';

export interface PizzaState extends EntityState<Pizza> {
  // additional entities state properties
  loaded: boolean;
  loading: boolean;
}

export const adapter: EntityAdapter<Pizza> = createEntityAdapter<Pizza>();

export const INITIAL_STATE: PizzaState = adapter.getInitialState({
  // additional entity state properties
  loaded: false,
  loading: false,
});

const _pizzaReducer = createReducer(
  INITIAL_STATE,
  on(fromActions.LOAD_PIZZAS, (state) => ({
    ...state,
    loading: true,
  })),
  on(fromActions.LOAD_PIZZAS_SUCCESS, (state, { pizzas }) =>
    adapter.setAll(pizzas, { ...state, loaded: true, loading: false })
  ),
  on(fromActions.LOAD_PIZZAS_FAIL, (state) => ({
    ...state,
    loaded: false,
    loading: false,
  })),
  on(fromActions.CREATE_PIZZA_SUCCESS, (state, { pizza }) =>
    adapter.addOne(pizza, state)
  ),
  on(fromActions.UPDATE_PIZZA_SUCCESS, (state, { pizza }) =>
    adapter.setOne(pizza, state)
  ),
  on(fromActions.REMOVE_PIZZA_SUCCESS, (state, { pizza }) =>
    adapter.removeOne(pizza.id, state)
  )
);

export function pizzaReducer(state: PizzaState, action) {
  return _pizzaReducer(state, action);
}
