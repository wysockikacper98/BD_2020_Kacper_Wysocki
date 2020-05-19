import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {SamochodyComponent} from "./samochody/samochody.component";
import {SamochodySzczegolyComponent} from "./samochody-szczegoly/samochody-szczegoly.component";


const routers: Routes = [
  {path: 'samochody/:ID_SAMOCHODU', component: SamochodySzczegolyComponent},
  {path: 'samochody', component: SamochodyComponent},
  {path: '', redirectTo: '/samochody', pathMatch: 'full'}
]


@NgModule({
  imports: [
    RouterModule.forRoot(routers)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
