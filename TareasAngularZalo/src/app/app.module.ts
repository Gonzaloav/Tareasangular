import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import { FormsModule } from '@angular/forms';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule} from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';


@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    DashboardComponent,
    
  ],
  
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
     InMemoryDataService, {dataEncapsulation: false} 
    )
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }


/** El forRoot()método de configuración toma una InMemoryDataServiceclase que prepara la base de datos en memoria.
* El módulo HttpClientInMemoryWebApiModule intercepta las peticiones HTTP
y devuelve respuestas simuladas del servidor.
Quítalo cuando un servidor real esté listo para recibir peticiones.
*/