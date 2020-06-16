import { HttpErrorResponse } from '@angular/common/http';

import { createAction, props } from '@ngrx/store';

import { Pizza } from '../../models/pizza.model';

// load pizzas
export const LOAD_PIZZAS = createAction('[Products] Load Pizzas');
export const LOAD_PIZZAS_FAIL = createAction(
  '[Products] Load Pizzas Fail',
  props<{ error: HttpErrorResponse }>()
);
export const LOAD_PIZZAS_SUCCESS = createAction(
  '[Products] Load Pizzas Success',
  props<{ pizzas: Pizza[] }>()
);
