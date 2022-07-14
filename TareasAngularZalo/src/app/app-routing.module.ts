import { NgModule } from '@angular/core';
import { HeroesComponent } from './heroes/heroes.component';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';


const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full'},  
  { path: 'dashboard', component: DashboardComponent},
  { path: 'detail/:id', component: HeroDetailComponent},
  { path: 'heroes', component: HeroesComponent },
];


@NgModule({
  
  imports: [ RouterModule.forRoot (routes)],
  exports: [ RouterModule]
})

export class AppRoutingModule { }

/**Primero, el app-routing.module.tsarchivo se importa RouterModuley
 Routesla aplicación puede tener capacidad de enrutamiento. La siguiente
  importación, HeroesComponentle da al enrutador un lugar al que ir una 
  vez que configure las rutas.

* const routes => le dicen al enrutador qué vista mostrar cuando un 
usuario hace clic en un enlace o pega una URL en la barra de direcciones 
del navegador.
*Un Angular típico Routetiene dos propiedades:
path => Una cadena que coincide con la URL en la barra de direcciones del navegador.
component =>	El componente que debe crear el enrutador al navegar a esta ruta. 

* Agregar la ruta del tablero linea 9 path:

* Para hacer que la aplicación navegue al tablero automáticamente, agregue la siguiente 
ruta a la routesmatriz. { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
*/
 