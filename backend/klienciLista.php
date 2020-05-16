<?php
require 'connect.php';

$klienci = [];
$sql = "SELECT * FROM klienci";

$stid = oci_parse($con, $sql);
oci_execute($stid);

if (oci_execute($stid)) {
    $cr = 0;
    while ($row = oci_fetch_array($stid, OCI_BOTH)) {
            $klienci[$cr]['ID_KLIENTA']= $row['ID_KLIENTA'];
            $klienci[$cr]['IMIE']= $row['IMIE'];
            $klienci[$cr]['NAZWISKO']= $row['NAZWISKO'];
            $klienci[$cr]['NIP']= $row['NIP'];
            $klienci[$cr]['NR_TELEFONU']= $row['NR_TELEFONU'];
            $cr++;
    }
    echo json_encode(['data' => $klienci]);

}else{
    http_response_code(404);
}



//
//echo "<table border='1'>\n";
//while ($row = oci_fetch_array($stid, OCI_ASSOC+OCI_RETURN_NULLS)) {
//    echo "<tr>\n";
//    foreach ($row as $item) {
//        echo "    <td>" . ($item !== null ? htmlentities($item, ENT_QUOTES) : "&nbsp;") . "</td>\n";
//    }
//    echo "</tr>\n";
//}
//echo "</table>\n";
