import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {PassKlient} from "../interfaceBazyDanych/pass-klient";
import {catchError, map, tap} from "rxjs/operators";
import {PassPracownik} from "../interfaceBazyDanych/pass-pracownik";
import {HttpClient} from "@angular/common/http";
import {MessagesService} from "../messages/messages.service";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  /* TODO: gobalne zmienne przechowujące informacje na temat obecnie zalogowanego użytkownika
  *   najlepiej jakby zmienne zalogowany klient / pracownik przechowywało obiekt pracownika/klienta
  *    w ten sposób można było by przekazwyać informacje dotyczące kto dokonał jakiej operacji oraz
  *   łatwiej wysyłać te informacje do bazdy danych
  */
  zalogowanyKlient: number = null;
  zalogowanyPracownik: number = null;

  

  private passyKlientURL = 'http://localhost/BD_2020_Kacper_Wysocki/backend/getPassKlienci.php';
  private passyPracownikURL = 'http://localhost/BD_2020_Kacper_Wysocki/backend/getPassPracownicy.php';

  passyKlient: PassKlient[];
  passyPracownik: PassPracownik[];

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

  zalogowanoJakoPracownik(id: number) {
    this.zalogowanyPracownik = id;
  }

  zalogowanyJakoKlient(id: number) {
    this.zalogowanyKlient = id;
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
