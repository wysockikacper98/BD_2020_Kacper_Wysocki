create table LOKAL
(
	ID_LOKALU NUMBER not null
		constraint LOKAL_PK
			primary key,
	MIASTO VARCHAR2(40) not null,
	ULICA VARCHAR2(40) not null,
	NR_LOKALU NUMBER not null
)
/

