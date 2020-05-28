import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MessagesService} from "../messages/messages.service";
import {Observable, of} from "rxjs";
import {Rezerwacja} from "../interfaceBazyDanych/rezerwacja";
import {catchError, map, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class RezerwacjeService {

  private addRezerwacjeURL = 'http://localhost/BD_2020_Kacper_Wysocki/backend/addRezerwacja.php';
  private rezerwacjaURL = 'http://localhost/BD_2020_Kacper_Wysocki/backend/rezerwacjaLista.php'


  rezerwacje: Rezerwacja[];

  constructor(
    private http: HttpClient,
    private messageService: MessagesService,
  ) {
  }

  addRezerwacja(rezerwacja: Rezerwacja): Observable<Rezerwacja[]> {
    return this.http.post(this.addRezerwacjeURL, {data: rezerwacja})
      .pipe(map((res) => {
          this.rezerwacje.push(res['data']);
          return this.rezerwacje;
        }),
        tap(_ => this.log('dodanie rezerwacji')),
        catchError(this.handleError<Rezerwacja[]>('addRezerwacja', []))
      );

  }

  getRezerwacja(): Observable<Rezerwacja[]>{
    return this.http.get(this.rezerwacjaURL)
      .pipe(
        map((res) => {
          this.rezerwacje = res['data'];
          return this.rezerwacje;
        }),
        tap(_ => this.log('pobranie rezerwacji')),
        catchError(this.handleError<Rezerwacja[]>('getRezerwacja', []))
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
