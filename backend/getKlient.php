<?php

require 'connect.php';

//$id_klienta = file_get_contents("php://input");
$id_klienta = 6;
if (isset($id_klienta)) {

    $sql = "select * from KLIENCI
        where ID_KLIENTA = $id_klienta";

    $stid = oci_parse($con, $sql);
//    oci_execute($stid);

    if (oci_execute($stid)) {
        $row = oci_fetch_array($stid, OCI_BOTH);
        $klient['ID_KLIENTA'] = $row['ID_KLIENTA'];
        $klient['IMIE'] = $row['IMIE'];
        $klient['NAZWISKO'] = $row['NAZWISKO'];
        $klient['NIP'] = $row['NIP'];
        $klient['NR_TELEFONU'] = $row['NR_TELEFONU'];

        echo json_encode(['data' => $klient]);
    } else {
        http_response_code(404);
    }
}
