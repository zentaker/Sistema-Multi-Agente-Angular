import { Beneficio } from "./beneficio.model";
import { Cobertura } from "./cobertura.model";

interface _PolizaUser {
  _id: string;
  nombre: string;
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
    public beneficio?: Beneficio,
    public cobertura?: Cobertura,
    public usuario?: _PolizaUser,
    public _id?: string,
    public img?: string,

  ){}
}
