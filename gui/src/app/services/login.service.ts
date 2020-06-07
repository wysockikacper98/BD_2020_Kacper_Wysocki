import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from "rxjs";
import {PassKlient} from "../interfaceBazyDanych/pass-klient";
import {catchError, map, tap} from "rxjs/operators";
import {PassPracownik} from "../interfaceBazyDanych/pass-pracownik";
import {HttpClient} from "@angular/common/http";
import {MessagesService} from "../messages/messages.service";
import {Klienci} from "../interfaceBazyDanych/klienci";
import {WydanieSamochodu} from "../interfaceBazyDanych/wydanie-samochodu";
import {LogowanieKlienci} from "../interfaceBazyDanych/logowanie-klienci";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private zalogowanyKlient = new BehaviorSubject<number>(null);
  private zalogowanyPracownik = new BehaviorSubject<number>(null);

  currentKlient = this.zalogowanyKlient.asObservable();
  currnetPracownick = this.zalogowanyPracownik.asObservable();


  private passyKlientURL = 'http://localhost/BD_2020_Kacper_Wysocki/backend/getPassKlienci.php';
  private passyPracownikURL = 'http://localhost/BD_2020_Kacper_Wysocki/backend/getPassPracownicy.php';
  private dodawanieKlientaURL = 'http://localhost/BD_2020_Kacper_Wysocki/backend/addKlient.php';
  private dodawanieLoginKlienta = 'http://localhost/BD_2020_Kacper_Wysocki/backend/addLogowanieKlient.php';

  passyKlient: PassKlient[];
  passyPracownik: PassPracownik[];

  dodanyKlient: Klienci;
  dodanyLogin: LogowanieKlienci;

  constructor(private http: HttpClient,
              private messageService: MessagesService) {
  }

  getPassyKlient(): Observable<PassKlient[]> {
    return this.http.get(this.passyKlientURL)
      .pipe(
        map((res) => {
          this.passyKlient = res['data'];
          return this.passyKlient;
        }),
        tap(_ => this.log('pobranie passów klientów')),
        catchError(this.handleError<PassKlient[]>('getPassyKlietn', []))
      );
  }

  getPassyPracownik(): Observable<PassPracownik[]> {
    return this.http.get(this.passyPracownikURL)
      .pipe(
        map((res) => {
          this.passyPracownik = res['data'];
          return this.passyPracownik;
        }),
        tap(_ => this.log('pobranie passów pracowników')),
        catchError(this.handleError<PassPracownik[]>('getPassyPracownik', []))
      );
  }

  addKlient(klient: Klienci): Observable<Klienci>{
    return this.http.post(this.dodawanieKlientaURL, klient)
      .pipe(
        map((res) =>{
          this.dodanyKlient = res['data'];
          return this.dodanyKlient;
        }),
        tap(_=> this.log('dodano Klienta')),
        catchError(this.handleError<Klienci>('addKlienci', ))
      );
  }


  addLogowanieKlient(logowanie: LogowanieKlienci): Observable<LogowanieKlienci>{
      return this.http.post(this.dodawanieLoginKlienta, logowanie)
        .pipe(
          map((res) =>{
            this.dodanyLogin = res['data'];
            return this.dodanyLogin;
          }),
          tap(_=> this.log('dodano Logowanie')),
          catchError(this.handleError<LogowanieKlienci>('addLogowanieKlienci', ))
        );
  }

  zalogowanoJakoPracownik(id: number) {
    this.zalogowanyPracownik.next(id);
    this.zalogowanyKlient.next(null);
  }

  zalogowanyJakoKlient(id: number) {
    this.zalogowanyKlient.next(id);
    this.zalogowanyPracownik.next(null);
  }


//message
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
}
