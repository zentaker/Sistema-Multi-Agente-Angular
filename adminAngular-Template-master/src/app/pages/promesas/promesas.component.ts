import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [
  ]
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.getUsuario().then(usuarios => {
      console.log(usuarios)
    })
    //no siempre la promesa es asincrona
    const promesa = new Promise( (resolve, reject) => {
      //cuerpo que queremos ejecutar

      //manejar el error
      if(false) {
        resolve('hola mundo')

      }else {

        reject('algo salio mal')
      }
    })
    promesa.then((mensaje) => {
      //lo que quiero ejecutar cuando la promesa se resuelve
      console.log(mensaje)
    }).catch( error => {
      console.log('error en la promesa', error)
    })

    console.log("fin del init")
  }

  getUsuario() {
    const promesa1 = new Promise( resolve => {
      fetch('https://reqres.in/api/users')
      .then(resp =>  resp.json() )
      .then(body => resolve(body.data));

    })
    return promesa1

  }

}
