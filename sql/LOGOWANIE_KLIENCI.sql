create table LOGOWANIE_KLIENCI
(
	ID_LOGOWANIE_KLIENT NUMBER not null
		constraint ID_LOGOWANIE_KLIENT_PK
			primary key,
	ID_KLIENTA NUMBER
		constraint ID_KLIENTA_FK
			references KLIENCI,
	LOGIN VARCHAR2(20),
	HASLO VARCHAR2(20)
)
/

