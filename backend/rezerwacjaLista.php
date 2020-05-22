<?php
require 'connect.php';

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
