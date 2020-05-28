import { Component, OnInit } from '@angular/core';
import {PassKlient} from "../interfaceBazyDanych/pass-klient";
import {PassPracownik} from "../interfaceBazyDanych/pass-pracownik";
import {LoginService} from "../services/login.service";
import {Klienci} from "../interfaceBazyDanych/klienci";
import {Pracownicy} from "../interfaceBazyDanych/pracownicy";
import {PracownicyService} from "../services/pracownicy.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  passyKlienci: PassKlient[];
  passyPracownicy: PassPracownik[];

  zalogowanyKlient: number;
  zalogownayPracownik: number;

  klient: boolean = false;
  pracownik: boolean = false;


  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    this.getPassyKlient();
    this.getPassyPracownicy();
    this.loginService.currentKlient.subscribe(id => this.zalogowanyKlient = id);
    this.loginService.currnetPracownick.subscribe(id => this.zalogownayPracownik = id);

  }

  getPassyKlient(): void {
    this.loginService.getPassyKlient().subscribe(passy => this.passyKlienci = passy);
  }

  getPassyPracownicy(): void{
    this.loginService.getPassyPracownik().subscribe(passy => this.passyPracownicy = passy);
  }

  inKlient(login: string, haslo: string): void {
    for (let klient of this.passyKlienci) {
      if (klient.LOGIN == login) {
        if (klient.HASLO == haslo) {
          this.klient = true;
          this.pracownik = false;
          this.loginService.zalogowanyJakoKlient(klient.ID_KLIENTA);
        }
      }
    }
  }
  inPracownik(login: string, haslo: string): void{
    for (let pracownik of this.passyPracownicy) {
      if (pracownik.LOGIN == login) {
        if (pracownik.HASLO == haslo) {
          this.pracownik =  true;
          this.klient = false;
          this.loginService.zalogowanoJakoPracownik(pracownik.ID_PRACOWNIKA);
        }
      }
    }
  }


  zaloguj(login: string, haslo: string) {
    this.inPracownik(login, haslo);
    this.inKlient(login, haslo);
  }

}
