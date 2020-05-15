import {Component, OnInit} from '@angular/core';
import {Klient} from "./klient/klient";
import {KlientService} from "./klient/klient.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Projekt';
}
