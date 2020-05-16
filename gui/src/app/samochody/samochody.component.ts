import { Component, OnInit } from '@angular/core';
import {Samochody} from "./samochody";
import {SamochodyService} from "./samochody.service";

@Component({
  selector: 'app-samochody',
  templateUrl: './samochody.component.html',
  styleUrls: ['./samochody.component.css']
})
export class SamochodyComponent implements OnInit {
  samochody: Samochody[];
  error = '';
  succes = '';


  constructor(private samochodyService: SamochodyService) {

  }

  ngOnInit(): void {
    this.getSamochody();
  }

  getSamochody(): void{
    this.samochodyService.getAll().subscribe(
      (res: Samochody[]) => {
        this.samochody = res;
      },
      (error) =>{
        this.error = error;
      }
    );
  }

}
