import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {SamochodyComponent} from "./samochody/samochody.component";
import {SamochodySzczegolyComponent} from "./samochody-szczegoly/samochody-szczegoly.component";
import {FilterComponent} from "./filter/filter.component";
import {LoginComponent} from "./login/login.component";
import {PracownikOdbiorSamochoduComponent} from "./pracownik-odbior-samochodu/pracownik-odbior-samochodu.component";
import {PracownikWydanieSamochoduComponent} from "./pracownik-wydanie-samochodu/pracownik-wydanie-samochodu.component";


const routers: Routes = [
  {path: 'samochody/:ID_SAMOCHODU', component: SamochodySzczegolyComponent},
  {path: 'samochody', component: SamochodyComponent},
  {path: 'filter', component: FilterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'pracownik-odbior-samochodu', component: PracownikOdbiorSamochoduComponent},
  {path: 'pracownik-wydanie-samochodu', component: PracownikWydanieSamochoduComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full'}
]


@NgModule({
  imports: [
    RouterModule.forRoot(routers)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
