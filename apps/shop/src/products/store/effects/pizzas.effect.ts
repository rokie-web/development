import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import * as pizzaActions from '../actions/pizzas.action';
import * as fromServices from '../../services';

@Injectable()
export class PizzasEffects {
  loadPizzas$ = createEffect(() =>
    this.actions$.pipe(
      ofType(pizzaActions.LOAD_PIZZAS),
      switchMap(() => {
        return this.pizzaService.getPizzas().pipe(
          map(
            (pizza) => pizzaActions.LOAD_PIZZAS_SUCCESS({ pizza }),
            catchError((error) => of(pizzaActions.LOAD_PIZZAS_FAIL({ error })))
          )
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private pizzaService: fromServices.PizzasService
  ) {}
}
