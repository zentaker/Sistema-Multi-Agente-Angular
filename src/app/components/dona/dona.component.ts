import { Component, Input, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label, Color } from 'ng2-charts';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent implements OnInit {
  @Input() title: string = 'sin titulo'

  @Input('labels') doughnutChartLabels: Label[] = ['data1', 'data2', 'data3'];
  @Input('data') doughnutChartData: MultiDataSet = [
    [350, 450, 100],

  ];
  public doughnutChartType: ChartType = 'doughnut';

  public colors:Color[] = [
    {backgroundColor: ['#6857e6', '#009fee', '#f02059']}
  ]


  constructor() { }

  ngOnInit(): void {
  }

}
