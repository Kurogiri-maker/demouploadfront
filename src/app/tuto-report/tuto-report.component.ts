import { Component, OnInit } from '@angular/core';
import { CsvService } from '../services/csv.service';

@Component({
  selector: 'app-tuto-report',
  templateUrl: './tuto-report.component.html',
  styleUrls: ['./tuto-report.component.css']
})
export class TutoReportComponent implements OnInit{
  covidData: any[] = [];
  
  constructor(private csv: CsvService){}

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    this.csv.getInfo().subscribe(data => {
      const list = data.split('\n');
      list.forEach(e => {
        this.covidData.push(e);
      });
    });
  }

  
}
