import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Asesor } from 'src/app/models/asesor.model';
import { Beneficio } from 'src/app/models/beneficio.model';
import { Cobertura } from 'src/app/models/cobertura.model';
import { Usuario } from 'src/app/models/usuario.model';
import { AsesorService } from 'src/app/services/asesor.service';
import { BeneficioService } from 'src/app/services/beneficio.service';
import { CoberturaService } from 'src/app/services/cobertura.service';
import { UsuarioService } from 'src/app/services/usuario.service';


@Component({
  selector: 'app-poliza',
  templateUrl: './poliza.component.html',
  styles: [
  ]
})
export class PolizaComponent implements OnInit {

  public polizaForm: FormGroup;
  public usuarios: Usuario[]=[];
  public asesores: Asesor[]=[];
  public beneficio: Beneficio[]=[];
  public cobertura: Cobertura[]=[];

  constructor( private fb: FormBuilder,
                private usuarioService: UsuarioService,
                private asesorService: AsesorService,
                private beneficiosService: BeneficioService,
                private coberturasService: CoberturaService) { }
  get beneficios() {
    return this.polizaForm.get('beneficios') as FormArray;
  }
  get coberturas() {
    return this.polizaForm.get('coberturas') as FormArray;
  }

  ngOnInit(): void {

    this.cargarUsuarios();
    this.cargarAsesores();
    this.cargarBeneficios();
    this.cargarCoberturas();

    this.polizaForm = this.fb.group({
      nombre: ['Rimac Hogar Multi', Validators.required],
      numeroPoliza: ['BCR5435', Validators.required],
      producto: ['SEG. HOG FLEX', Validators.required],
      bienAsegurado: ['La molina', Validators.required],
      valorAsegurado: ['$500,000.00', Validators.required],
      logo: ['$500,000.00', Validators.required],
      oferta: [false, Validators.required],
      usuario: ['', Validators.required],
      asesor: ['', Validators.required],
      beneficios: this.fb.array([ ]),
      coberturas: this.fb.array([])

    })
  }
  cargarUsuarios() {
    this.usuarioService.cargarUsuarios(0).subscribe(({total, usuarios}) => {
      this.usuarios = usuarios;
      console.log(usuarios)
    })
  }
  cargarAsesores(){
    this.asesorService.cargarAsesores().subscribe(asesores => {
      console.log(asesores)
      this.asesores = asesores;
    })

  }
  cargarBeneficios() {
    this.beneficiosService.cargarBeneficios().subscribe( beneficios => {
      console.log(beneficios)
      this.beneficio = beneficios;
    })

  }
  cargarCoberturas() {
    this.coberturasService.cargarCoberturas().subscribe( coberturas => {
      console.log(coberturas);
      this.cobertura = coberturas;

    })
  }

  agregarbeneficio(){
    this.beneficios.push(this.fb.control(''))
  }
  borrarBeneficio(i: number){
    this.beneficios.removeAt(i);

  }
  agregarCobertura(){
    this.coberturas.push(this.fb.control(''))
  }
  borrarCobertura(i: number){
    this.coberturas.removeAt(i);

  }

  guardarPoliza() {
    console.log(this.polizaForm.value);
  }



}
