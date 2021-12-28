interface _AsesorUser {
  _id: string;
  nombre: string;
  img: string
}

export class Asesor {
  constructor (
    public _id: string,
    public nombre: string,
    public bienvenida: string,
    public whatsapp: string,
    public celular: string,
    public correo: string,
    public img?: string,
    public usuario?: _AsesorUser
  )  {}





}
