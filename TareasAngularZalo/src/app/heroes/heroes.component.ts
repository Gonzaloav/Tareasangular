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

  onSelect (hero: Hero) : void {
    this.selectedHero = hero;
    this.messageService.add(`HeroComponent: Selected hero id=${hero.id}`);
  }

  // forma asíncrona (Observable 25 -26)
  getHeroes (): void {
    this.heroService.getHeroes()
          .subscribe (heroes => this.heroes = heroes);
    /* forma sincrono.- Original
          this.heroes = this.heroService.getHeroes ();*/
  }
}
