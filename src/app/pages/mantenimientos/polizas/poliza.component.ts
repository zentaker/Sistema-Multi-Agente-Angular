import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Asesor } from 'src/app/models/asesor.model';
import { Beneficio } from 'src/app/models/beneficio.model';
import { Cobertura } from 'src/app/models/cobertura.model';
import { Poliza } from 'src/app/models/poliza.model';
import { Usuario } from 'src/app/models/usuario.model';
import { AsesorService } from 'src/app/services/asesor.service';
import { BeneficioService } from 'src/app/services/beneficio.service';
import { CoberturaService } from 'src/app/services/cobertura.service';
import { PolizaService } from 'src/app/services/poliza.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';
export {};



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

  public arrCobertura: Cobertura[]=[];
  public arrbeneficios: Beneficio[]=[];

  public polizaSelecionado: Poliza;

  constructor( private fb: FormBuilder,
                private usuarioService: UsuarioService,
                private asesorService: AsesorService,
                private beneficiosService: BeneficioService,
                private coberturasService: CoberturaService,
                private polizaServices: PolizaService,
                private router: Router,
                private activatedRoute: ActivatedRoute) { }
  get beneficios() {
    return this.polizaForm.get('beneficios') as FormArray;
  }
  get coberturas() {
    return this.polizaForm.get('coberturas') as FormArray;
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({id}) =>{
      this.cargarPoliza(id);
    })

    //

    this.cargarUsuarios();
    this.cargarAsesores();
    this.cargarBeneficios();
    this.cargarCoberturas();

    this.polizaForm = this.fb.group({
      nombre: ['', Validators.required],
      numeroPoliza: ['', Validators.required],
      producto: ['', Validators.required],
      bienAsegurado: ['', Validators.required],
      valorAsegurado: ['', Validators.required],
      logo: [''],
      oferta: [false, Validators.required],
      usuario: ['', Validators.required],
      asesor: ['', Validators.required],
      beneficios: this.fb.array([ ]),
      coberturas: this.fb.array([])

    })
  }

  cargarPoliza(id: string) {
    if(id === 'nuevo'){
      return;
    }
    this.polizaServices.obtenerPolizaPorId(id).subscribe( poliza => {
      console.log(poliza)

      //si la poliza no existe
      if(!poliza) {
        return this.router.navigateByUrl(`/dashboard/polizas`);
      }
      let {nombre,numeroPoliza, producto,bienAsegurado, valorAsegurado,oferta, ...otras  } = poliza

      //console.log(poliza.beneficio)
      const logo = '';
      this.polizaSelecionado = poliza;
      this.polizaForm.reset({
        nombre,
        numeroPoliza,
        producto,
        bienAsegurado,
        valorAsegurado,
        oferta,
        usuario: otras.usuario._id,
        asesor:otras.asesor._id,
        logo
      });
      console.log(Object.values(otras.beneficios));

      this.arrbeneficios = Object.values(otras.coberturas);


      this.arrCobertura = Object.values(otras.beneficios);



      //TODO: pasarle el arreglo de beneficios y coberturas

      this.arrCobertura.forEach( valor => {
        this.beneficios.push(this.fb.control(valor))
      });

      this.arrbeneficios.forEach( valor => {
        this.coberturas.push(this.fb.control(valor));
      });



    })


  }
  cargarUsuarios() {
    this.usuarioService.cargarUsuarios(0).subscribe(({total, usuarios}) => {
      this.usuarios = usuarios;
      //console.log(usuarios)
    })
  }

  cargarAsesores(){
    this.asesorService.cargarAsesores().subscribe(asesores => {
      //console.log(asesores)
      this.asesores = asesores;
    })

  }
  cargarBeneficios() {
    this.beneficiosService.cargarBeneficios().subscribe( beneficios => {
      //console.log(beneficios)
      this.beneficio = beneficios;
    })

  }
  cargarCoberturas() {
    this.coberturasService.cargarCoberturas().subscribe( coberturas => {
      //console.log(coberturas);
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
    const {nombre} =this.polizaForm.value;

    if (this.polizaSelecionado) {
      // actualizar
      const data = {
        ...this.polizaForm.value,
        _id: this.polizaSelecionado._id
      }
      this.polizaServices.actualizarPolizas(data).subscribe( resp => {
        Swal.fire('Actualizado', `${nombre} actualizado correctamente`, 'success');

      })
    } else {
      //crear

      this.polizaServices.crearPolizas(this.polizaForm.value).subscribe( (resp: any) => {
        console.log(resp)
        Swal.fire('Creado', `${nombre} creado correctamente`, 'success');
        this.router.navigateByUrl(`/dashboard/poliza/${resp.poliza._id}`);
      // forzar actualizar el dom actualizar el dom
      //window.location.reload();
      //this.arrbeneficios.pop();
      //this.arrCobertura.pop();
    })
  }
  }



}
