create table WYPOZYCZENIE
(
	ID_WYPOZYCZENIA NUMBER not null
		constraint WYPOZYCZENIE_PK
			primary key,
	ID_ODBIORU NUMBER
		constraint WYPOZYCZENIE_FK_ODBIOR
			references ODBIOR_SAMOCHODU,
	ZAROBEK NUMBER
)
/
