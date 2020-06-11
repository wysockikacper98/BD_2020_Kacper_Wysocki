<?php
require 'connect.php';

$daneRezerwacji = [];

$sql = "begin daneAktywnychRezerwacji(:cursbv); end;";
$curs = oci_new_cursor($con);

$stid = oci_parse($con, $sql);

oci_bind_by_name($stid, ":cursbv", $curs, -1, OCI_B_CURSOR);


oci_execute($stid);

if(oci_execute($curs)){
    $cr = 0;
    while ($row = oci_fetch_array($curs, OCI_ASSOC+OCI_RETURN_NULLS)){
        $daneRezerwacji[$cr]['IMIE'] = $row['IMIE'];
        $daneRezerwacji[$cr]['NAZWISKO'] = $row['NAZWISKO'];
        $daneRezerwacji[$cr]['ID_REZERWACJI'] = $row['ID_REZERWACJI'];
        $daneRezerwacji[$cr]['ID_SAMOCHODU'] = $row['ID_SAMOCHODU'];
        $daneRezerwacji[$cr]['MARKA'] = $row['MARKA'];
        $daneRezerwacji[$cr]['MODEL'] = $row['MODEL'];
        $daneRezerwacji[$cr]['DATA_POCZATKU_WYPOZYCZENIA'] = $row['DATA_POCZATKU_WYPOZYCZENIA'];
        $daneRezerwacji[$cr]['DATA_KONCA_WYPOZYCZENIA'] = $row['DATA_KONCA_WYPOZYCZENIA'];
        $cr++;
    }

    echo json_encode(['data' => $daneRezerwacji]);

}else{
    http_response_code(404);
}
