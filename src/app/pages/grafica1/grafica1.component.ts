import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component implements OnInit {
  public labels1: string[] = ['pan', 'refresco', 'tacos']
  public data1 = [
    [15, 20, 40,]

  ];

  constructor() { }

  ngOnInit(): void {
  }

}
