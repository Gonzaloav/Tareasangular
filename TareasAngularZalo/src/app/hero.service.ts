import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  private heroesUrl = 'api/heroes'; // URL de la web api.

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  //GET.- Héroes del servidor

  getHeroes(): Observable<Hero[]> {
    this.messageService.add('HeroService: fetched heroes');
    return this.http.get<Hero[]>(this.heroesUrl).pipe(
      tap((_) => this.log('feched heroes')),
      catchError(this.handleError<Hero[]>('getHeroes', []))
    );
  }

  //GET.-  Héroe por id. Devuelve `undefined` cuando no se encuentra el id
  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap((_) => this.log(`fetchd hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  /**getHero(id: number): Observable<Hero> {
    // Por ahora, supongamos que siempre existe un héroe con el `id` especificado.
    // La gestión de errores se añadirá en el siguiente paso del tutorial.
    const hero = HEROES.find(h => h.id === id)!;
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(hero);
  }*/

  // PUT.- Actualiza el héroe en el servidor.
  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((_) => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  // POST.- Agregar un nuevo héroe
  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  // DELETE.- Borrar un héroe.
  deleteHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap((_) => this.log(`delated hero id = ${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  // GET.- Obtener los héroes cuyo nombre contiene el término de búsqueda
  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      // si no hay término de búsqueda, devuelve una matriz de héroes vacía.
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/? name=${term}`).pipe(
      tap((x) =>
        x.length
          ? this.log(`found heroes matching "${term}"`)
          : this.log(`no heroes matching "${term}"`)
      ),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }
  /**
   * Maneja la operación Http que falló.
   * Dejar que la aplicación continúe.
   *
   * @param operation - nombre de la operación que ha fallado
   * @param result - valor opcional a devolver como resultado observable
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // Envía el error a la infraestructura de registro remoto
      console.error(error); //registrar en la consola en su lugar

      // TODO: mejor trabajo de transformación del error para el consumo del usuario
      this.log(`${operation} failed: ${error.message} `);
      // Deja que la aplicación siga funcionando devolviendo un resultado vacío.
      return of(result as T);
    };
  }

  /** (6 obtener datos servidor) Tenga en cuenta que sigue inyectando MessageServicepero
   como su aplicación lo llama con tanta frecuencia, envuélvalo en un log()método privado: */
  //Registrar un mensaje HeroService con el MessageService
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
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

ACCEDE AL OBSERVABLE.- (tap línea 26)

Los HeroServicemétodos aprovechan el flujo de valores observables y envían un mensaje, utilizando el log()método, al área de mensajes en la parte inferior de la página.

El operador RxJS tap()habilita esta capacidad mirando los valores observables, haciendo algo con esos valores y pasándolos. La tap()devolución de llamada no accede a los valores en sí.

OBTENER HEROE POR ID.- (LINEAS 31 -38)

Aquí, la URL base es la heroesURLdefinida en la sección Héroes y HTTPapi/heroes e id es el número del héroe que desea recuperar. Por ejemplo, api/heroes/11.

getHero()tiene tres diferencias significativas con getHeroes():

. getHero()construye una URL de solicitud con la identificación del héroe deseado

. El servidor debe responder con un solo héroe en lugar de una serie de héroes.

. getHero()devuelve un Observable<Hero>, que es un observable de Hero objetos en lugar de un observable de Hero matrices .

*/
