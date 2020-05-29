create table SAMOCHODY
(
	ID_SAMOCHODU NUMBER not null
		constraint SAMOCHODY_PK
			primary key,
	ID_LOKALU NUMBER
		constraint SAMOCHODY_FK
			references LOKAL,
	MARKA VARCHAR2(20) not null,
	MODEL VARCHAR2(20) not null,
	ROK NUMBER not null,
	KOLOR VARCHAR2(20),
	ILOSC_MIEJSC NUMBER not null,
	POJEMNOSC_BAGAZNIKA NUMBER,
	RODZAJ_SKRZYNI_BIEGOW VARCHAR2(1) not null
		check (rodzaj_skrzyni_biegow in ('A', 'M')),
	CENA_ZA_DZIEN NUMBER not null
)
/

