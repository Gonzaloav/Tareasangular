import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
// import { HEROES } from '../mock-heroes';
import { HeroService} from '../hero.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})

export class HeroesComponent implements OnInit {
  
  selectedHero?: Hero;

  heroes: Hero [] = [];
  
  /* Reemplace la definición de la heroes propiedad con una declaración
  heroes: Hero [] = [] (4 servicio)
  heroes = HEROES;*/
  
  
  constructor(private heroService: HeroService,
              private messageService: MessageService) { 
              }

  ngOnInit(): void {
    this.getHeroes();
  }

  // forma asíncrona (Observable 25 -26)
  getHeroes (): void {
    this.heroService.getHeroes()
          .subscribe (heroes => this.heroes = heroes);
    /* forma sincrono.- Original
          this.heroes = this.heroService.getHeroes ();*/
  }

  add(name: string): void {
    name = name.trim ();
    if (!name){ return;}
    this.heroService.addHero ({name} as Hero).subscribe (hero => {
      this.heroes.push(hero);
    });
  }

  delete (hero: Hero): void {
    this.heroes = this.heroes.filter (h => h !== hero);
    this.heroService.deleteHero (hero.id).subscribe ();
  }  
  



}








/** Código muerto tras pt5 
 * onSelect (hero: Hero) : void { 
    this.selectedHero = hero;
    this.messageService.add(`HeroComponent: Selected hero id=${hero.id}`);
  }
 */
