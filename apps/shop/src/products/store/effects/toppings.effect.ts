import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import * as fromActions from '../actions';
import * as fromServices from '../../services';

@Injectable()
export class ToppingsEffects {
  loadToppings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.LOAD_TOPPINGS),
      switchMap(() =>
        this.toppingsService.getToppings().pipe(
          map((toppings) => fromActions.LOAD_TOPPINGS_SUCCESS({ toppings })),
          catchError((error) => of(fromActions.LOAD_TOPPINGS_FAIL({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private toppingsService: fromServices.ToppingsService
  ) {}
}
