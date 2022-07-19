import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';


@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})


export class MessagesComponent implements OnInit {

  /* La messageService propiedad debe ser pública porque la vinculará en la plantilla.
Angular solo se une a las propiedades del componete público.  */
 
constructor( public messageService: MessageService) { }

  ngOnInit(): void {
  }

}

/** El MessagesComponentdebería mostrar todos los mensajes, 
 * incluido el mensaje enviado por el HeroServicecuando busca héroes. */
 