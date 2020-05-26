import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MessagesService} from "../messages/messages.service";
import {Pracownicy} from "../interfaceBazyDanych/pracownicy";
import {Observable, of} from "rxjs";
import {catchError, map, tap} from "rxjs/operators";
import {PassKlient} from "../interfaceBazyDanych/pass-klient";

@Injectable({
  providedIn: 'root'
})
export class PracownicyService {

  private pracownicyURL = 'http://localhost/BD_2020_Kacper_Wysocki/backend/getPracownicy.php';


  pracownik: Pracownicy[];

  constructor(private http: HttpClient,
              private messageService: MessagesService) {

  }


  getPracownicy(): Observable<Pracownicy[]> {
    return this.http.get(this.pracownicyURL)
      .pipe(
        map((res)=>{
          this.pracownik = res['data'];
          return this.pracownik;
        }),
        tap(_ => this.log('pobranie pracowników')),
        catchError(this.handleError<Pracownicy[]>('getPracownicy', []))
      );
  }

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
