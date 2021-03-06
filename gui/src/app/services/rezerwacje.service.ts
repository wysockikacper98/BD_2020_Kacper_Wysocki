import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MessagesService} from "../messages/messages.service";
import {Observable, of} from "rxjs";
import {Rezerwacja} from "../interfaceBazyDanych/rezerwacja";
import {catchError, map, tap} from "rxjs/operators";
import {SendRezerwacja} from "../interfaceBazyDanych/send-rezerwacja";
import {DaneAktywnychRezerwacji} from "../interfaceBazyDanych/dane-aktywnych-rezerwacji";
import {WydanieSamochodu} from "../interfaceBazyDanych/wydanie-samochodu";
import {SendWydanieSamochodu} from "../interfaceBazyDanych/send-wydanie-samochodu";
import {OutOfBandDiagnosticRecorder} from "@angular/compiler-cli/src/ngtsc/typecheck/src/oob";
import {DaneAktywnychWYpozyczen} from "../interfaceBazyDanych/dane-aktywnych-wypozyczen";
import {OdbiorSamochodu} from "../interfaceBazyDanych/odbior-samochodu";
import {SendOdbiorSamochodu} from "../interfaceBazyDanych/send-odbior-samochodu";

@Injectable({
  providedIn: 'root'
})
export class RezerwacjeService {

  private addRezerwacjeURL = 'http://localhost/BD_2020_Kacper_Wysocki/backend/addRezerwacja.php';
  private rezerwacjaURL = 'http://localhost/BD_2020_Kacper_Wysocki/backend/rezerwacjaLista.php';
  private daneRezerwajiURL ='http://localhost/BD_2020_Kacper_Wysocki/backend/daneAktywnychRezerwacji.php'
  private wydanieSamochduURL = 'http://localhost/BD_2020_Kacper_Wysocki/backend/addWydanieSamochodu.php';
  private daneWypozyczeniaURL = 'http://localhost/BD_2020_Kacper_Wysocki/backend/daneAktywnychWypozyczen.php';
  private getWydaneSamochodyURL = 'http://localhost/BD_2020_Kacper_Wysocki/backend/getWydaneSamochody.php';
  private odbiorSamochoduURL = 'http://localhost/BD_2020_Kacper_Wysocki/backend/addOdbiorSamochodu.php';
  private getOdebraneSamochodyURL = 'http://localhost/BD_2020_Kacper_Wysocki/backend/getOdebraneSamochody.php';


  rezerwacje: Rezerwacja[];
  daneAktywnychrezerwacji: DaneAktywnychRezerwacji[];
  daneAktywnychWypozyczen: DaneAktywnychWYpozyczen[];
  samochodyDoOdbioru: WydanieSamochodu[];
  samochodyOdbiorLista: OdbiorSamochodu[];

  constructor(
    private http: HttpClient,
    private messageService: MessagesService,
  ) {
  }


  addOdbiorSamochodu(dane: SendOdbiorSamochodu): Observable<OdbiorSamochodu[]>{
    return this.http.post(this.odbiorSamochoduURL, dane)
      .pipe(
        map((res)=>{
          this.samochodyOdbiorLista.push(res['data']);
          return this.samochodyOdbiorLista;
        }),
        tap(_=> this.log('odebrano samochod')),
        catchError(this.handleError<OdbiorSamochodu[]>('addOdbiorSamochodu', []))
      );
  }

  addWydaneSamochody(dane: SendWydanieSamochodu): Observable<WydanieSamochodu[]>{
    return this.http.post(this.wydanieSamochduURL, dane)
      .pipe(
        map((res) =>{
          this.samochodyDoOdbioru.push(res['data']);
          return this.samochodyDoOdbioru;
        }),
        tap(_=> this.log('wydano samochód')),
        catchError(this.handleError<WydanieSamochodu[]>('addWydanieSamochodu', []))
      );
  }



  getWydaneSamochdy(): Observable<WydanieSamochodu[]> {
    return this.http.get(this.getWydaneSamochodyURL)
      .pipe(
        map((res)=>{
          this.samochodyDoOdbioru = res['data'];
          return this.samochodyDoOdbioru;
        }),
        tap(_=> this.log('pobranie wydanych samochodów')),
        catchError(this.handleError<WydanieSamochodu[]>('getWydanieSamochodu', []))
      )
  }

  getOdebraneSamochody(): Observable<OdbiorSamochodu[]>{
    return this.http.get(this.getOdebraneSamochodyURL)
      .pipe(
        map((res) =>{
          this.samochodyOdbiorLista = res['data'];
          return this.samochodyOdbiorLista;
        }),
        tap(_=> this.log('pobranie listy odebranych samochodów')),
        catchError(this.handleError<OdbiorSamochodu[]>('getOdebraneSamochody', []))
      );
  }



  addRezerwacja(rezerwacja: SendRezerwacja): Observable<Rezerwacja[]> {
    this.getRezerwacja();
    return this.http.post(this.addRezerwacjeURL, rezerwacja)
      .pipe(map((res)=>{
        this.rezerwacje.push(res['data']);
        return this.rezerwacje;
        }),
        tap(_=> this.log('Dodanie rezerwacji')),
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


 getDaneAktywnychRezerwacji(): Observable<DaneAktywnychRezerwacji[]>{
   return this.http.get(this.daneRezerwajiURL)
     .pipe(
       map((res) => {
         this.daneAktywnychrezerwacji = res['data'];
         return this.daneAktywnychrezerwacji;
       }),
       tap(_=> this.log('pobranie aktywnych rezerwacji')),
       catchError(this.handleError<DaneAktywnychRezerwacji[]>('getDaneAktywnychRezerwacji', []))
     );
 }

getDaneAktywnychWypozyczen(): Observable<DaneAktywnychWYpozyczen[]>{
    return this.http.get(this.daneWypozyczeniaURL)
      .pipe(
        map((res)=>{
          this.daneAktywnychWypozyczen = res['data'];
          return this.daneAktywnychWypozyczen;
        }),
        tap(_=> this.log('pobranie akeywnych wypozyczen')),
        catchError(this.handleError<DaneAktywnychWYpozyczen[]>('getDaneAktywnychWypozczyen', []))
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
