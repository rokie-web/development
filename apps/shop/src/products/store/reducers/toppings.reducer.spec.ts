import { HttpErrorResponse } from '@angular/common/http';

import * as fromToppings from '../reducers/toppings.reducer';
import * as fromActions from '../actions/toppings.action';

import { Topping } from '../../models/topping.model';

const mockErrorResponse: HttpErrorResponse = <HttpErrorResponse>{
  status: 400,
  statusText: 'Bad Request',
};

const mockToppings: Topping[] = [
  { id: 1, name: 'Topping #1' },
  { id: 2, name: 'Topping #2' },
];

describe('ToppingsReducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const { INITIAL_STATE } = fromToppings;
      const action = {};
      const state = fromToppings.toppingReducer(undefined, action);

      expect(state).toBe(INITIAL_STATE);
    });
  });

  describe('LOAD_TOPPINGS action', () => {
    it('should set loading to true', () => {
      const { INITIAL_STATE } = fromToppings;
      const action = fromActions.LOAD_TOPPINGS();
      const state = fromToppings.toppingReducer(INITIAL_STATE, action);

      expect(state.loading).toStrictEqual(true);
    });
  });

  describe('LOAD_TOPPINGS_SUCCESS action', () => {
    it('should map an array to entities', () => {
      const entities = {
        1: mockToppings[0],
        2: mockToppings[1],
      };

      const { INITIAL_STATE } = fromToppings;
      const action = fromActions.LOAD_TOPPINGS_SUCCESS({
        toppings: mockToppings,
      });
      const state = fromToppings.toppingReducer(INITIAL_STATE, action);

      expect(state.entities).toStrictEqual(entities);
      expect(state.loaded).toStrictEqual(true);
      expect(state.loading).toStrictEqual(false);
    });
  });

  describe('LOAD_TOPPINGS_FAIL action', () => {
    it('should set loaded and loading to false', () => {
      const { INITIAL_STATE } = fromToppings;
      const previousState = { ...INITIAL_STATE, loaded: true, loading: true };
      const action = fromActions.LOAD_TOPPINGS_FAIL({
        error: mockErrorResponse,
      });
      const state = fromToppings.toppingReducer(previousState, action);

      expect(state.loaded).toStrictEqual(false);
      expect(state.loading).toStrictEqual(false);
    });
  });

  describe('VISUALISE_TOPPINGS action', () => {
    it('should add an array of selectedToppings ids', () => {
      const { INITIAL_STATE } = fromToppings;
      const action = fromActions.VISUALISE_TOPPINGS({
        selectedToppings: [1, 2, 3],
      });
      const state = fromToppings.toppingReducer(INITIAL_STATE, action);

      expect(state.selectedToppings).toStrictEqual([1, 2, 3]);
    });
  });
});
