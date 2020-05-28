import {Component, Input, OnInit} from '@angular/core';
import {Samochody} from "../interfaceBazyDanych/samochody";
import {SamochodyService} from "../services/samochody.service";
import {MessagesService} from "../messages/messages.service";
import {FilterComponent} from "../filter/filter.component";
import {NgbDate} from "@ng-bootstrap/ng-bootstrap";
import {LoginService} from "../services/login.service";


@Component({
  selector: 'app-samochody',
  templateUrl: './samochody.component.html',
  styleUrls: ['./samochody.component.css']
})
export class SamochodyComponent implements OnInit {
  samochody: Samochody[];
  fromDate: NgbDate | null = null;
  toDate: NgbDate | null = null;

  zalogownyKlient: number;

  constructor(
    private samochodyService: SamochodyService,
    private messageService: MessagesService,
    private loginService: LoginService,
  ) {
  }


  ngOnInit(): void {
    this.getSamochody();
    this.samochodyService.currentFromData.subscribe(date => this.fromDate = date);
    this.samochodyService.currentToData.subscribe(date => this.toDate = date);
    this.loginService.currentKlient.subscribe(klientID => this.zalogownyKlient = klientID);
  }

  getSamochody(): void{
    this.samochodyService.getSamochody().subscribe(samochody => this.samochody = samochody);
  }



}
