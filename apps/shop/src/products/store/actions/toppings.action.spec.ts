import { HttpErrorResponse } from '@angular/common/http';

import * as fromToppings from './toppings.action';
import { Topping } from '../../models/topping.model';

const mockErrorResponse: HttpErrorResponse = <HttpErrorResponse>{
  status: 400,
  statusText: 'Bad Request',
};

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

describe('Toppings Action', () => {
  describe('Load Toppings Actions', () => {
    describe('LoadToppings', () => {
      it('should create an action', () => {
        expect(fromToppings.LOAD_TOPPINGS()).toEqual({
          type: fromToppings.LOAD_TOPPINGS.type,
        });
      });
    });

    describe('LoadToppingsFail', () => {
      it('should create an action', () => {
        expect(
          fromToppings.LOAD_TOPPINGS_FAIL({ error: mockErrorResponse })
        ).toEqual({
          type: fromToppings.LOAD_TOPPINGS_FAIL.type,
          error: mockErrorResponse,
        });
      });
    });

    describe('LoadToppingsSuccess', () => {
      it('should create an action', () => {
        expect(
          fromToppings.LOAD_TOPPINGS_SUCCESS({ toppings: mockToppings })
        ).toEqual({
          type: fromToppings.LOAD_TOPPINGS_SUCCESS.type,
          toppings: mockToppings,
        });
      });
    });
  });

  describe('Visualise Toppings Actions', () => {
    describe('VisualiseToppings', () => {
      it('should create an action', () => {
        expect(
          fromToppings.VISUALISE_TOPPINGS({
            selectedToppings: [1, 2],
          })
        ).toEqual({
          type: fromToppings.VISUALISE_TOPPINGS.type,
          selectedToppings: [1, 2],
        });
      });
    });
  });
});
