import {NgbDate} from "@ng-bootstrap/ng-bootstrap";

export interface Rezerwacja {
  ID_REZERWACJI: number;
  ID_KLIENTA: number;
  ID_SAMOCHODU: number;
  DATA_POCZATKU_WYPOZYCZENIA: NgbDate;
  DATA_KONCA_WYPOZYCZENIA: NgbDate;

}
