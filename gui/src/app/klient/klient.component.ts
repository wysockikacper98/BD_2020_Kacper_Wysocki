import { Component, OnInit } from '@angular/core';
import {Klient} from "./klient";
import {KlientService} from "./klient.service";

@Component({
  selector: 'app-klient',
  templateUrl: './klient.component.html',
  styleUrls: ['./klient.component.css']
})
export class KlientComponent implements OnInit {

  klienci: Klient[];
  error = '';
  succes = '';

  constructor(private klientService: KlientService) {

  }

  ngOnInit() {
    this.getKlient();
  }

  getKlient(): void {
    this.klientService.getAll().subscribe(
      (res: Klient[]) => {
        this.klienci = res;
      },
      (error) => {
        this.error = error;
      }
    );
  }
}
