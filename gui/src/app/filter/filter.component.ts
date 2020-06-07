import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NgbDate, NgbCalendar, NgbDateParserFormatter} from "@ng-bootstrap/ng-bootstrap";
import {SamochodyService} from "../services/samochody.service";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  hoveredDate: NgbDate | null = null;

  fromDate: NgbDate | null = null;
  toDate: NgbDate | null = null;
  //senging message
  data: string;
  // wybranaSkrzynia: string = "Dowolna";

  constructor(
    public calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter,
    private samochodyService: SamochodyService
  ) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 3);
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }

  ngOnInit(): void {
    this.samochodyService.currentFromData.subscribe(date => this.fromDate = date);
    this.samochodyService.currentToData.subscribe(date => this.toDate = date);
  }

  changeFromDate(): void{
    this.samochodyService.changeFromDate(this.fromDate)
  }
  changeToDate(): void{
    this.samochodyService.changeToDate(this.toDate);
  }

  newDataSelected(): void{
    this.changeToDate();
    this.changeFromDate();
  }

}
