<?php
require 'connect.php';
$wydanieSamochodu = [];
$sql = "select * from WYDANIE_SAMOCHODU";

$stid = oci_parse($con, $sql);
oci_execute($stid);

if(oci_execute($stid)){
    $cr = 0;
    while($row = oci_fetch_array($stid, OCI_BOTH)){
        $wydanieSamochodu[$cr]['ID_WYDANIA'] = $row['ID_WYDANIA'];
        $wydanieSamochodu[$cr]['ID_REZERWACJI'] = $row['ID_REZERWACJI'];
        $wydanieSamochodu[$cr]['ID_PRACOWNIKA'] = $row['ID_PRACOWNIKA'];
        $wydanieSamochodu[$cr]['DATA_WYDANIA_SAMOCHODU'] = $row['DATA_WYDANIA_SAMOCHODU'];
        $cr++;
    }
    echo json_encode(['data'=> $wydanieSamochodu]);
}else{
    http_response_code(404);
}
