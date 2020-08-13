import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { of, pipe } from 'rxjs';
import { map, tap, switchMap, catchError } from 'rxjs/operators';

import * as fromActions from '../actions';
import * as fromServices from '../../services';

@Injectable()
export class PizzasEffects {
  loadPizzas$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.LOAD_PIZZAS),
      switchMap(() =>
        this.pizzaService.getPizzas().pipe(
          map((pizzas) => fromActions.LOAD_PIZZAS_SUCCESS({ pizzas })),
          catchError((error) => of(fromActions.LOAD_PIZZAS_FAIL({ error })))
        )
      )
    )
  );

  createPizza$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.CREATE_PIZZA),
      pipe(
        map((payload) => payload.pizza),
        switchMap((pizza) => {
          return this.pizzaService.createPizza(pizza).pipe(
            map((pizzaItem) =>
              fromActions.CREATE_PIZZA_SUCCESS({ pizza: pizzaItem })
            ),
            catchError((error) => of(fromActions.CREATE_PIZZA_FAIL({ error })))
          );
        })
      )
    )
  );

  updatePizza$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.UPDATE_PIZZA),
      pipe(
        map((payload) => payload.pizza),
        switchMap((pizza) => {
          return this.pizzaService.updatePizza(pizza).pipe(
            map((pizzaItem) =>
              fromActions.UPDATE_PIZZA_SUCCESS({ pizza: pizzaItem })
            ),
            catchError((error) => of(fromActions.UPDATE_PIZZA_FAIL({ error })))
          );
        })
      )
    )
  );

  createPizzaSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromActions.CREATE_PIZZA_SUCCESS),
        pipe(
          map((payload) => payload.pizza),
          tap((pizza) => this.router.navigate(['/products', pizza.id]))
        )
      ),
    { dispatch: false }
  );

  removePizza$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.REMOVE_PIZZA),
      pipe(
        map((payload) => payload.pizza),
        switchMap((pizza) => {
          return this.pizzaService.removePizza(pizza).pipe(
            map(() => fromActions.REMOVE_PIZZA_SUCCESS({ pizza })),
            catchError((error) => of(fromActions.REMOVE_PIZZA_FAIL({ error })))
          );
        })
      )
    )
  );

  handlePizzaSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          fromActions.UPDATE_PIZZA_SUCCESS,
          fromActions.REMOVE_PIZZA_SUCCESS
        ),
        tap(() => this.router.navigate(['/products']))
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private pizzaService: fromServices.PizzasService,
    private router: Router
  ) {}
}
