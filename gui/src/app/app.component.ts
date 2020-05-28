import {Component, OnInit} from '@angular/core';
import {LoginService} from "./services/login.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Projekt';
  zalogowanyKlient: number;
  zalogownayPracownik: number;

  constructor(private loginService: LoginService) {
  }
  ngOnInit(): void {
    this.loginService.currentKlient.subscribe(id => this.zalogowanyKlient = id);
    this.loginService.currnetPracownick.subscribe(id => this.zalogownayPracownik = id);
  }

  wyloguj(): void {
    this.zalogownayPracownik = null;
    this.zalogowanyKlient = null;
  }

}
