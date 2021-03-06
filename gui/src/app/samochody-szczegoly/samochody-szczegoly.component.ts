import {Component, OnInit} from '@angular/core';
import {Samochody} from "../interfaceBazyDanych/samochody";
import {SamochodyService} from "../services/samochody.service";
import {ActivatedRoute} from "@angular/router";
import {NgbDate} from "@ng-bootstrap/ng-bootstrap";
import {LoginService} from "../services/login.service";
import {Rezerwacja} from "../interfaceBazyDanych/rezerwacja";
import {RezerwacjeService} from "../services/rezerwacje.service";
import {SendRezerwacja} from "../interfaceBazyDanych/send-rezerwacja";

@Component({
  selector: 'app-samochody-szczegoly',
  templateUrl: './samochody-szczegoly.component.html',
  styleUrls: ['./samochody-szczegoly.component.css']
})
export class SamochodySzczegolyComponent implements OnInit {

  dokonanoRezerwacji: boolean = false;

  i: number;
  samochody: Samochody[];
  rezerwacje: Rezerwacja[];

  wybranySamochod: number;

  fromDate: NgbDate | null = null;
  toDate: NgbDate | null = null;

  zalogowanyKlient: number;
  emailPole: string;


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
    return new Date(ngbDate.year, ngbDate.month - 1, ngbDate.day);
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

  addRezerwacja(ID_SAMOCHODU: number, email: string) {
    const sendRezerwacja: SendRezerwacja = new class implements SendRezerwacja {
      ID_REZERWACJI: number;
      ID_KLIENTA: number;
      ID_SAMOCHODU: number;
      DATA_POCZATKU_WYPOZYCZENIA: string;
      DATA_KONCA_WYPOZYCZENIA: string;
      EMAIL: string;
    }

    sendRezerwacja.ID_SAMOCHODU = ID_SAMOCHODU;
    sendRezerwacja.ID_KLIENTA = this.zalogowanyKlient;
    sendRezerwacja.DATA_POCZATKU_WYPOZYCZENIA = this.dateToString(this.createDateFromMgbDate(this.fromDate));
    sendRezerwacja.DATA_KONCA_WYPOZYCZENIA = this.dateToString(this.createDateFromMgbDate(this.toDate));
    sendRezerwacja.EMAIL = email;

    if (sendRezerwacja.ID_KLIENTA != null && sendRezerwacja.ID_SAMOCHODU != null) {
      this.rezerwacjeService.addRezerwacja(sendRezerwacja).subscribe(rezerwacja => this.rezerwacje = rezerwacja);
      this.dokonanoRezerwacji = true;
    } else {
      console.log("nie podano wszystkich danych do utworzenia rezerwacji")
    }
  }


  dateToString(data: Date): string {
    const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    return data.getDate().toString() + "-" + monthNames[data.getMonth()].toString() + "-" + data.getFullYear().toString().substr(-2);
  }



}
