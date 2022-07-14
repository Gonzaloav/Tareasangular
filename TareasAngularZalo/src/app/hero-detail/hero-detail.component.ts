import { Component, OnInit, Input } from '@angular/core';
import {Hero} from '../hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../hero.service';


@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})

export class HeroDetailComponent implements OnInit {

  //@Input () hero?: Hero;

  hero: Hero | undefined;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getHero();
  }
  
  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
  }
}

/** El padre HeroesComponentsolía establecer la HeroDetailComponent.heropropiedad y HeroDetailComponentmostraba el héroe.

HeroesComponentya no hace eso Ahora el enrutador crea el HeroDetailComponenten respuesta a una URL como ~/detail/12.

ENRUTABLE HERO DATAIL COMPONENT

El HeroDetailComponentnecesita una nueva forma de hacer que el héroe se muestre. Esta sección explica lo siguiente:

1. Obtener la ruta que lo creó
2. Extrae el idde la ruta
3. Obtenga el héroe con eso iddel servidor usando elHeroService

Inyecte los servicios ActivatedRoute, HeroServicey Locationen el constructor.

El ActivatedRoutecontiene información sobre la ruta a esta instancia del HeroDetailComponent. Este componente está interesado en los parámetros de la ruta extraídos de la URL. El parámetro "id" es el iddel héroe a mostrar.

Obtiene los HeroServicedatos del héroe del servidor remoto y este componente los usa para mostrar el héroe.

El locationes un servicio de Angular para interactuar con el navegador. Este servicio le permite volver a la vista anterior.
 
EXTRAER EL ID PARAMETRO DE RUTA

Es route.snapshotuna imagen estática de la información de la ruta poco después de que se creó el componente.

Es paramMapun diccionario de valores de parámetros de ruta extraídos de la URL. La "id"llave devuelve la iddel héroe a buscar.

Los parámetros de ruta son siempre cadenas. La función de JavaScript convierte la cadena en un número, que es lo que debería ser Numberun héroe .id

El navegador se actualiza y la aplicación falla con un error del compilador. HeroServiceno tiene getHero()metodo Agrégalo ahora.

Agregue un goBack() método a la clase de componente que navegue hacia atrás un paso en la pila del historial del navegador usando el Locationservicio que usó para inyectar .

*/