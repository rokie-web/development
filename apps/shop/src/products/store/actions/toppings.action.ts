import { HttpErrorResponse } from '@angular/common/http';

import { createAction, props } from '@ngrx/store';

import { Topping } from '../../models/topping.model';

export const LOAD_TOPPINGS = createAction('[Products] Load Toppings');
export const LOAD_TOPPINGS_FAIL = createAction(
  '[Products] Load Toppings Fail',
  props<{ error: HttpErrorResponse }>()
);
export const LOAD_TOPPINGS_SUCCESS = createAction(
  '[Products] Load Toppings Success',
  props<{ toppings: Topping[] }>()
);

export const VISUALISE_TOPPINGS = createAction(
  '[Products] Visualise Toppings',
  props<{ selectedToppings: number[] }>()
);
