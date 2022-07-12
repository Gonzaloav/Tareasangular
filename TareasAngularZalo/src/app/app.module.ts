import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeroesComponetComponent } from './components/heroes-componet/heroes-componet.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponetComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
