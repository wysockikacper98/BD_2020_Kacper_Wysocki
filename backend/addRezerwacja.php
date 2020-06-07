<?php
require "connect.php";

//get posted data
$postData = file_get_contents("php://input");

if(isset($postData) && !empty($postData)){
    //extract data
    $request = json_decode($postData);

//    print_r($request);

//    $ID_REZERWACJI = $request->ID_REZERWACJI;
    $ID_KLIENTA = $request->ID_KLIENTA;
    $ID_SAMOCHODU = $request->ID_SAMOCHODU;
    $DATA_POCZATKU_WYPOZYCZENIA = $request->DATA_POCZATKU_WYPOZYCZENIA;
    $DATA_KONCA_WYPOZYCZENIA = $request->DATA_KONCA_WYPOZYCZENIA;
    $EMAIL = $request->EMAIL;


    $sql = 'INSERT INTO REZERWACJA(ID_KLIENTA, ID_SAMOCHODU, DATA_POCZATKU_WYPOZYCZENIA, DATA_KONCA_WYPOZYCZENIA)'.
        ' VALUES (:ID_KLIENTA, :ID_SAMOCHODU, :DATA_POCZATKU_WYPOZYCZENIA, :DATA_KONCA_WYPOZYCZENIA)';

    $compiled = oci_parse($con, $sql);

//    oci_bind_by_name($compiled, ':ID_REZERWACJI', $ID_REZERWACJI);
    oci_bind_by_name($compiled, ':ID_KLIENTA', $ID_KLIENTA);
    oci_bind_by_name($compiled, ':ID_SAMOCHODU', $ID_SAMOCHODU);
    oci_bind_by_name($compiled, ':DATA_POCZATKU_WYPOZYCZENIA', $DATA_POCZATKU_WYPOZYCZENIA);
    oci_bind_by_name($compiled, ':DATA_KONCA_WYPOZYCZENIA', $DATA_KONCA_WYPOZYCZENIA);

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

        if(!empty($EMAIL)) {
            //wysyłanie maila z potwierdzeniem rezerwacji
            $to_email = $EMAIL;
            $subject = "Potwierdzenie rezerwacji";
            $body = "Dzień dobry, \n Zamówienie zostało zapisane. Samochód o numerze: $ID_SAMOCHODU \n będzie oczekiwał na Ciebie w dniach: $DATA_POCZATKU_WYPOZYCZENIA - $DATA_KONCA_WYPOZYCZENIA";
            $headers = "From: Wypożyczalnia Projekt";

            if (mail($to_email, $subject, $body, $headers)) {
                echo "Email successfully sent to $to_email...";
            } else {
                echo "Email sending failed...";
            }
        }

    }else{
        http_response_code(404);
    }

    //koniec wysyłania danych z rezerwacji
    }else
    echo "nie podano danych";
