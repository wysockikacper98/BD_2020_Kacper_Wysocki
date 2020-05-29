<?php
require "connect.php";

//get posted data
$postData = file_get_contents("php://input");

if(isset($postData) && !empty($postData)){
    //extract data
    $request = json_decode($postData);

//    print_r($request);

//    $ID_REZERWACJI = $request->data[0]->ID_REZERWACJI;
//    $ID_KLIENTA = $request->data[0]->ID_KLIENTA;
//    $ID_SAMOCHODU = $request->data[0]->ID_SAMOCHODU;
//    $DATA_POCZATKU_WYPOZYCZENIA = $request->data[0]->DATA_POCZATKU_WYPOZYCZENIA;
//    $DATA_KONCA_WYPOZYCZENIA = $request->data[0]->DATA_KONCA_WYPOZYCZENIA;

    $ID_REZERWACJI = $request->ID_REZERWACJI;
    $ID_KLIENTA = $request->ID_KLIENTA;
    $ID_SAMOCHODU = $request->ID_SAMOCHODU;
    $DATA_POCZATKU_WYPOZYCZENIA = $request->DATA_POCZATKU_WYPOZYCZENIA;
    $DATA_KONCA_WYPOZYCZENIA = $request->DATA_KONCA_WYPOZYCZENIA;

    $tempFromData = "20-MAY-20";
    $tempToData = "23-MAY-20";

    $sql = 'INSERT INTO REZERWACJA(ID_REZERWACJI, ID_KLIENTA, ID_SAMOCHODU, DATA_POCZATKU_WYPOZYCZENIA, DATA_KONCA_WYPOZYCZENIA)'.
        ' VALUES (:ID_REZERWACJI, :ID_KLIENTA, :ID_SAMOCHODU, :DATA_POCZATKU_WYPOZYCZENIA, :DATA_KONCA_WYPOZYCZENIA)';

    $compiled = oci_parse($con, $sql);

    oci_bind_by_name($compiled, ':ID_REZERWACJI', $ID_REZERWACJI);
    oci_bind_by_name($compiled, ':ID_KLIENTA', $ID_KLIENTA);
    oci_bind_by_name($compiled, ':ID_SAMOCHODU', $ID_SAMOCHODU);
    oci_bind_by_name($compiled, ':DATA_POCZATKU_WYPOZYCZENIA', $tempFromData);
    oci_bind_by_name($compiled, ':DATA_KONCA_WYPOZYCZENIA', $tempToData);

    oci_execute($compiled);

    //wysyłanie danych z rezerwacji

    $rezerwacja = [];
    $sql = "SELECT * FROM REZERWACJA";

    $stid = oci_parse($con, $sql);
    oci_execute($stid);

    if(oci_execute($stid)){
        $cr = 0;
        while ($row = oci_fetch_array($stid, OCI_BOTH)){
            $rezerwacja[$cr]['ID_REZERWACJI'] = $row['ID_REZERWACJI'];
            $rezerwacja[$cr]['ID_KLIENTA'] = $row['ID_KLIENTA'];
            $rezerwacja[$cr]['ID_SAMOCHODU'] = $row['ID_SAMOCHODU'];
            $rezerwacja[$cr]['DATA_POCZATKU_WYPOZYCZENIA'] = $row['DATA_POCZATKU_WYPOZYCZENIA'];
            $rezerwacja[$cr]['DATA_KONCA_WYPOZYCZENIA'] = $row['DATA_KONCA_WYPOZYCZENIA'];
            $cr++;
        }

        echo json_encode(['data' => $rezerwacja]);

    }else{
        http_response_code(404);
    }

    //koniec wysyłania danych z rezerwacji
    }else
    echo "nie podano danych";
