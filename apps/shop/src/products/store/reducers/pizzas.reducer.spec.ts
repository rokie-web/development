import { HttpErrorResponse } from '@angular/common/http';

import * as fromPizzas from '../reducers/pizzas.reducer';
import * as fromActions from '../actions/pizzas.action';

import { Pizza } from '../../models/pizza.model';

const mockErrorResponse: HttpErrorResponse = <HttpErrorResponse>{
  status: 400,
  statusText: 'Bad Request',
};

const mockPizzas: Pizza[] = [
  { id: 1, name: 'Pizza #1', toppings: [] },
  { id: 2, name: 'Pizza #2', toppings: [] },
];

describe('PizzasReducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const { INITIAL_STATE } = fromPizzas;
      const action = {};
      const state = fromPizzas.pizzaReducer(undefined, action);

      expect(state).toBe(INITIAL_STATE);
    });
  });

  describe('LOAD_PIZZAS action', () => {
    it('should set loading to true', () => {
      const { INITIAL_STATE } = fromPizzas;
      const action = fromActions.LOAD_PIZZAS();
      const state = fromPizzas.pizzaReducer(INITIAL_STATE, action);

      expect(state.loading).toStrictEqual(true);
    });
  });

  describe('LOAD_PIZZAS_SUCCESS action', () => {
    it('should map an array to entities', () => {
      const entities = {
        1: mockPizzas[0],
        2: mockPizzas[1],
      };

      const { INITIAL_STATE } = fromPizzas;
      const action = fromActions.LOAD_PIZZAS_SUCCESS({ pizzas: mockPizzas });
      const state = fromPizzas.pizzaReducer(INITIAL_STATE, action);

      expect(state.entities).toStrictEqual(entities);
      expect(state.loaded).toStrictEqual(true);
      expect(state.loading).toStrictEqual(false);
    });
  });

  describe('LOAD_PIZZAS_FAIL action', () => {
    it('should set loaded and loading to false', () => {
      const { INITIAL_STATE } = fromPizzas;
      const previousState = { ...INITIAL_STATE, loaded: true, loading: true };
      const action = fromActions.LOAD_PIZZAS_FAIL({ error: mockErrorResponse });
      const state = fromPizzas.pizzaReducer(previousState, action);

      expect(state.loaded).toStrictEqual(false);
      expect(state.loading).toStrictEqual(false);
    });
  });

  describe('CREATE_PIZZA_SUCCESS action', () => {
    it('should add a pizza to the entities', () => {
      const entities = {
        1: mockPizzas[0],
      };

      const { INITIAL_STATE } = fromPizzas;
      const action = fromActions.CREATE_PIZZA_SUCCESS({ pizza: mockPizzas[0] });
      const state = fromPizzas.pizzaReducer(INITIAL_STATE, action);

      expect(state.entities).toStrictEqual(entities);
    });
  });

  describe('UPDATE_PIZZA_SUCCESS action', () => {
    it('should update a pizza to the entities', () => {
      const entities = {
        1: mockPizzas[0],
      };

      const { INITIAL_STATE } = fromPizzas;
      const action = fromActions.UPDATE_PIZZA_SUCCESS({ pizza: mockPizzas[0] });
      const state = fromPizzas.pizzaReducer(INITIAL_STATE, action);

      expect(state.entities).toStrictEqual(entities);
    });
  });

  describe('REMOVE_PIZZA_SUCCESS action', () => {
    it('should remove a pizza from the entities', () => {
      const entities = {
        1: mockPizzas[0],
        2: mockPizzas[1],
      };

      const { INITIAL_STATE } = fromPizzas;
      const previousState = { ...INITIAL_STATE, entities };
      const action = fromActions.REMOVE_PIZZA_SUCCESS({ pizza: mockPizzas[0] });
      const state = fromPizzas.pizzaReducer(previousState, action);

      expect(state.entities).toStrictEqual({ 2: mockPizzas[1] });
    });
  });
});
