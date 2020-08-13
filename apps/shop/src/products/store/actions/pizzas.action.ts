import { HttpErrorResponse } from '@angular/common/http';

import { createAction, props } from '@ngrx/store';

import { Pizza } from '../../models/pizza.model';

//load pizzas
export const LOAD_PIZZAS = createAction('[Products] Load Pizzas');
export const LOAD_PIZZAS_FAIL = createAction(
  '[Products] Load Pizzas Fail',
  props<{ error: HttpErrorResponse }>()
);
export const LOAD_PIZZAS_SUCCESS = createAction(
  '[Products] Load Pizzas Success',
  props<{ pizzas: Pizza[] }>()
);

//create pizza
export const CREATE_PIZZA = createAction(
  '[Products] Create Pizza',
  props<{ pizza: Pizza }>()
);
export const CREATE_PIZZA_FAIL = createAction(
  '[Products] Create Pizza Fail',
  props<{ error: HttpErrorResponse }>()
);
export const CREATE_PIZZA_SUCCESS = createAction(
  '[Products] Create Pizza Success',
  props<{ pizza: Pizza }>()
);

//update pizza
export const UPDATE_PIZZA = createAction(
  '[Products] Update Pizza',
  props<{ pizza: Pizza }>()
);
export const UPDATE_PIZZA_FAIL = createAction(
  '[Products] Update Pizza Fail',
  props<{ error: HttpErrorResponse }>()
);
export const UPDATE_PIZZA_SUCCESS = createAction(
  '[Products] Update Pizza Success',
  props<{ pizza: Pizza }>()
);

//remove pizza
export const REMOVE_PIZZA = createAction(
  '[Products] Remove Pizza',
  props<{ pizza: Pizza }>()
);
export const REMOVE_PIZZA_FAIL = createAction(
  '[Products] Remove Pizza Fail',
  props<{ error: HttpErrorResponse }>()
);
export const REMOVE_PIZZA_SUCCESS = createAction(
  '[Products] Remove Pizza Success',
  props<{ pizza: Pizza }>()
);
