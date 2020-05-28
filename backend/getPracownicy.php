<?php
require 'connect.php';

$pracownicy = [];
$sql = "select * from PRACOWNICY";

$stdi = oci_parse($con, $sql);

if (oci_execute($stdi)) {
    $cr = 0;
    while ($row = oci_fetch_array($stdi, OCI_BOTH)) {
        $pracownicy[$cr]['ID_PRACOWNIKA'] = $row['ID_PRACOWNIKA'];
        $pracownicy[$cr]['ID_LOKALU'] = $row['ID_LOKALU'];
        $pracownicy[$cr]['IMIE'] = $row['IMIE'];
        $pracownicy[$cr]['NAZWISKO'] = $row['NAZWISKO'];
        $pracownicy[$cr]['ZAROBKI'] = $row['ZAROBKI'];
        $cr++;
    }
    echo json_encode(['data' => $pracownicy]);
}else{
    http_response_code(404);
}
