import { createReducer, on } from '@ngrx/store';

import {
  LOAD_PIZZAS,
  LOAD_PIZZAS_SUCCESS,
  LOAD_PIZZAS_FAIL,
} from '../actions/pizzas.action';
import { Pizza } from '../../models/pizza.model';
import { Action } from 'rxjs/internal/scheduler/Action';

export interface PizzaState {
  data: Pizza[];
  loaded: boolean;
  loading: boolean;
}

export const INITIAL_STATE = {
  data: [],
  loaded: false,
  loading: false,
};

const _pizzaReducer = createReducer(
  INITIAL_STATE,
  on(LOAD_PIZZAS, (state) => ({
    ...state,
    loading: true,
  })),
  on(LOAD_PIZZAS_SUCCESS, (state, { pizza }) => ({
    ...state,
    loaded: true,
    loading: false,
    data: pizza,
  })),
  on(LOAD_PIZZAS_FAIL, (state) => ({
    ...state,
    loaded: true,
    loading: false,
  }))
);

export function pizzaReducer(state, action): PizzaState {
  return _pizzaReducer(state, action);
}
