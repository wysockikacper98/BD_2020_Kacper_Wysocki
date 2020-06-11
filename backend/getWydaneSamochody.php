<?php
require 'connect.php';
$wydanieSamochodu = [];
$sql = "begin getWydaneSamochody(:cursbv); end;";
$curs = oci_new_cursor($con);

$stid = oci_parse($con, $sql);
oci_bind_by_name($stid, ":cursbv", $curs, -1, OCI_B_CURSOR);

oci_execute($stid);

if(oci_execute($curs)){
    $cr = 0;
    while($row = oci_fetch_array($curs, OCI_ASSOC+OCI_RETURN_NULLS)){
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
