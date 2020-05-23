<?php

require 'connect.php';

$pracownicyPass = [];
$sql = "SELECT * FROM LOGOWANIE_PRACOWNICY";

$stid = oci_parse($con, $sql);

if (oci_execute($stid)) {
    $cr = 0;
    while ($row = oci_fetch_array($stid, OCI_BOTH)) {
        $pracownicyPass[$cr]['ID_LOGOWANIE_PRACOWNICY'] = $row['ID_LOGOWANIE_PRACOWNICY'];
        $pracownicyPass[$cr]['ID_PRACOWNIKA'] = $row['ID_PRACOWNIKA'];
        $pracownicyPass[$cr]['LOGIN'] = $row['LOGIN'];
        $pracownicyPass[$cr]['HASLO'] = $row['HASLO'];

        $cr++;
    }
    echo json_encode(['data' => $pracownicyPass]);

} else {
    http_response_code(404);
}
