import { Component, OnInit } from '@angular/core';
import {MessagesService} from "./messages.service";
import {SamochodyService} from "../services/samochody.service";
import {LoginService} from "../services/login.service";

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  zalogowanyKlient: number = null;
  zalogowanyPracownik: number = null;

  constructor(public messageService: MessagesService,
              public loginService: LoginService) { }

  ngOnInit(): void {
    this.getZalogowany();
  }

  getZalogowany() {
    this.zalogowanyKlient = this.loginService.zalogowanyKlient;
    this.zalogowanyPracownik = this.loginService.zalogowanyPracownik;
  }

}
