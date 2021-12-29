interface _CoberturaUser {
  _id: string;
  nombre: string;
  img: string;

}

export class Cobertura {
  constructor(
    public nombre: string,
    public usuario: _CoberturaUser,
    public detalle: string,
    public monto: string,
    public _id?: string,

  ){}
}
