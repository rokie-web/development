import { on, createReducer } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as fromActions from '../actions';
import { Topping } from '../../models/topping.model';

export interface ToppingState extends EntityState<Topping> {
  // additional entities state properties
  selectedToppings: number[];
  loaded: boolean;
  loading: boolean;
}

export const adapter: EntityAdapter<Topping> = createEntityAdapter<Topping>();

export const INITIAL_STATE: ToppingState = adapter.getInitialState({
  // additional entity state properties
  selectedToppings: [],
  loaded: false,
  loading: false,
});

const _toppingReducer = createReducer(
  INITIAL_STATE,
  on(fromActions.LOAD_TOPPINGS, (state) => ({
    ...state,
    loading: true,
  })),
  on(fromActions.LOAD_TOPPINGS_SUCCESS, (state, { toppings }) => {
    return adapter.setAll(toppings, { ...state, loaded: true, loading: false });
  }),
  on(fromActions.LOAD_TOPPINGS_FAIL, (state) => ({
    ...state,
    loaded: false,
    loading: false,
  })),
  on(fromActions.VISUALISE_TOPPINGS, (state, { selectedToppings }) => ({
    ...state,
    selectedToppings,
  }))
);

export function toppingReducer(state: ToppingState, action) {
  return _toppingReducer(state, action);
}
