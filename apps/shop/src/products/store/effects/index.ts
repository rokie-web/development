import { PizzasEffects } from './pizzas.effect';
import { ToppingsEffects } from './toppings.effect';

export const EFFECTS: [typeof PizzasEffects, typeof ToppingsEffects] = [
  PizzasEffects,
  ToppingsEffects,
];

export * from './pizzas.effect';
export * from './toppings.effect';
