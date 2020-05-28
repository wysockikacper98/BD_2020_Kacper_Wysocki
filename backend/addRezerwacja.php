<?php
require "connect.php";

//get posted data
$postData = file_get_contents("php://input");

if(isset($postData) && !empty($postData)){
    //extract data
    $request = json_decode($postData);

    print_r($request);

    $ID_REZERWACJI = $request->data[0]->ID_REZERWACJI;
    $ID_KLIENTA = $request->data[0]->ID_KLIENTA;
    $ID_SAMOCHODU = $request->data[0]->ID_SAMOCHODU;
    $DATA_POCZATKU_WYPOZYCZENIA = $request->data[0]->DATA_POCZATKU_WYPOZYCZENIA;
    $DATA_KONCA_WYPOZYCZENIA = $request->data[0]->DATA_KONCA_WYPOZYCZENIA;

    $sql = 'INSERT INTO REZERWACJA(ID_REZERWACJI, ID_KLIENTA, ID_SAMOCHODU, DATA_POCZATKU_WYPOZYCZENIA, DATA_KONCA_WYPOZYCZENIA)'.
        ' VALUES (:ID_REZERWACJI, :ID_KLIENTA, :ID_SAMOCHODU, :DATA_POCZATKU_WYPOZYCZENIA, :DATA_KONCA_WYPOZYCZENIA)';

    $compiled = oci_parse($con, $sql);

    oci_bind_by_name($compiled, ':ID_REZERWACJI', $ID_REZERWACJI);
    oci_bind_by_name($compiled, ':ID_KLIENTA', $ID_KLIENTA);
    oci_bind_by_name($compiled, ':ID_SAMOCHODU', $ID_SAMOCHODU);
    oci_bind_by_name($compiled, ':DATA_POCZATKU_WYPOZYCZENIA', $DATA_POCZATKU_WYPOZYCZENIA);
    oci_bind_by_name($compiled, ':DATA_KONCA_WYPOZYCZENIA', $DATA_KONCA_WYPOZYCZENIA);

    oci_execute($compiled);
}else
    echo "nie podano danych";
