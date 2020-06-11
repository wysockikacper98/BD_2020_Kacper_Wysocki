<?php
require 'connect.php';

$daneWypozyczen =[];

$sql = "begin daneAktywnychWypozyczen(:cursbv); end;";
$curs = oci_new_cursor($con);
$stid = oci_parse($con, $sql);
oci_bind_by_name($stid, ":cursbv", $curs, -1, OCI_B_CURSOR);


oci_execute($stid);

if(oci_execute($curs)){
    $cr = 0;
    while ($row = oci_fetch_array($curs, OCI_ASSOC+OCI_RETURN_NULLS)){
        $daneWypozyczen[$cr]['ID_WYDANIA'] = $row['ID_WYDANIA'];
        $daneWypozyczen[$cr]['IMIE'] = $row['IMIE'];
        $daneWypozyczen[$cr]['NAZWISKO'] = $row['NAZWISKO'];
        $daneWypozyczen[$cr]['ID_SAMOCHODU'] = $row['ID_SAMOCHODU'];
        $daneWypozyczen[$cr]['MARKA'] = $row['MARKA'];
        $daneWypozyczen[$cr]['MODEL'] = $row['MODEL'];
        $daneWypozyczen[$cr]['DATA_POCZATKU_WYPOZYCZENIA'] = $row['DATA_POCZATKU_WYPOZYCZENIA'];
        $daneWypozyczen[$cr]['DATA_KONCA_WYPOZYCZENIA'] = $row['DATA_KONCA_WYPOZYCZENIA'];

        $cr++;
    }

    echo json_encode(['data' => $daneWypozyczen]);
}else{
    http_response_code(404);
}


