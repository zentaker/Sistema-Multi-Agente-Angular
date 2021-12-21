import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { retry, take, map, filter } from 'rxjs/operators'


@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnDestroy  {

  public intervalSubs: Subscription;
  ngOnDestroy() {
    this.intervalSubs.unsubscribe();
  }

  constructor() {



/*   this.retornarObservable().pipe(
    //una tuberia para tranformar la informacion que fluye, tambien reintentar
    retry()
  ).subscribe(
    valor => console.log('subs:', valor),
      error => console.warn('error', error),
      () => console.info('obs terminado')
  ); */
  this.intervalSubs = this.retiornaIntervalo()
  .subscribe(
    //(valor) => console.log(valor)
  )
   }
   retiornaIntervalo():Observable<number> {
     const interval$ = interval(500).pipe(
        //take(10),
        map(valor => {
       return valor + 1;
     }), filter(valor => (valor % 2 === 0) ? true: false))
     return interval$;
   }

   retornarObservable():Observable<number> {
    let i =-1;
    const obs$ = new Observable<number>( observer => {

      const intervalo = setInterval( () => {
         i++;
         observer.next(i);
         if(i ===4) {
           clearInterval(intervalo);
           observer.complete();
         }
         if (i ===2) {
           observer.error('i llego al valor de 2');
         }

       }, 1000)

     });
     return obs$;
   }




}
