import {Component, Input, OnInit} from '@angular/core';
import {Samochody} from "../interfaceBazyDanych/samochody";
import {SamochodyService} from "../services/samochody.service";
import {MessagesService} from "../messages/messages.service";
import {FilterComponent} from "../filter/filter.component";
import {NgbDate} from "@ng-bootstrap/ng-bootstrap";


@Component({
  selector: 'app-samochody',
  templateUrl: './samochody.component.html',
  styleUrls: ['./samochody.component.css']
})
export class SamochodyComponent implements OnInit {
  samochody: Samochody[];
  fromDate: NgbDate | null = null;
  toDate: NgbDate | null = null;

  constructor(
    private samochodyService: SamochodyService,
    private messageService: MessagesService,
  ) {
  }


  ngOnInit(): void {
    this.getSamochody();
    this.samochodyService.currentFromData.subscribe(date => this.fromDate = date);
    this.samochodyService.currentToData.subscribe(date => this.toDate = date);
  }

  getSamochody(): void{
    this.samochodyService.getSamochody().subscribe(samochody => this.samochody = samochody);
  }



}
