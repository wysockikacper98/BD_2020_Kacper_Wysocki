<?php

require 'connect.php';

$klienciPass = [];
$sql = "begin getDaneLogowaniaKlienci(:cursbv); end;";
$curs = oci_new_cursor($con);

$stid = oci_parse($con, $sql);
oci_bind_by_name($stid, ":cursbv", $curs, -1, OCI_B_CURSOR);

oci_execute($stid);
if (oci_execute($curs)) {
    $cr = 0;
    while ($row = oci_fetch_array($curs, OCI_ASSOC+OCI_RETURN_NULLS)) {
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
