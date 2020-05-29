create table PRACOWNICY
(
	ID_PRACOWNIKA NUMBER not null
		constraint PRACOWNICY_PK
			primary key,
	ID_LOKALU NUMBER
		constraint PRACOWNICY_FK
			references LOKAL,
	IMIE VARCHAR2(20) not null,
	NAZWISKO VARCHAR2(40) not null,
	ZAROBKI NUMBER
)
/

