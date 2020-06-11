import { createAction, props } from '@ngrx/store';

import { Pizza } from '../../models/pizza.model';

// load pizzas
export const LOAD_PIZZAS = createAction('[Products] Load Pizzas');
export const LOAD_PIZZAS_FAIL = createAction(
  '[Products] Load Pizzas Fail',
  props<{ payload: any }>()
);
export const LOAD_PIZZAS_SUCCESS = createAction(
  '[Products] Load Pizzas Success',
  props<{ payload: Pizza[] }>()
);
