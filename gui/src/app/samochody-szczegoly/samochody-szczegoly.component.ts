import {Component, Input, OnInit} from '@angular/core';
import {Samochody} from "../interfaceBazyDanych/samochody";
import {SamochodyService} from "../services/samochody.service";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {NgbDate} from "@ng-bootstrap/ng-bootstrap";
import {LoginService} from "../services/login.service";
import {Rezerwacja} from "../interfaceBazyDanych/rezerwacja";
import {RezerwacjeService} from "../services/rezerwacje.service";

@Component({
  selector: 'app-samochody-szczegoly',
  templateUrl: './samochody-szczegoly.component.html',
  styleUrls: ['./samochody-szczegoly.component.css']
})
export class SamochodySzczegolyComponent implements OnInit {

  samochody: Samochody[];
  rezerwacje: Rezerwacja[];

  wybranySamochod: number;

  fromDate: NgbDate | null = null;
  toDate: NgbDate | null = null;

  zalogowanyKlient: number;


  constructor(
    private samochodyService: SamochodyService,
    private route: ActivatedRoute,
    private loginService: LoginService,
    private rezerwacjeService: RezerwacjeService,
  ) {
  }

  ngOnInit(): void {
    this.getSamochody();
    //pobieranie daty
    this.samochodyService.currentFromData.subscribe(date => this.fromDate = date);
    this.samochodyService.currentToData.subscribe(date => this.toDate = date);
    this.loginService.currentKlient.subscribe(id => this.zalogowanyKlient = id);
    this.rezerwacjeService.getRezerwacja().subscribe(rezerwacje => this.rezerwacje = rezerwacje);

  }

  getSamochody(): void {
    this.samochodyService.getSamochody().subscribe(samochody => this.samochody = samochody);
  }

  getID(): number {
    return this.wybranySamochod = +this.route.snapshot.paramMap.get('ID_SAMOCHODU');

  }


  getKoszta(koszt: number): number {
    const fromDate: Date = this.createDateFromMgbDate(this.fromDate);
    const toDate: Date = this.createDateFromMgbDate(this.toDate);
    const daysDiff = Math.floor(Math.abs(<any>fromDate - <any>toDate) / (1000 * 60 * 60 * 24)) + 1;
    return daysDiff * koszt;
  }

  createDateFromMgbDate(ngbDate: NgbDate): Date {
    const date: Date = new Date(Date.UTC(ngbDate.year, ngbDate.month - 1, ngbDate.day));
    return date;
  }


  getData(data: NgbDate) {
    if (data.month < 10) {
      if (data.day < 10) {
        return "0" + data.day.toString() + ":0" + data.month.toString() + ":" + data.year.toString();
      } else
        return data.day.toString() + ":0" + data.month.toString() + ":" + data.year.toString();
    } else {
      if (data.day < 10)
        return "0" + data.day.toString() + ":" + data.month.toString() + ":" + data.year.toString()
      return data.day.toString() + ":" + data.month.toString() + ":" + data.year.toString()
    }
  }

  //TODO: Nie działa nawet wywołanie pliku PHP'a, ale plik PHP działa i wpisuje dane z obiektu json
  addRezerwacja(ID_SAMOCHODU: number) {
    const rezerwacja: Rezerwacja = new class implements Rezerwacja {
      DATA_KONCA_WYPOZYCZENIA: Date;
      DATA_POCZATKU_WYPOZYCZENIA: Date;
      ID_KLIENTA: number;
      ID_REZERWACJI: number;
      ID_SAMOCHODU: number;
    };

    rezerwacja.ID_REZERWACJI = 3;
    rezerwacja.ID_SAMOCHODU = ID_SAMOCHODU;
    rezerwacja.ID_KLIENTA = this.zalogowanyKlient;
    rezerwacja.DATA_POCZATKU_WYPOZYCZENIA = this.createDateFromMgbDate(this.fromDate);
    rezerwacja.DATA_KONCA_WYPOZYCZENIA = this.createDateFromMgbDate(this.toDate);
    if (rezerwacja.ID_REZERWACJI != null && rezerwacja.ID_KLIENTA != null && rezerwacja.ID_SAMOCHODU != null) {
      console.log("Przed dodaniem rezerwacji");
      this.rezerwacjeService.addRezerwacja(rezerwacja).subscribe(rezerwacja => this.rezerwacje = rezerwacja);
    } else {
      console.log("nie podano wszystkich danych do utworzenia rezerwacji")
    }
  }
}
