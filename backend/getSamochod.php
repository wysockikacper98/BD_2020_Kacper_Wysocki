<?php

require 'connect.php';

$id_samochodu = null;
$id_samochodu = file_get_contents("php://input");

if (isset($id_samochodu)) {


    $sql = "SELECT * FROM SAMOCHODY
            where ID_SAMOCHODU = $id_samochodu";

    $stid = oci_parse($con, $sql);

    if (oci_execute($stid)) {
        $row = oci_fetch_array($stid, OCI_BOTH);

        $samochod['ID_SAMOCHODU'] = $row['ID_SAMOCHODU'];
        $samochod['ID_LOKALU'] = $row['ID_LOKALU'];
        $samochod['MARKA'] = $row['MARKA'];
        $samochod['MODEL'] = $row['MODEL'];
        $samochod['ROK'] = $row['ROK'];
        $samochod['KOLOR'] = $row['KOLOR'];
        $samochod['ILOSC_MIEJSC'] = $row['ILOSC_MIEJSC'];
        $samochod['POJEMNOSC_BAGAZNIKA'] = $row['POJEMNOSC_BAGAZNIKA'];
        $samochod['RODZAJ_SKRZYNI_BIEGOW'] = $row['RODZAJ_SKRZYNI_BIEGOW'];
        $samochod['CENA_ZA_DZIEN'] = $row['CENA_ZA_DZIEN'];

        echo json_encode(['data' => $samochod]);

    } else {
        http_response_code(404);
    }
}
