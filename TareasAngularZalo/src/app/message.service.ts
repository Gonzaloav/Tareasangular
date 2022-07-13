import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class MessageService {

  messages: string [] = [];

  add (message: string) {
    this.messages.push(message);
  }
  
  clear () {
    this.messages = [];
  }
}

/**  El servicio expone su caché de messagesy dos métodos:
Uno a add()un mensaje a la memoria caché.
Otro al clear()caché.  */