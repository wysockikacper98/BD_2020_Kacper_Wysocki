import {Component, OnInit} from '@angular/core';
import {PassKlient} from "../interfaceBazyDanych/pass-klient";
import {PassPracownik} from "../interfaceBazyDanych/pass-pracownik";
import {LoginService} from "../services/login.service";
import {Klienci} from "../interfaceBazyDanych/klienci";
import {Pracownicy} from "../interfaceBazyDanych/pracownicy";
import {PracownicyService} from "../services/pracownicy.service";
import {Router} from "@angular/router";


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

  ekranLogowania: boolean = true;

  klient: boolean = false;
  pracownik: boolean = false;
  wolnyLogin: boolean = false;

  nowyLoginPole: any;
  noweHasloPole: any;
  noweHasloPowtorzPole: any;
  imiePole: any;
  nazwiskoPole: any;
  nrTelPole: any;
  NipPole: any;


  constructor(private loginService: LoginService,
              private router: Router,) {
  }

  ngOnInit(): void {
    this.getPassyKlient();
    this.getPassyPracownicy();
    this.loginService.currentKlient.subscribe(id => this.zalogowanyKlient = id);
    this.loginService.currnetPracownick.subscribe(id => this.zalogownayPracownik = id);

  }

  getPassyKlient(): void {
    this.loginService.getPassyKlient().subscribe(passy => this.passyKlienci = passy);
  }

  getPassyPracownicy(): void {
    this.loginService.getPassyPracownik().subscribe(passy => this.passyPracownicy = passy);
  }

  inKlient(login: string, haslo: string): void {
    for (let klient of this.passyKlienci) {
      if (klient.LOGIN == login) {
        if (klient.HASLO == haslo) {
          this.klient = true;
          this.pracownik = false;
          this.loginService.zalogowanyJakoKlient(klient.ID_KLIENTA);
          this.router.navigate(["filter"]).then();
        }
      }
    }
  }

  inPracownik(login: string, haslo: string): void {
    for (let pracownik of this.passyPracownicy) {
      if (pracownik.LOGIN == login) {
        if (pracownik.HASLO == haslo) {
          this.pracownik = true;
          this.klient = false;
          this.loginService.zalogowanoJakoPracownik(pracownik.ID_PRACOWNIKA);
          this.router.navigate(["pracownik-wydanie-samochodu"]).then();
        }
      }
    }
  }


  zaloguj(login: string, haslo: string) {
    this.inPracownik(login, haslo);
    this.inKlient(login, haslo);
  }

  czyLoginWolny(login: string, haslo: string, hasloPowt: string) {
    if (haslo == hasloPowt) {

      let znaleziono = false
      for (let klient of this.passyKlienci) {
        if (klient.LOGIN == login) {
          znaleziono = true;
        }
      }
      if (!znaleziono) {
        this.wolnyLogin = true;
      }else{
        this.nowyLoginPole = null;
      }


    }else{
      this.noweHasloPole = null;
      this.noweHasloPowtorzPole = null;
    }
  }


}
