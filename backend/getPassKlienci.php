<?php

require 'connect.php';

$klienciPass = [];
$sql = "SELECT * FROM LOGOWANIE_KLIENCI";

$stid = oci_parse($con, $sql);

if (oci_execute($stid)) {
    $cr = 0;
    while ($row = oci_fetch_array($stid, OCI_BOTH)) {
        $klienciPass[$cr]['ID_LOGOWANIE_KLIENT'] = $row['ID_LOGOWANIE_KLIENT'];
        $klienciPass[$cr]['ID_KLIENTA'] = $row['ID_KLIENTA'];
        $klienciPass[$cr]['LOGIN'] = $row['LOGIN'];
        $klienciPass[$cr]['HASLO'] = $row['HASLO'];

        $cr++;
    }
    echo json_encode(['data' => $klienciPass]);

} else {
    http_response_code(404);
}
