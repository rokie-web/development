import { TestBed } from '@angular/core/testing';
import { StoreModule, Store, combineReducers } from '@ngrx/store';

import * as fromRoot from '../../../app/store/reducers';
import * as fromReducers from '../reducers';
import * as fromActions from '../actions';
import * as fromSelectors from './toppings.selector';

import { Topping } from '../../models/topping.model';

describe('Toppings Selectors', () => {
  let store: Store<fromReducers.ProductState>;

  const mockToppings: Topping[] = [
    {
      id: 1,
      name: 'test 1',
    },
    {
      id: 2,
      name: 'test 2',
    },
    {
      id: 3,
      name: 'test 3',
    },
  ];

  const entities = {
    1: mockToppings[0],
    2: mockToppings[1],
    3: mockToppings[2],
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers,
          products: combineReducers(fromReducers.REDUCERS),
        }),
      ],
    });

    store = TestBed.inject(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('selectToppingsEntities', () => {
    it('should return toppings as entities', () => {
      let result;

      store
        .select(fromSelectors.selectToppingsEntities)
        .subscribe((value) => (result = value));

      expect(result).toStrictEqual({});

      store.dispatch(
        fromActions.LOAD_TOPPINGS_SUCCESS({ toppings: mockToppings })
      );

      expect(result).toStrictEqual(entities);
    });
  });

  describe('selectSelectedToppings', () => {
    it('should return selected toppings as ids', () => {
      let result;

      store
        .select(fromSelectors.selectSelectedToppings)
        .subscribe((value) => (result = value));

      store.dispatch(
        fromActions.LOAD_TOPPINGS_SUCCESS({ toppings: mockToppings })
      );

      expect(result).toStrictEqual([]);

      store.dispatch(
        fromActions.VISUALISE_TOPPINGS({ selectedToppings: [1, 3] })
      );

      expect(result).toStrictEqual([1, 3]);
    });
  });

  describe('selectAllToppings', () => {
    it('should return all toppings', () => {
      let result;

      store
        .select(fromSelectors.selectAllToppings)
        .subscribe((value) => (result = value));

      expect(result).toStrictEqual([]);

      store.dispatch(
        fromActions.LOAD_TOPPINGS_SUCCESS({ toppings: mockToppings })
      );

      expect(result).toStrictEqual(mockToppings);
    });
  });

  describe('selectToppingsLoading', () => {
    it('should return loading as boolean', () => {
      let result;

      store
        .select(fromSelectors.selectToppingsLoading)
        .subscribe((value) => (result = value));

      expect(result).toBe(false);

      store.dispatch(fromActions.LOAD_TOPPINGS());

      expect(result).toStrictEqual(true);
    });
  });

  describe('selectToppingsLoaded', () => {
    it('should return loaded as boolean', () => {
      let result;

      store
        .select(fromSelectors.selectToppingsLoaded)
        .subscribe((value) => (result = value));

      expect(result).toStrictEqual(false);

      store.dispatch(
        fromActions.LOAD_TOPPINGS_SUCCESS({ toppings: mockToppings })
      );

      expect(result).toStrictEqual(true);
    });
  });
});
