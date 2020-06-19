import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError, EMPTY } from 'rxjs';
import { catchError, share } from 'rxjs/operators';

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
    //.pipe(catchError((error: any) => Observable.throw(error.json())));
  }

  updatePizza(payload: Pizza): Observable<Pizza> {
    return this.http.put<Pizza>(`${URL}/pizzas/${payload.id}`, payload);
    //.pipe(catchError((error: any) => Observable.throw(error.json())));
  }

  removePizza(payload: Pizza): Observable<Pizza> {
    return this.http.delete<any>(`${URL}/pizzas/${payload.id}`);
    //.pipe(catchError((error: any) => Observable.throw(error.json())));
  }
}
