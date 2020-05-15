import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {Klient} from "./klient";
import {catchError, map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class KlientService {
  URL = 'http://localhost/BD_2020_Kacper_Wysocki/backend/list.php';
  klienci: Klient[];

  constructor(private http: HttpClient) { }

  getAll(): Observable<Klient[]> {
    return this.http.get(`${this.URL}`).pipe(
      map((res) => {
        this.klienci = res['data'];
        return this.klienci;
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error);
    return throwError('Error! klient.service.ts is not right');
  }
}
