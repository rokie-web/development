import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Topping } from '../models/topping.model';

import { URL } from 'apps/shop/config';

@Injectable()
export class ToppingsService {
  constructor(private http: HttpClient) {}

  getToppings(): Observable<Topping[]> {
    return this.http.get<Topping[]>(`${URL}/toppings`);
  }
}
