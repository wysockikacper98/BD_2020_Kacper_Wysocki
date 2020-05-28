import {Component, Input, OnInit} from '@angular/core';
import {Samochody} from "../interfaceBazyDanych/samochody";
import {SamochodyService} from "../services/samochody.service";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {NgbDate} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-samochody-szczegoly',
  templateUrl: './samochody-szczegoly.component.html',
  styleUrls: ['./samochody-szczegoly.component.css']
})
export class SamochodySzczegolyComponent implements OnInit {

  samochody: Samochody[];

  wybranySamochod: number;
  cena: number;
  kosztaWynajmu: number;

  fromDate: NgbDate | null = null;
  toDate: NgbDate | null = null;

  tempFromDate: NgbDate;
  temptoDate: NgbDate;

  constructor(
    private samochodyService: SamochodyService,
    private route: ActivatedRoute,
    private location: Location
  ) {
  }

  ngOnInit(): void {
    this.getSamochody();
    //pobieranie daty
    this.samochodyService.currentFromData.subscribe(date => this.fromDate = date);
    this.samochodyService.currentToData.subscribe(date => this.toDate = date);
  }

  getSamochody(): void {
    this.samochodyService.getSamochody().subscribe(samochody => this.samochody = samochody);
  }

  getID(): number {
    return this.wybranySamochod = +this.route.snapshot.paramMap.get('ID_SAMOCHODU');
  }

  // getSamochod(): void{
  //   const id = +this.route.snapshot.paramMap.get('ID_SAMOCHODU');
  //   this.samochodyService.getSamochod(id).subscribe(samochod => this.samochod = samochod);
  // }

  getKoszta(koszt: number): void {
    const fromDate: Date = this.createDateFromMgbDate(this.fromDate);
    const toDate: Date = this.createDateFromMgbDate(this.toDate);
    const daysDiff = Math.floor(Math.abs(<any>fromDate - <any>toDate) / (1000 * 60 * 60 * 24)) + 1;

    console.log(daysDiff)
    console.log(daysDiff * koszt)
    this.kosztaWynajmu = daysDiff * koszt;
  }

  createDateFromMgbDate(ngbDate: NgbDate): Date {
    const date: Date = new Date(Date.UTC(ngbDate.year, ngbDate.month - 1, ngbDate.day));
    return date;
  }


  getData(data: NgbDate) {
    console.log("Wywołanie funcji GetData")
    if (data.month < 10) {
      return data.day.toString() + ":0" + data.month.toString() + ":" + data.year.toString()
    } else {
      return data.day.toString() + ":" + data.month.toString() + ":" + data.year.toString()
    }
  }

  setCena(cena: number) {
    this.cena = cena;
  }

}
