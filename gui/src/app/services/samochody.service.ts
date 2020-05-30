import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, filter, map, tap} from "rxjs/operators";
import {Observable, of} from "rxjs";
import {MessagesService} from "../messages/messages.service";
import {Samochody} from "../interfaceBazyDanych/samochody";
import {NgbCalendar, NgbDate} from "@ng-bootstrap/ng-bootstrap";
import{BehaviorSubject} from "rxjs";
import {Klienci} from "../interfaceBazyDanych/klienci";

@Injectable({
  providedIn: 'root'
})
export class SamochodyService {

  // shearing informations
  private fromData = new BehaviorSubject<NgbDate>(this.calendar.getToday());
  private toData = new BehaviorSubject<NgbDate>(this.calendar.getNext(this.calendar.getToday(),"d", 3));

  currentFromData = this.fromData.asObservable();
  currentToData = this.toData.asObservable();


  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };



  private samochodyUrl = 'http://localhost/BD_2020_Kacper_Wysocki/backend/carList.php';
  private klientURL = 'http://localhost/BD_2020_Kacper_Wysocki/backend/getKlient.php';
  private klienciURL = 'http://localhost/BD_2020_Kacper_Wysocki/backend/klienciLista.php';
  private samochodURL = 'http://localhost/BD_2020_Kacper_Wysocki/backend/getSamochod.php';

  samochody: Samochody[];
  samochod: Samochody;

  klienci: Klienci[];
  klient: Klienci;



  constructor(
    private http: HttpClient,
    private messageService: MessagesService,
    private calendar: NgbCalendar
  ) {
  }

  getKlient(id: number):Observable<Klienci>{
    return this.http.post<Klienci>(this.klientURL, id)
      .pipe(
        map((res) => {
          this.klient = res['data'];
          return this.klient;
        }),
        tap(_ => this.log(`pobranie klienta o id= ${id}`)),
        catchError(this.handleError<Klienci>('getKlient', ))
      )
  }

  getKlienci(): Observable<Klienci[]> {
    return this.http.get<Klienci[]>(this.klienciURL)
      .pipe(
        map((res) => {
          this.klienci = res['data'];
          return this.klienci;
        }),
        tap(_ => this.log('Pobranie klientów')),
        catchError(this.handleError<Klienci[]>('getKlienci', []))
      );
  }




  getSamochody(): Observable<Samochody[]> {
    return this.http.get(this.samochodyUrl)
      .pipe(
        map((res) => {
          this.samochody = res['data'];
          return this.samochody;
        }),
        tap(_ => this.log('pobranie Samochodów')),
        catchError(this.handleError<Samochody[]>('getSamochody', []))
      );
  }

// Wyświetlanie wiadomości z podjętych akcji
  private log(message: string) {
    this.messageService.add(`SamochodyService: ${message}`);
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead

      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  //sharing informations
  changeFromDate(date: NgbDate){
    this.fromData.next(date);
  }

  changeToDate(date: NgbDate) {
    this.toData.next(date);
  }


}
