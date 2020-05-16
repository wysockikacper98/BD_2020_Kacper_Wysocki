import { Injectable } from '@angular/core';
import {Samochody} from "./samochody";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class SamochodyService {
  URL = 'http://localhost/BD_2020_Kacper_Wysocki/backend/carList.php'
  samochody: Samochody[];

  constructor(private http: HttpClient) { }

  getAll(): Observable<Samochody[]> {
    return this.http.get(`${this.URL}`).pipe(
      map((res)=>{
        this.samochody = res['data'];
        return this.samochody;
      }),
      catchError(this.handleError)
    )
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error);
    return throwError('Error! Samochody.service.ts is not working');
  }
}
