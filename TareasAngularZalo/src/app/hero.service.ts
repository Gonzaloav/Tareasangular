import { Injectable } from '@angular/core';
import { Hero } from "./hero";
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})


export class HeroService {

  constructor(private messageService: MessageService) { }


  getHero(id: number): Observable<Hero> {
    // Por ahora, supongamos que siempre existe un héroe con el `id` especificado.
    // La gestión de errores se añadirá en el siguiente paso del tutorial.
    const hero = HEROES.find(h => h.id === id)!;
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(hero);
  }

}


/** AGREGAR HERO SERVICE GETHERO
 * Abra HeroService y agregue el siguiente getHero()método con 
 * el id después del getHeroes()
 * 
 * getHeroes(): Observable <Hero []> {
    const heroes = of (HEROES);
    this.messageService.add ('HeroService: fetched heroes');
    return heroes;
  }

  Como getHeroes(), getHero()tiene una firma asíncrona. Devuelve un héroe simulado como un Observable, usando la función RxJS of().

Puede reescribir getHero()como Httppedido real sin tener que cambiar el HeroDetailComponentque lo llama.
 */