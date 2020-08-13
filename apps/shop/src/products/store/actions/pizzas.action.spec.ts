import { HttpErrorResponse } from '@angular/common/http';

import * as fromPizzas from './pizzas.action';
import { Pizza } from '../../models/pizza.model';

const mockErrorResponse: HttpErrorResponse = <HttpErrorResponse>{
  status: 400,
  statusText: 'Bad Request',
};

const mockPizzas: Pizza[] = [
  {
    name: "Test Pizza 1'",
    toppings: [
      {
        id: 1,
        name: 'test',
      },
    ],
    id: 1,
  },
  {
    name: "Test Pizza 2'",
    toppings: [
      {
        id: 1,
        name: 'test',
      },
    ],
    id: 2,
  },
];

describe('Pizzas Action', () => {
  describe('Load Pizzas Actions', () => {
    describe('LoadPizzas', () => {
      it('should create an action', () => {
        expect(fromPizzas.LOAD_PIZZAS()).toEqual({
          type: fromPizzas.LOAD_PIZZAS.type,
        });
      });
    });

    describe('LoadPizzasFail', () => {
      it('should create an action', () => {
        expect(
          fromPizzas.LOAD_PIZZAS_FAIL({ error: mockErrorResponse })
        ).toEqual({
          type: fromPizzas.LOAD_PIZZAS_FAIL.type,
          error: mockErrorResponse,
        });
      });
    });

    describe('LoadPizzasSuccess', () => {
      it('should create an action', () => {
        expect(fromPizzas.LOAD_PIZZAS_SUCCESS({ pizzas: mockPizzas })).toEqual({
          type: fromPizzas.LOAD_PIZZAS_SUCCESS.type,
          pizzas: mockPizzas,
        });
      });
    });
  });

  describe('Create Pizzas Actions', () => {
    describe('CreatePizza', () => {
      it('should create an action', () => {
        expect(fromPizzas.CREATE_PIZZA({ pizza: mockPizzas[0] })).toEqual({
          type: fromPizzas.CREATE_PIZZA.type,
          pizza: mockPizzas[0],
        });
      });
    });

    describe('CreatePizzaFail', () => {
      it('should create an action', () => {
        expect(
          fromPizzas.CREATE_PIZZA_FAIL({ error: mockErrorResponse })
        ).toEqual({
          type: fromPizzas.CREATE_PIZZA_FAIL.type,
          error: mockErrorResponse,
        });
      });
    });

    describe('CreatePizzaSuccess', () => {
      it('should create an action', () => {
        expect(
          fromPizzas.CREATE_PIZZA_SUCCESS({ pizza: mockPizzas[0] })
        ).toEqual({
          type: fromPizzas.CREATE_PIZZA_SUCCESS.type,
          pizza: mockPizzas[0],
        });
      });
    });
  });

  describe('Update Pizzas Actions', () => {
    describe('UpdatePizza', () => {
      it('should create an action', () => {
        expect(fromPizzas.UPDATE_PIZZA({ pizza: mockPizzas[0] })).toEqual({
          type: fromPizzas.UPDATE_PIZZA.type,
          pizza: mockPizzas[0],
        });
      });
    });

    describe('UpdatePizzaFail', () => {
      it('should create an action', () => {
        expect(
          fromPizzas.UPDATE_PIZZA_FAIL({ error: mockErrorResponse })
        ).toEqual({
          type: fromPizzas.UPDATE_PIZZA_FAIL.type,
          error: mockErrorResponse,
        });
      });
    });

    describe('UpdatePizzaSuccess', () => {
      it('should create an action', () => {
        expect(
          fromPizzas.UPDATE_PIZZA_SUCCESS({ pizza: mockPizzas[0] })
        ).toEqual({
          type: fromPizzas.UPDATE_PIZZA_SUCCESS.type,
          pizza: mockPizzas[0],
        });
      });
    });
  });

  describe('Remove Pizzas Actions', () => {
    describe('RemovePizza', () => {
      it('should create an action', () => {
        expect(fromPizzas.REMOVE_PIZZA({ pizza: mockPizzas[0] })).toEqual({
          type: fromPizzas.REMOVE_PIZZA.type,
          pizza: mockPizzas[0],
        });
      });
    });

    describe('RemovePizzaFail', () => {
      it('should create an action', () => {
        expect(
          fromPizzas.REMOVE_PIZZA_FAIL({ error: mockErrorResponse })
        ).toEqual({
          type: fromPizzas.REMOVE_PIZZA_FAIL.type,
          error: mockErrorResponse,
        });
      });
    });

    describe('RemovePizzaSuccess', () => {
      it('should create an action', () => {
        expect(
          fromPizzas.REMOVE_PIZZA_SUCCESS({ pizza: mockPizzas[0] })
        ).toEqual({
          type: fromPizzas.REMOVE_PIZZA_SUCCESS.type,
          pizza: mockPizzas[0],
        });
      });
    });
  });
});
