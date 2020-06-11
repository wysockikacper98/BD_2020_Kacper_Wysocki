<?php

require 'connect.php';

$pracownicyPass = [];
$sql = "begin getDaneLogowaniaPracownicy(:cursbv); end;";
$curs = oci_new_cursor($con);

$stid = oci_parse($con, $sql);
oci_bind_by_name($stid, ":cursbv", $curs, -1, OCI_B_CURSOR);

oci_execute($stid);
if (oci_execute($curs)) {
    $cr = 0;
    while ($row = oci_fetch_array($curs, OCI_ASSOC+OCI_RETURN_NULLS)) {
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
