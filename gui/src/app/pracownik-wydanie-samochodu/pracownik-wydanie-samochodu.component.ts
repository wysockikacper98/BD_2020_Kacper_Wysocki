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
import {SendOdbiorSamochodu} from "../interfaceBazyDanych/send-odbior-samochodu";
import {OdbiorSamochodu} from "../interfaceBazyDanych/odbior-samochodu";
import {Samochody} from "../interfaceBazyDanych/samochody";
import {inlineLocales} from "@angular-devkit/build-angular/src/utils/process-bundle";

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
  odbiorSamochoduList: OdbiorSamochodu[];
  samochodyList: Samochody[];


  //Obsługa wyświetlanej zawartosci:
  htmlRezerwacje: boolean = false;
  htmlOdbior: boolean =false;
  htmlDodawanieSamochodu: boolean = false;
  cenaPole: any;
  skrzyniaPole: any;
  pojemnoscPole: any;
  iloscPole: any;
  kolorPole: any;
  rokPole: any;
  modelPole: any;
  markaPole: any;
  dodanoSamochod: boolean = false;

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
  refreshRezerwacje(){
    this.rezerwacjeService.getDaneAktywnychRezerwacji().subscribe(dane => this.daneAktywnychRezerwacji = dane);
  }
  refreshWypozyczenia(){
    this.rezerwacjeService.getDaneAktywnychWypozyczen().subscribe(dane => this.daneAktywnychWypozyczen = dane);
  }

  openHTML(number: number) {
    this.htmlRezerwacje = this.htmlOdbior = this.htmlDodawanieSamochodu = false;
    if (number == 1) {
      this.htmlRezerwacje = true;
      this.rezerwacjeService.getDaneAktywnychRezerwacji().subscribe(dane => this.daneAktywnychRezerwacji = dane);
    }else if(number == 2){
      this.htmlOdbior = true;
      this.rezerwacjeService.getDaneAktywnychWypozyczen().subscribe(dane => this.daneAktywnychWypozyczen = dane);
    }else if (number == 3){
      this.htmlDodawanieSamochodu = true;
      this.dodanoSamochod = false;
    }
  }

  wydanieKluczy(ID_REZERWACJI: number) {
    let sendWydanieSamochodu: SendWydanieSamochodu = new class implements SendWydanieSamochodu{
      ID_WYDANIA: number;
      ID_REZERWACJI: number;
      ID_PRACOWNIKA: number;
      DATA_WYDANIA_SAMOCHODU: string;
    }

    sendWydanieSamochodu.ID_REZERWACJI = ID_REZERWACJI;
    sendWydanieSamochodu.ID_PRACOWNIKA = this.zalogowanyPracownik;
    sendWydanieSamochodu.DATA_WYDANIA_SAMOCHODU = this.getToDayString();

    if(sendWydanieSamochodu.ID_REZERWACJI != null && sendWydanieSamochodu.ID_PRACOWNIKA != null){
      this.rezerwacjeService.addWydaneSamochody(sendWydanieSamochodu).subscribe(data => this.samochodyDoOdbioru = data);
    }else{
      console.log("Nie podano wszysktich potrzebnych informancji");
    }

  }



  addOdbiorSamochodu(ID_WYDANIA: number) {
    let sendOdbiorSamochodu: SendOdbiorSamochodu  = new class implements SendOdbiorSamochodu{
      ID_ODBIORU: number;
      ID_WYDANIA: number;
      ID_PRACOWNIKA: number;
      DATA_ODBIORU_SAMOCHODU: string;
    }

    sendOdbiorSamochodu.ID_WYDANIA = ID_WYDANIA;
    sendOdbiorSamochodu.ID_PRACOWNIKA = this.zalogowanyPracownik;
    sendOdbiorSamochodu.DATA_ODBIORU_SAMOCHODU = this.getToDayString();

    if(sendOdbiorSamochodu.ID_WYDANIA != null && sendOdbiorSamochodu.ID_PRACOWNIKA != null){
      this.rezerwacjeService.addOdbiorSamochodu(sendOdbiorSamochodu).subscribe(data => this.odbiorSamochoduList = data);
    }else {
      console.log("Nie podano wszystkich informacji do odbioru samochdou")
    }
    this.rezerwacjeService.getDaneAktywnychWypozyczen().subscribe(dane => this.daneAktywnychWypozyczen = dane);
  }


  getToDayString(): string {
    const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    let data = new Date();
    return data.getDate().toString() + "-" + monthNames[data.getMonth()].toString() + "-" + data.getFullYear().toString().substr(-2);
  }

  addSamochod(marka: string, model: string, rok: number, kolor: string, iloscMijesc: number, pojemnoscBagaznika: number, skrzyniaBiegow: string, cena: number) {
    let nowySamochod: Samochody = new class implements Samochody {
      ID_SAMOCHODU: number;
      ID_LOKALU: number;
      MARKA: string;
      MODEL: string;
      ROK: number;
      KOLOR: string;
      ILOSC_MIEJSC: number;
      POJEMNOSC_BAGAZNIKA: number;
      RODZAJ_SKRZYNI_BIEGOW: string;
      CENA_ZA_DZIEN: number;
    }
    nowySamochod.ID_LOKALU = 1;
    nowySamochod.MARKA = marka;
    nowySamochod.MODEL = model;
    nowySamochod.ROK = rok;
    nowySamochod.KOLOR = kolor;
    nowySamochod.ILOSC_MIEJSC = iloscMijesc;
    nowySamochod.POJEMNOSC_BAGAZNIKA = pojemnoscBagaznika;
    if (skrzyniaBiegow == "1") nowySamochod.RODZAJ_SKRZYNI_BIEGOW = "A";
    else if (skrzyniaBiegow == '2') nowySamochod.RODZAJ_SKRZYNI_BIEGOW = "M";
    nowySamochod.CENA_ZA_DZIEN = cena;

    this.samochodyService.addSamochod(nowySamochod).subscribe(dane => this.samochodyList = dane);

    this.dodanoSamochod = true;

  }
}
