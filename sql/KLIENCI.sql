create table KLIENCI
(
	ID_KLIENTA NUMBER not null
		constraint KLIENCI_PK
			primary key,
	IMIE VARCHAR2(20) not null,
	NAZWISKO VARCHAR2(40) not null,
	NIP NUMBER(10) not null,
	NR_TELEFONU NUMBER not null
)
/

