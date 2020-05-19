import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, map, tap} from "rxjs/operators";
import {Observable, of} from "rxjs";
import {MessagesService} from "../messages/messages.service";
import {Samochody} from "../interfaceBazyDanych/samochody";
import {ObjectAssignBuiltinFn} from "@angular/compiler-cli/src/ngtsc/partial_evaluator/src/builtin";

@Injectable({
  providedIn: 'root'
})
export class SamochodyService {

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  private samochodyUrl = 'http://localhost/BD_2020_Kacper_Wysocki/backend/carList.php';
  samochody: Samochody[];

  constructor(
    private http: HttpClient,
    private messageService: MessagesService
  ) {
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
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


}
