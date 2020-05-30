export interface DaneAktywnychRezerwacji {
  IMIE: string;
  NAZWISKO: string;
  ID_REZERWACJI: number;
  ID_SAMOCHODU: number;
  MODEL: string;
  MARKA: string;
  DATA_POCZATKU_WYPOZYCZENIA: Date;
  DATA_KONCA_WYPOZYCZENIA: Date;
}
