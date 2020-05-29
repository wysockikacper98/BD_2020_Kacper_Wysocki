import { Component, OnInit } from '@angular/core';
import {SamochodyService} from "../services/samochody.service";
import {Rezerwacja} from "../interfaceBazyDanych/rezerwacja";
import {Klienci} from "../interfaceBazyDanych/klienci";
import {RezerwacjeService} from "../services/rezerwacje.service";

@Component({
  selector: 'app-pracownik-wydanie-samochodu',
  templateUrl: './pracownik-wydanie-samochodu.component.html',
  styleUrls: ['./pracownik-wydanie-samochodu.component.css']
})
export class PracownikWydanieSamochoduComponent implements OnInit {

  rezerwacja: Rezerwacja[];
  klient: Klienci;
  klienci: Klienci[];

  //Obsługa wyświetlanej zawartosci:
  htmlRezerwacje: boolean = false;
  htmlOdbior: boolean =false;

  constructor(
    private samochodyService: SamochodyService,
    private rezerwacjeService: RezerwacjeService,
  ) { }

  ngOnInit(): void {
    this.getRezerwacja();
    // this.getKlient(6);
    this.getKlienci();
  }

  getRezerwacja(): void{
    this.rezerwacjeService.getRezerwacja().subscribe(rezerwacja => this.rezerwacja = rezerwacja);
  }

  getKlienci(): void {
    this.samochodyService.getKlienci().subscribe(klienci => this.klienci = klienci);
  }

  getKlient(id: number): void {
    this.samochodyService.getKlient(id).subscribe(klient => this.klient = klient);
  }

  openHTML(number: number) {
    this.htmlRezerwacje = this.htmlOdbior = false;
    if (number == 1) {
      this.htmlRezerwacje = true;
    }else{
      this.htmlOdbior = true;
    }
  }
}
