import { Component, OnInit } from '@angular/core';
import {SamochodyService} from "../services/samochody.service";
import {Rezerwacja} from "../interfaceBazyDanych/rezerwacja";
import {Klienci} from "../interfaceBazyDanych/klienci";

@Component({
  selector: 'app-pracownik-wydanie-samochodu',
  templateUrl: './pracownik-wydanie-samochodu.component.html',
  styleUrls: ['./pracownik-wydanie-samochodu.component.css']
})
export class PracownikWydanieSamochoduComponent implements OnInit {

  rezerwacja: Rezerwacja[];
  klient: Klienci;

  constructor(
    private samochodyService: SamochodyService
  ) { }

  ngOnInit(): void {
    this.getRezerwacja();
    console.log(this.getKlient(6));
  }

  getRezerwacja(): void{
    this.samochodyService.getRezerwacja().subscribe(rezerwacja => this.rezerwacja = rezerwacja);
  }

  getKlient(id: number): void {
    this.samochodyService.getKlient(id).subscribe(klient => this.klient = klient);
  }

}
