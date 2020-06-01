
create table KLIENCI
(
    ID_KLIENTA  NUMBER       not null,
    IMIE        VARCHAR2(20) not null,
    NAZWISKO    VARCHAR2(40) not null,
    NIP         NUMBER(10)   not null,
    NR_TELEFONU NUMBER       not null,
    constraint KLIENCI_PK
        primary key (ID_KLIENTA)
)
/

create table LOKAL
(
    ID_LOKALU NUMBER       not null,
    MIASTO    VARCHAR2(40) not null,
    ULICA     VARCHAR2(40) not null,
    NR_LOKALU NUMBER       not null,
    constraint LOKAL_PK
        primary key (ID_LOKALU)
)
/

create table PRACOWNICY
(
    ID_PRACOWNIKA NUMBER       not null,
    ID_LOKALU     NUMBER,
    IMIE          VARCHAR2(20) not null,
    NAZWISKO      VARCHAR2(40) not null,
    ZAROBKI       NUMBER,
    constraint PRACOWNICY_PK
        primary key (ID_PRACOWNIKA),
    constraint PRACOWNICY_FK
        foreign key (ID_LOKALU) references LOKAL
)
/

create table SAMOCHODY
(
    ID_SAMOCHODU          NUMBER       not null,
    ID_LOKALU             NUMBER,
    MARKA                 VARCHAR2(20) not null,
    MODEL                 VARCHAR2(20) not null,
    ROK                   NUMBER       not null,
    KOLOR                 VARCHAR2(20),
    ILOSC_MIEJSC          NUMBER       not null,
    POJEMNOSC_BAGAZNIKA   NUMBER,
    RODZAJ_SKRZYNI_BIEGOW VARCHAR2(1)  not null,
    CENA_ZA_DZIEN         NUMBER       not null,
    constraint SAMOCHODY_PK
        primary key (ID_SAMOCHODU),
    constraint SAMOCHODY_FK
        foreign key (ID_LOKALU) references LOKAL,
    check (rodzaj_skrzyni_biegow in ('A', 'M'))
)
/

create table REZERWACJA
(
    ID_REZERWACJI              NUMBER not null,
    ID_KLIENTA                 NUMBER,
    ID_SAMOCHODU               NUMBER,
    DATA_POCZATKU_WYPOZYCZENIA DATE,
    DATA_KONCA_WYPOZYCZENIA    DATE,
    constraint REZERWACJA_PK
        primary key (ID_REZERWACJI),
    constraint REZERWACJA_FK
        foreign key (ID_KLIENTA) references KLIENCI,
    constraint REZERWACJA_FK2
        foreign key (ID_SAMOCHODU) references SAMOCHODY
)
/


create table WYDANIE_SAMOCHODU
(
    ID_WYDANIA             NUMBER not null,
    ID_REZERWACJI          NUMBER,
    ID_PRACOWNIKA          NUMBER,
    DATA_WYDANIA_SAMOCHODU DATE,
    constraint WYDANIE_PK
        primary key (ID_WYDANIA),
    constraint WYDANIE_FK_PRACOWNIK
        foreign key (ID_PRACOWNIKA) references PRACOWNICY,
    constraint WYDANIE_FK_REZERWACJA
        foreign key (ID_REZERWACJI) references REZERWACJA
)
/

create table ODBIOR_SAMOCHODU
(
    ID_ODBIORU             NUMBER not null,
    ID_WYDANIA             NUMBER,
    ID_PRACOWNIKA          NUMBER,
    DATA_ODBIORU_SAMOCHODU DATE   not null,
    constraint ODBIOR_PK
        primary key (ID_ODBIORU),
    constraint ODBIOR_FK_PRACOWNIK
        foreign key (ID_PRACOWNIKA) references PRACOWNICY,
    constraint ODBIOR_FK_WYDANIE
        foreign key (ID_WYDANIA) references WYDANIE_SAMOCHODU
)
/



create table WYPOZYCZENIE
(
    ID_WYPOZYCZENIA NUMBER not null,
    ID_ODBIORU      NUMBER,
    ZAROBEK         NUMBER,
    constraint WYPOZYCZENIE_PK
        primary key (ID_WYPOZYCZENIA),
    constraint WYPOZYCZENIE_FK_ODBIOR
        foreign key (ID_ODBIORU) references ODBIOR_SAMOCHODU
)
/



create table LOGOWANIE_KLIENCI
(
    ID_LOGOWANIE_KLIENT NUMBER not null,
    ID_KLIENTA          NUMBER,
    LOGIN               VARCHAR2(20),
    HASLO               VARCHAR2(20),
    constraint ID_LOGOWANIE_KLIENT_PK
        primary key (ID_LOGOWANIE_KLIENT),
    constraint ID_KLIENTA_FK
        foreign key (ID_KLIENTA) references KLIENCI
)
/

create table LOGOWANIE_PRACOWNICY
(
    ID_LOGOWANIE_PRACOWNICY NUMBER not null,
    ID_PRACOWNIKA           NUMBER,
    LOGIN                   VARCHAR2(20),
    HASLO                   VARCHAR2(20),
    constraint ID_LOGOWANIE_PRACOWNICY_PK
        primary key (ID_LOGOWANIE_PRACOWNICY),
    constraint ID_PRACOWNIK_FK
        foreign key (ID_PRACOWNIKA) references PRACOWNICY
)
/

