interface _BeneficioUser {
  _id: string;
  nombre: string;
  img: string;

}

export class Beneficio {
  constructor(
    public nombre: string,
    public usuario: _BeneficioUser,
    public detalle: string,
    public _id?: string,

  ){}
}
