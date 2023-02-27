import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CsvService {

  covidData = 'https://www.cdc.gov/coronavirus/2019-ncov/map-data-cases.csv';

  constructor(private http : HttpClient){}

  getInfo(){
    return this.http.get(this.covidData, {responseType: 'text'});
  }

}
