<?php
require "connect.php";

//get posted data
$postData = file_get_contents("php://input");

if(isset($postData) && !empty($postData)){
    //extract data
    $request = json_decode($postData);

    $ID_KLIENTA = $request->ID_KLIENTA;
    $LOGIN = $request->LOGIN;
    $HASLO = $request->HASLO;



    $sql = 'INSERT INTO LOGOWANIE_KLIENCI(ID_KLIENTA, LOGIN, HASLO)'.
        ' VALUES (:ID_KLIENTA, :LOGIN, :HASLO)';

    $compiled = oci_parse($con, $sql);

    oci_bind_by_name($compiled, ':ID_KLIENTA', $ID_KLIENTA);
    oci_bind_by_name($compiled, ':LOGIN', $LOGIN);
    oci_bind_by_name($compiled, ':HASLO', $HASLO);

    oci_execute($compiled);

    //wysyłanie danych dotyczacych konkretnego klienta

    $sql = "select * from LOGOWANIE_KLIENCI
where ID_KLIENTA = :ID_KLIENTA";

    $stid = oci_parse($con, $sql);

    oci_bind_by_name($stid, ':ID_KLIENTA', $ID_KLIENTA);

    oci_execute($stid);

    if(oci_execute($stid)){
        $row = oci_fetch_array($stid, OCI_BOTH);

        $logowanie['ID_LOGOWANIE_KLIENT'] = $row['ID_LOGOWANIE_KLIENT'];
        $logowanie['ID_KLIENTA'] = $row['ID_KLIENTA'];
        $logowanie['LOGIN'] = $row['LOGIN'];
        $logowanie['HASLO'] = $row['HASLO'];



        echo json_encode(['data' => $logowanie]);

    }else{
        http_response_code(404);
    }

    //koniec wysyłania danych z rezerwacji
}else
    echo "nie podano danych";
