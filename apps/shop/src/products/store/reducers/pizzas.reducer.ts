import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import {
  LOAD_PIZZAS,
  LOAD_PIZZAS_SUCCESS,
  LOAD_PIZZAS_FAIL,
} from '../actions/pizzas.action';
import { Pizza } from '../../models/pizza.model';

export interface PizzaState extends EntityState<Pizza> {
  // additional entities state properties
  selectedPizzaId: number | null;
  loaded: boolean;
  loading: boolean;
}

export const adapter: EntityAdapter<Pizza> = createEntityAdapter<Pizza>();

export const INITIAL_STATE: PizzaState = adapter.getInitialState({
  // additional entity state properties
  selectedPizzaId: null,
  loaded: false,
  loading: false,
});

const _pizzaReducer = createReducer(
  INITIAL_STATE,
  on(LOAD_PIZZAS, (state) => ({
    ...state,
    loading: true,
  })),
  on(LOAD_PIZZAS_SUCCESS, (state, { pizzas }) => {
    return adapter.setAll(pizzas, { ...state, loaded: true, loading: false });
  }),
  on(LOAD_PIZZAS_FAIL, (state) => ({
    ...state,
    loaded: true,
    loading: false,
  }))
);

export function pizzaReducer(state: PizzaState, action) {
  return _pizzaReducer(state, action);
}

// get the selectors
const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();

// select the array of user ids
export const selectUserIds = selectIds;

// select the dictionary of user entities
export const selectUserEntities = selectEntities;

// select the array of users
export const selectAllItems = selectAll;

// select the total user count
export const selectUserTotal = selectTotal;
