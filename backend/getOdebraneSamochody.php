<?php

require 'connect.php';
$odebraneSamochody = [];
$sql = "begin getOdebraneSamochody(:cursbv); end;";
$curs = oci_new_cursor($con);

$stid = oci_parse($con, $sql);
oci_bind_by_name($stid, ":cursbv", $curs, -1, OCI_B_CURSOR);

oci_execute($stid);

if (oci_execute($curs)) {
    $cr = 0;
    while ($row = oci_fetch_array($curs, OCI_ASSOC + OCI_RETURN_NULLS)) {
        $odebraneSamochody[$cr]['ID_ODBIORU'] = $row['ID_ODBIORU'];
        $odebraneSamochody[$cr]['ID_WYDANIA'] = $row['ID_WYDANIA'];
        $odebraneSamochody[$cr]['ID_PRACOWNIKA'] = $row['ID_PRACOWNIKA'];
        $odebraneSamochody[$cr]['DATA_ODBIORU_SAMOCHODU'] = $row['DATA_ODBIORU_SAMOCHODU'];
        $cr++;
    }
    echo json_encode(['data' => $odebraneSamochody]);
} else {
    http_response_code(404);
}
