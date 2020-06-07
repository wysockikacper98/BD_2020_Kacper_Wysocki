<?php
require "connect.php";

//get posted data
$postData = file_get_contents("php://input");

if(isset($postData) && !empty($postData)){
    //extract data
    $request = json_decode($postData);

    $IMIE = $request->IMIE;
    $NAZWISKO = $request->NAZWISKO;
    $NIP = $request->NIP;
    $NR_TELEFONU = $request->NR_TELEFONU;


    $sql = 'INSERT INTO KLIENCI(IMIE, NAZWISKO, NIP, NR_TELEFONU)'.
        ' VALUES (:IMIE, :NAZWISKO, :NIP, :NR_TELEFONU)';

    $compiled = oci_parse($con, $sql);

    oci_bind_by_name($compiled, ':IMIE', $IMIE);
    oci_bind_by_name($compiled, ':NAZWISKO', $NAZWISKO);
    oci_bind_by_name($compiled, ':NIP', $NIP);
    oci_bind_by_name($compiled, ':NR_TELEFONU', $NR_TELEFONU);

    oci_execute($compiled);

    //wysyłanie danych dotyczacych konkretnego klienta

    $sql = "select * from KLIENCI
where IMIE = :IMIE
and NAZWISKO = :NAZWISKO
and NIP = :NIP
and NR_TELEFONU = :NR_TELEFONU";

    $stid = oci_parse($con, $sql);

    oci_bind_by_name($stid, ':IMIE', $IMIE);
    oci_bind_by_name($stid, ':NAZWISKO', $NAZWISKO);
    oci_bind_by_name($stid, ':NIP', $NIP);
    oci_bind_by_name($stid, ':NR_TELEFONU', $NR_TELEFONU);

    oci_execute($stid);

    if(oci_execute($stid)){
        $row = oci_fetch_array($stid, OCI_BOTH);

        $klient['ID_KLIENTA'] = $row['ID_KLIENTA'];
        $klient['IMIE'] = $row['IMIE'];
        $klient['NAZWISKO'] = $row['NAZWISKO'];
        $klient['NR_TELEFONU'] = $row['ID_KLIENTA'];
        $klient['NIP'] = $row['NIP'];


        echo json_encode(['data' => $klient]);
        oci_commit($con);

    }else{
        http_response_code(404);
    }

    //koniec wysyłania danych z rezerwacji
}else
    echo "nie podano danych";


oci_close($con);
