//import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from './hero';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      { id: 12, name: 'Dr. Nice' },
      { id: 13, name: 'Bombasto' },
      { id: 14, name: 'Celeritas' },
      { id: 15, name: 'Magneta' },
      { id: 16, name: 'RubberMan' },
      { id: 17, name: 'Dynama' },
      { id: 18, name: 'Dr. IQ' },
      { id: 19, name: 'Magma' },
      { id: 20, name: 'Tornado' },
    ];
    return { heroes };
  }
  /** Anula el método genId para asegurar que un héroe siempre tenga un id.
   * Si el array de héroes está vacío, el método de abajo devuelve el número inicial (11).
  Si la matriz de héroes no está vacía, el método de abajo devuelve el mayor id de héroe + 1.
  * El método genId para asegurar que un héroe siempre tiene un id.*/

  genId(heroes: Hero[]): number {
    return heroes.length > 0
      ? Math.max(...heroes.map((hero) => hero.id)) + 1
      : 11;
  }
}

/**
 * El in-memory-data.service.tsarchivo asume la función de mock-heroes.ts.
 * No elimine mock-heroes.tstodavía. Todavía lo necesita para algunos pasos más de este tutorial.
 * Una vez que el servidor esté listo, desconecte la API web en memoria para que las solicitudes
 de la aplicación puedan pasar al servidor.
 */
