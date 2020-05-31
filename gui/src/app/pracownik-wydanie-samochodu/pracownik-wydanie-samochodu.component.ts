import { Component, OnInit } from '@angular/core';
import {SamochodyService} from "../services/samochody.service";
import {Rezerwacja} from "../interfaceBazyDanych/rezerwacja";
import {Klienci} from "../interfaceBazyDanych/klienci";
import {RezerwacjeService} from "../services/rezerwacje.service";
import {DaneAktywnychRezerwacji} from "../interfaceBazyDanych/dane-aktywnych-rezerwacji";
import {WydanieSamochodu} from "../interfaceBazyDanych/wydanie-samochodu";
import {LoginService} from "../services/login.service";
import {SendWydanieSamochodu} from "../interfaceBazyDanych/send-wydanie-samochodu";
import {Data} from "@angular/router";
import {DaneAktywnychWYpozyczen} from "../interfaceBazyDanych/dane-aktywnych-wypozyczen";

@Component({
  selector: 'app-pracownik-wydanie-samochodu',
  templateUrl: './pracownik-wydanie-samochodu.component.html',
  styleUrls: ['./pracownik-wydanie-samochodu.component.css']
})
export class PracownikWydanieSamochoduComponent implements OnInit {

  rezerwacja: Rezerwacja[];
  klient: Klienci;
  klienci: Klienci[];

  zalogowanyPracownik: number;

  daneAktywnychRezerwacji: DaneAktywnychRezerwacji[];
  daneAktywnychWypozyczen: DaneAktywnychWYpozyczen[];
  samochodyDoOdbioru: WydanieSamochodu[];


  //Obsługa wyświetlanej zawartosci:
  htmlRezerwacje: boolean = false;
  htmlOdbior: boolean =false;

  constructor(
    private samochodyService: SamochodyService,
    private rezerwacjeService: RezerwacjeService,
    private loginService: LoginService,
  ) { }

  ngOnInit(): void {
    this.loginService.currnetPracownick.subscribe(pracownik => this.zalogowanyPracownik = pracownik);
    this.rezerwacjeService.getWydaneSamochdy().subscribe(dane => this.samochodyDoOdbioru = dane);
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


  openHTML(number: number) {
    this.htmlRezerwacje = this.htmlOdbior = false;
    if (number == 1) {
      this.htmlRezerwacje = true;
      this.rezerwacjeService.getDaneAktywnychRezerwacji().subscribe(dane => this.daneAktywnychRezerwacji = dane);
    }else if(number == 2){
      this.htmlOdbior = true;
      this.rezerwacjeService.getDaneAktywnychWypozyczen().subscribe(dane => this.daneAktywnychWypozyczen = dane);
    }
  }

  wydanieKluczy(ID_REZERWACJI: number) {
    //TODO: dodanie rekordu wydania samochodu
    let sendWydanieSamochodu: SendWydanieSamochodu = new class implements SendWydanieSamochodu{
      ID_WYDANIA: number;
      ID_REZERWACJI: number;
      ID_PRACOWNIKA: number;
      DATA_WYDANIA_SAMOCHODU: string;
    }


    sendWydanieSamochodu.ID_WYDANIA = this.automaticID();
    sendWydanieSamochodu.ID_REZERWACJI = ID_REZERWACJI;
    sendWydanieSamochodu.ID_PRACOWNIKA = this.zalogowanyPracownik;
    sendWydanieSamochodu.DATA_WYDANIA_SAMOCHODU = this.getToDayString();

    if(sendWydanieSamochodu.ID_WYDANIA != null && sendWydanieSamochodu.ID_REZERWACJI != null && sendWydanieSamochodu.ID_PRACOWNIKA != null){
      this.rezerwacjeService.addWydaneSamochody(sendWydanieSamochodu).subscribe(data => this.samochodyDoOdbioru = data);
      this.rezerwacjeService.getDaneAktywnychRezerwacji().subscribe(dane => this.daneAktywnychRezerwacji = dane);
    }else{
      console.log("Nie podano wszysktich potrzebnych informancji");
    }

    //odświerzenie listy (jeśli nie jest odświerzona automatyczne)
  }

  getToDayString(): string {
    const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    let data = new Date();
    return data.getDate().toString() + "-" + monthNames[data.getMonth()].toString() + "-" + data.getFullYear().toString().substr(-2);
  }

  automaticID(): number {
    let i: number = 1;
    let czyZaleziono: boolean;
    while (true) {
      czyZaleziono = true;
      for (let samochod of this.samochodyDoOdbioru) {
        console.log("I: " + i + " ID_WYDANIA: " + samochod.ID_WYDANIA + " ID_Rezerwacji:" + samochod.ID_REZERWACJI)
        if (samochod.ID_WYDANIA == i) {
          czyZaleziono = false;
        }
      }
      if (czyZaleziono) {
        console.log("zanleziony ID_Wydania = " + i);
        return i;
      } else {
        i++;
      }

    }
  }
}
