<?php
require "connect.php";
//get posted data
$postData = file_get_contents("php://input");

if(isset($postData) && !empty($postData)){
    //extract data
    $request = json_decode($postData);

    $ID_LOKALU = $request->ID_LOKALU;
    $MARKA = $request->MARKA;
    $MODEL = $request->MODEL;
    $ROK = $request->ROK;
    $KOLOR = $request->KOLOR;
    $ILOSC_MIEJSC = $request->ILOSC_MIEJSC;
    $POJEMNOSC_BAGAZNIKA = $request->POJEMNOSC_BAGAZNIKA;
    $RODZAJ_SKRZYNI_BIEGOW = $request->RODZAJ_SKRZYNI_BIEGOW;
    $CENA_ZA_DZIEN = $request->CENA_ZA_DZIEN;



    $sql = 'INSERT INTO SAMOCHODY(ID_LOKALU, MARKA, MODEL, ROK, KOLOR, ILOSC_MIEJSC, POJEMNOSC_BAGAZNIKA, RODZAJ_SKRZYNI_BIEGOW, CENA_ZA_DZIEN)'.
        ' VALUES (:ID_LOKALU, :MARKA, :MODEL, :ROK, :KOLOR, :ILOSC_MIEJSC, :POJEMNOSC_BAGAZNIKA, :RODZAJ_SKRZYNI_BIEGOW, :CENA_ZA_DZIEN)';

    $compiled = oci_parse($con, $sql);

//    oci_bind_by_name($compiled, ':ID_REZERWACJI', $ID_REZERWACJI);
    oci_bind_by_name($compiled, ':ID_LOKALU', $ID_LOKALU);
    oci_bind_by_name($compiled, ':MARKA', $MARKA);
    oci_bind_by_name($compiled, ':MODEL', $MODEL);
    oci_bind_by_name($compiled, ':ROK', $ROK);
    oci_bind_by_name($compiled, ':KOLOR', $KOLOR);
    oci_bind_by_name($compiled, ':ILOSC_MIEJSC', $ILOSC_MIEJSC);
    oci_bind_by_name($compiled, ':POJEMNOSC_BAGAZNIKA', $POJEMNOSC_BAGAZNIKA);
    oci_bind_by_name($compiled, ':RODZAJ_SKRZYNI_BIEGOW', $RODZAJ_SKRZYNI_BIEGOW);
    oci_bind_by_name($compiled, ':CENA_ZA_DZIEN', $CENA_ZA_DZIEN);


    oci_execute($compiled);

    //wysyłanie danych z rezerwacji
    $samochody = [];
    $sql = "SELECT * FROM SAMOCHODY ORDER BY ID_SAMOCHODU";

    $stid = oci_parse($con, $sql);
    oci_execute($stid);

    if (oci_execute($stid)) {
        $cr = 0;
        while ($row = oci_fetch_array($stid, OCI_BOTH)) {
            $samochody[$cr]['ID_SAMOCHODU']= $row['ID_SAMOCHODU'];
            $samochody[$cr]['ID_LOKALU']= $row['ID_LOKALU'];
            $samochody[$cr]['MARKA']= $row['MARKA'];
            $samochody[$cr]['MODEL']= $row['MODEL'];
            $samochody[$cr]['ROK']= $row['ROK'];
            $samochody[$cr]['KOLOR']= $row['KOLOR'];
            $samochody[$cr]['ILOSC_MIEJSC']= $row['ILOSC_MIEJSC'];
            $samochody[$cr]['POJEMNOSC_BAGAZNIKA']= $row['POJEMNOSC_BAGAZNIKA'];
            $samochody[$cr]['RODZAJ_SKRZYNI_BIEGOW']= $row['RODZAJ_SKRZYNI_BIEGOW'];
            $samochody[$cr]['CENA_ZA_DZIEN']= $row['CENA_ZA_DZIEN'];
            $cr++;
        }
        echo json_encode(['data' => $samochody]);

    }else{
        http_response_code(404);
    }
    //koniec wysyłania danych z SAMOCHODÓW
}else
    echo "nie podano danych";
