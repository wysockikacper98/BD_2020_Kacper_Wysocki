import {Component, OnInit} from '@angular/core';
import {Samochody} from "../interfaceBazyDanych/samochody";
import {SamochodyService} from "../services/samochody.service";
import {MessagesService} from "../messages/messages.service";

@Component({
  selector: 'app-samochody',
  templateUrl: './samochody.component.html',
  styleUrls: ['./samochody.component.css']
})
export class SamochodyComponent implements OnInit {
  samochody: Samochody[];


  constructor(
    private samochodyService: SamochodyService,
    private messageService: MessagesService
  ) {
  }


  ngOnInit(): void {
    this.getSamochody();
  }

  getSamochody(): void{
    this.samochodyService.getSamochody().subscribe(samochody => this.samochody = samochody);
  }



}
