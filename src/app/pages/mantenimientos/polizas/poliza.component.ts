import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-poliza',
  templateUrl: './poliza.component.html',
  styles: [
  ]
})
export class PolizaComponent implements OnInit {

  public polizaForm: FormGroup;

  constructor( private fb: FormBuilder) { }

  ngOnInit(): void {
    this.polizaForm = this.fb.group({
      nombre: ['Rimac Hogar Multi', Validators.required],
      numeroPoliza: ['BCR5435', Validators.required],
      producto: ['SEG. HOG FLEX', Validators.required],
      bienAsegurado: ['La molina', Validators.required],
      valorAsegurado: ['$500,000.00', Validators.required],
      logo: ['$500,000.00', Validators.required],
      oferta: [true, Validators.required],
      usuario: ['2', Validators.required],
      asesor: ['2', Validators.required]

    })
  }



}
