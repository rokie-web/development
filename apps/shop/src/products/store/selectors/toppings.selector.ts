import { createSelector } from '@ngrx/store';

import { ProductState, selectFeature } from '../reducers';
import { ToppingState, adapter } from '../reducers/toppings.reducer';

const { selectAll, selectEntities } = adapter.getSelectors();

export const selectToppingState = createSelector(
  selectFeature,
  (state: ProductState) => state.toppings
);

export const selectToppingsLoading = createSelector(
  selectToppingState,
  (state: ToppingState) => state.loading
);

export const selectToppingsLoaded = createSelector(
  selectToppingState,
  (state: ToppingState) => state.loaded
);

export const selectSelectedToppings = createSelector(
  selectToppingState,
  (state: ToppingState) => state.selectedToppings
);

export const selectAllToppings = createSelector(selectToppingState, selectAll);

export const selectToppingsEntities = createSelector(
  selectToppingState,
  selectEntities
);
