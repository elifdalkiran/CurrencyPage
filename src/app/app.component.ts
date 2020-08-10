import { Component } from '@angular/core';
import { CurrencyService } from './currency.service';
import DataSource from 'devextreme/data/data_source';
import CustomStore from 'devextreme/data/custom_store';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [CurrencyService, DatePipe]
})
export class AppComponent {
  title = 'CurrencyPage';
  historicalDataSource: DataSource;
  currencies: any[] = [
      { value: "USD", name: "Dollar" },
      { value: "EUR", name: "Euro" }
  ];
  latest: any = null;
  latestArray: any = [];

  constructor(
    private service: CurrencyService,
    private datePipe: DatePipe
  ) {
    const now = new Date();
    const base = 'TRY';
    const startDate = this.datePipe.transform(new Date().setDate(now.getDate() - 30), 'yyyy-MM-dd');
    const endDate = this.datePipe.transform(new Date().setDate(now.getDate() - 1), 'yyyy-MM-dd');

    this.historicalDataSource = new DataSource({
      store: new CustomStore({
        load: (loadOptions) => {

          return this.service
            .getHistorical(base, 'USD,EUR', startDate, endDate).toPromise()
            .then(result => {
              const data = Object.keys(result.rates).map(function(key){
                const rate = result.rates[key];
                rate.date = new Date(key);
                return rate;
              });              

              return {
                data: data
              }
            });
        }
      })
    });

    this.service.getLatest().subscribe(result => {
      console.log(result);

      result.rates['USD']

      this.latestArray.push({
        'dovizBirimi': 'USD',
        'alis': 1 / result.rates['USD'],
        'satis': (1 / result.rates['USD']) - 0.3
      });
      
      
      this.latestArray.push({
        'dovizBirimi': 'EUR',
        'alis': 1 / result.rates['EUR'],
        'satis': (1 / result.rates['EUR']) - 0.3
      });

      this.latest = result;
    });
  }

  ngOnInit():void {
  }
}

