<?php
require 'connect.php';

$postData = file_get_contents("php://input");

if(isset($postData) && !empty($postData)){
    //extract data
    $request = json_decode($postData);

    $ID_WYDANIA = $request->ID_WYDANIA;
    $ID_PRACOWNIKA = $request->ID_PRACOWNIKA;
    $DATA_ODBIORU_SAMOCHODU = $request->DATA_ODBIORU_SAMOCHODU;

    $sql = 'insert into ODBIOR_SAMOCHODU(ID_WYDANIA, ID_PRACOWNIKA, DATA_ODBIORU_SAMOCHODU)
            values (:ID_WYDANIA, :ID_PRACOWNIKA, :DATA_ODBIORU_SAMOCHODU)';

    $compiled = oci_parse($con, $sql);

    oci_bind_by_name($compiled, ':ID_WYDANIA', $ID_WYDANIA);
    oci_bind_by_name($compiled, ':ID_PRACOWNIKA', $ID_PRACOWNIKA);
    oci_bind_by_name($compiled, ':DATA_ODBIORU_SAMOCHODU', $DATA_ODBIORU_SAMOCHODU);

    oci_execute($compiled);

    $odbiorSamochodu = [];
    $sql = "select * from ODBIOR_SAMOCHODU";

    $stid = oci_parse($con, $sql);
    oci_execute($stid);

    if(oci_execute($stid)){
        $cr = 0;
        while($row = oci_fetch_array($stid, OCI_BOTH)){
            $odbiorSamochodu[$cr]['ID_ODBIORU'] = $row['ID_ODBIORU'];
            $odbiorSamochodu[$cr]['ID_WYDANIA'] = $row['ID_WYDANIA'];
            $odbiorSamochodu[$cr]['ID_PRACOWNIKA'] = $row['ID_PRACOWNIKA'];
            $odbiorSamochodu[$cr]['DATA_ODBIORU_SAMOCHODU'] = $row['DATA_ODBIORU_SAMOCHODU'];
            $cr++;
        }
        echo json_encode(['data'=> $odbiorSamochodu]);
    }else{
        http_response_code(404);
    }

}else
    echo 'nie podano danych';
