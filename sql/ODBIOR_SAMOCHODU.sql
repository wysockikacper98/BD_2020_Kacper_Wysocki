create table ODBIOR_SAMOCHODU
(
	ID_ODBIORU NUMBER not null
		constraint ODBIOR_PK
			primary key,
	ID_WYDANIA NUMBER
		constraint ODBIOR_FK_WYDANIE
			references WYDANIE_SAMOCHODU,
	ID_PRACOWNIKA NUMBER
		constraint ODBIOR_FK_PRACOWNIK
			references PRACOWNICY,
	DATA_ODBIORU_SAMOCHODU DATE not null
)
/

