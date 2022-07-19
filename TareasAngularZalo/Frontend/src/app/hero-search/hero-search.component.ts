import { Component, OnInit } from '@angular/core';
import { Observable, Subject} from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';



@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})


export class HeroSearchComponent implements OnInit {

  heroes$!: Observable<Hero[]>;

  private searchTerms = new Subject <string>();

  constructor(private heroService: HeroService) {}

  // Crear un término de búsqueda en el flujo observable.
  search(term: string): void {
    this.searchTerms.next(term);
  }
 


  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(
      // esperar 300ms después de cada pulsación antes de considerar el término    
      debounceTime(300),

      // ignorar el nuevo término si es el mismo que el anterior      
      distinctUntilChanged(),

      // cambiar a un nuevo observable de búsqueda cada vez que el término cambia
      switchMap((term: string) => this.heroService.searchHeroes(term)),
    );
  }

}

/**
 * A Subjectes tanto una fuente de valores observables como un Observableobjeto en sí mismo. Puede suscribirse a un Subjectcomo lo haría con cualquier otro Observable.

También puede insertar valores en eso Observablellamando a su next(value)método como lo search()hace el método.

El enlace del evento al evento del cuadro de texto inputllama al search()método.
 * 
el ngOnInit()método canaliza lo searchTermsobservable a través de una secuencia de 
operadores RxJS que reducen la cantidad de llamadas al searchHeroes(). En última instancia, 
esto devuelve un observable de resultados de búsqueda de héroes oportunos donde cada uno es un Hero[].
 
Cada operador funciona de la siguiente manera:

debounceTime(300)espera hasta que el flujo de nuevos eventos de cadena se detenga durante 300 milisegundos antes de pasar la última cadena. No es probable que las solicitudes ocurran con más frecuencia de 300 ms.

distinctUntilChanged()asegura que una solicitud se envíe solo si el texto del filtro cambió.

switchMap()llama al servicio de búsqueda para cada término de búsqueda que pasa por debounce()y distinctUntilChanged(). Cancela y descarta los observables de búsqueda anteriores, devolviendo solo el último observable del servicio de búsqueda.
*/
