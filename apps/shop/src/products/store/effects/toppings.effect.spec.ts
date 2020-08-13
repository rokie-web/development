import { TestBed } from '@angular/core/testing';
import { HttpErrorResponse } from '@angular/common/http';

import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import { ToppingsEffects } from './toppings.effect';
import { ToppingsService } from '../../services/toppings.service';
import { Topping } from '../../models/topping.model';

import * as fromActions from '../actions/toppings.action';

const mockToppings: Topping[] = [
  {
    id: 1,
    name: 'test 1',
  },
  {
    id: 2,
    name: 'test 2',
  },
];

const mockErrorResponse: HttpErrorResponse = <HttpErrorResponse>{
  status: 400,
  statusText: 'Bad Request',
};

describe('ToppingsEffects', () => {
  let effects: ToppingsEffects;
  let service: ToppingsService;
  let actions$: Observable<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ToppingsEffects,
        {
          provide: ToppingsService,
          useValue: { getToppings: jest.fn() },
        },
        provideMockActions(() => actions$),
      ],
    });

    effects = TestBed.inject(ToppingsEffects);
    service = TestBed.inject(ToppingsService);
    actions$ = TestBed.inject(Actions);
  });

  describe('loadToppings$', () => {
    it('should return a collection from LoadToppingsSuccess', () => {
      const action = fromActions.LOAD_TOPPINGS();
      const completion = fromActions.LOAD_TOPPINGS_SUCCESS({
        toppings: mockToppings,
      });

      actions$ = hot('-a', { a: action });
      const response = cold('-a|', { a: mockToppings });
      const expected = cold('--b', { b: completion });
      service.getToppings = jest.fn(() => response);

      expect(effects.loadToppings$).toBeObservable(expected);
    });
  });

  it('should return an error from LoadToppingsFail', () => {
    const action = fromActions.LOAD_TOPPINGS();
    const completion = fromActions.LOAD_TOPPINGS_FAIL({
      error: mockErrorResponse,
    });

    actions$ = hot('-a', { a: action });
    const response = cold('-#|', {}, mockErrorResponse);
    const expected = cold('--b', { b: completion });
    service.getToppings = jest.fn(() => response);

    expect(effects.loadToppings$).toBeObservable(expected);
  });
});
