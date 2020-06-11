<?php
require 'connect.php';

$rezerwacja = [];
$sql = "begin getRezerwacja(:cursbv); end;";
$curs = oci_new_cursor($con);

$stid = oci_parse($con, $sql);
oci_bind_by_name($stid, ":cursbv", $curs, -1, OCI_B_CURSOR);

oci_execute($stid);

if(oci_execute($curs)){
    $cr = 0;
    while ($row = oci_fetch_array($curs, OCI_ASSOC+OCI_RETURN_NULLS)){
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
