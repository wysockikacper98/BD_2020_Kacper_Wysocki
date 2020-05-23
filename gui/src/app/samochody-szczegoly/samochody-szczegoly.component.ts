import {Component, Input, OnInit} from '@angular/core';
import {Samochody} from "../interfaceBazyDanych/samochody";
import {SamochodyService} from "../services/samochody.service";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";

@Component({
  selector: 'app-samochody-szczegoly',
  templateUrl: './samochody-szczegoly.component.html',
  styleUrls: ['./samochody-szczegoly.component.css']
})
export class SamochodySzczegolyComponent implements OnInit {

  samochody: Samochody[];
  samochod: Samochody;
  wybranySamochod: number;

  constructor(
    private samochodyService: SamochodyService,
    private route: ActivatedRoute,
    private location: Location
  ) {
  }

  ngOnInit(): void {
    this.getSamochody();
  }

  getSamochody(): void{
    this.samochodyService.getSamochody().subscribe(samochody => this.samochody = samochody);
  }

  getID(): number {
    return this.wybranySamochod = +this.route.snapshot.paramMap.get('ID_SAMOCHODU');
  }

  // getSamochod(): void{
  //   const id = +this.route.snapshot.paramMap.get('ID_SAMOCHODU');
  //   this.samochodyService.getSamochod(id).subscribe(samochod => this.samochod = samochod);
  // }

}
