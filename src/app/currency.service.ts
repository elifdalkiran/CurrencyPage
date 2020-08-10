import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  currency: string;

  constructor(
    private _http: HttpClient
  ) { }

  getHistorical(base: string, symbols: string, start: string, end: string): Observable<any> {
    // start: 2018-01-01 end: 2018-09-01, base: TRY
    return this._http.get(`https://api.exchangeratesapi.io/history?start_at=${start}&end_at=${end}&base=${base}&symbols=${symbols}`);
  }

  
  getLatest(): Observable<any> {
    return this._http.get('https://api.exchangeratesapi.io/latest?base=TRY');
  }
}
