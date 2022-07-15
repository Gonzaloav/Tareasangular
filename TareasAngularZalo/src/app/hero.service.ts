import { Injectable } from '@angular/core';
import { Hero } from "./hero";
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})


export class HeroService {

  private heroesUrl = 'api/heroes'; // URL de la web api.

  constructor( 
    private http: HttpClient, 
    private messageService: MessageService ) { }

  getHeroes(): Observable<Hero[]> {
    this.messageService.add('HeroService: fetched heroes');
    return this.http.get <Hero []> (this.heroesUrl)
    .pipe (
      catchError (this.handleError <Hero[]>('getHeroes', []))
    );
  }

  getHero(id: number): Observable<Hero> {
    // Por ahora, supongamos que siempre existe un héroe con el `id` especificado.
    // La gestión de errores se añadirá en el siguiente paso del tutorial.
    const hero = HEROES.find(h => h.id === id)!;
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(hero);
  }


  private handleError<T> (operation = 'operation', result? : T) {
    return (error: any) : Observable <T> => {
      this.log ( `${operation} failed: ${error.message} `);
      return of (result as T);
    }
  }

  /** (6 obtener datos servidor) Tenga en cuenta que sigue inyectando MessageServicepero 
   como su aplicación lo llama con tanta frecuencia, envuélvalo en un log()método privado: */
  private  log (message: string) {
    this.messageService.add (`HeroService: ${message}`); 
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
 
Tenga en cuenta que sigue inyectando MessageServicepero como su aplicación lo llama con tanta frecuencia, 
envuélvalo en un log()método privado:

CONSEGUIR HEROES CON HTTPCLIENT.- ( lina 22 - 25)
La función RxJS of () para devolver una matriz de héroes simulados como un = // const heroes = of(HEROES); return heroes;
Ha cambiado y of()la http.get()aplicación sigue funcionando sin ningún otro cambio porque ambas funciones devuelven un archivo Observable<Hero[]>.

MANEJO DE ERRORES.- 
Las cosas salen mal, especialmente cuando obtiene datos de un servidor remoto. El HeroService.getHeroes()método debe detectar errores y hacer algo apropiado.
Para detectar errores, "canaliza" el resultado observable a http.get()través de un operador RxJS catchError().
Importe el catchErrorsímbolo de rxjs/operators, junto con algunos otros operadores para usarlos más tarde.

Ahora extienda el resultado observable con el pipe()método y asígnele un catchError()operador.

El catchError()operador intercepta un correo electrónico Observableque falló . Luego, el operador pasa el error a la función de manejo de errores.

El siguiente handleError()método reporta el error y luego devuelve un resultado inocuo para que la aplicación siga funcionando.

Muchos métodos handleError()pueden compartir lo siguiente , por lo que se generaliza para satisfacer sus diferentes necesidades.HeroService

En lugar de manejar el error directamente, devuelve una función de manejo de errores a catchError. Esta función se configura con el nombre de la operación 
que falló y un valor de retorno seguro.

Después de informar el error a la consola, el controlador crea un mensaje amigable y devuelve un valor seguro para que la aplicación pueda seguir funcionando.

Debido a que cada método de servicio devuelve un tipo diferente de Observableresultado, handleError()toma un parámetro de tipo para devolver el valor seguro 
como el tipo que espera la aplicación.



*/