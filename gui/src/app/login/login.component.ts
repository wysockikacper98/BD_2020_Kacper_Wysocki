import { Component, OnInit } from '@angular/core';
import {PassKlient} from "../interfaceBazyDanych/pass-klient";
import {PassPracownik} from "../interfaceBazyDanych/pass-pracownik";
import {LoginService} from "../services/login.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  passyKlienci: PassKlient[];
  passyPracownicy: PassPracownik[];

  klient: boolean = false;
  pracownik: boolean = false;

  login: boolean = true;
  alert: boolean = null;

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    this.getPassyKlient();
    this.getPassyPracownicy();

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
          this.login = false;
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
          this.login = false;
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
