import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {SamochodyComponent} from "./samochody/samochody.component";
import {SamochodySzczegolyComponent} from "./samochody-szczegoly/samochody-szczegoly.component";
import {FilterComponent} from "./filter/filter.component";


const routers: Routes = [
  {path: 'samochody/:ID_SAMOCHODU', component: SamochodySzczegolyComponent},
  {path: 'samochody', component: SamochodyComponent},
  {path: 'filter', component: FilterComponent},
  {path: '', redirectTo: '/filter', pathMatch: 'full'}
]


@NgModule({
  imports: [
    RouterModule.forRoot(routers)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
