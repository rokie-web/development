import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Pizza } from '../models/pizza.model';

import { URL } from 'apps/shop/config';

@Injectable()
export class PizzasService {
  constructor(private http: HttpClient) {}

  getPizzas(): Observable<Pizza[]> {
    return this.http.get<Pizza[]>(`${URL}/pizzas`);
  }

  createPizza(payload: Pizza): Observable<Pizza> {
    return this.http.post<Pizza>(`${URL}/pizzas`, payload);
  }

  updatePizza(payload: Pizza): Observable<Pizza> {
    return this.http.put<Pizza>(`${URL}/pizzas/${payload.id}`, payload);
  }

  removePizza(payload: Pizza): Observable<Pizza> {
    return this.http.delete<any>(`${URL}/pizzas/${payload.id}`);
  }
}
