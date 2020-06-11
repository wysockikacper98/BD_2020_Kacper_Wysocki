<?php

require 'connect.php';

$samochody = [];
//$sql = "SELECT * FROM SAMOCHODY ORDER BY ID_SAMOCHODU";
$sql = 'begin WYSWIETLSAMOCHODY(:cursbv); end;';

$curs = oci_new_cursor($con);

$stid = oci_parse($con, $sql);

oci_bind_by_name($stid, ":cursbv", $curs, -1, OCI_B_CURSOR);

oci_execute($stid);
oci_execute($curs);

$cr = 0;
while ($row = oci_fetch_array($curs, OCI_ASSOC+OCI_RETURN_NULLS)) {
    $samochody[$cr]['ID_SAMOCHODU'] = $row['ID_SAMOCHODU'];
    $samochody[$cr]['ID_LOKALU'] = $row['ID_LOKALU'];
    $samochody[$cr]['MARKA'] = $row['MARKA'];
    $samochody[$cr]['MODEL'] = $row['MODEL'];
    $samochody[$cr]['ROK'] = $row['ROK'];
    $samochody[$cr]['KOLOR'] = $row['KOLOR'];
    $samochody[$cr]['ILOSC_MIEJSC'] = $row['ILOSC_MIEJSC'];
    $samochody[$cr]['POJEMNOSC_BAGAZNIKA'] = $row['POJEMNOSC_BAGAZNIKA'];
    $samochody[$cr]['RODZAJ_SKRZYNI_BIEGOW'] = $row['RODZAJ_SKRZYNI_BIEGOW'];
    $samochody[$cr]['CENA_ZA_DZIEN'] = $row['CENA_ZA_DZIEN'];
    $cr++;
}
echo json_encode(['data' => $samochody]);

