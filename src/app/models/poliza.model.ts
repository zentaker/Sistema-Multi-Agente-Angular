import { Asesor } from "./asesor.model";
import { Beneficio } from "./beneficio.model";
import { Cobertura } from "./cobertura.model";

interface _PolizaUser {
  _id: string;
  nombre: string;
  email: string
  img: string;

}

export class Poliza {
  constructor(
    public nombre: string,
    public oferta: boolean,
    public numeroPoliza: string,
    public producto: string,
    public bienAsegurado: string,
    public valorAsegurado: string,
    public beneficios?: Beneficio,
    public coberturas?: Cobertura,
    public usuario?: _PolizaUser,
    public asesor?: Asesor,
    public _id?: string,
    public img?: string,

  ){}
}
