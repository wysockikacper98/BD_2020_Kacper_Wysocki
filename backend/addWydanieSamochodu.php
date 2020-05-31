<?php

require 'connect.php';

$postData = file_get_contents("php://input");


if(isset($postData) && !empty($postData)) {
    //extract data
    $request = json_decode($postData);

//    $ID_WYDANIA = $request->ID_WYDANIA;
    $ID_REZERWACJI = $request->ID_REZERWACJI;
    $ID_PRACOWNIKA = $request->ID_PRACOWNIKA;
    $DATA_WYDANIA_SAMOCHODU = $request->DATA_WYDANIA_SAMOCHODU;

    $sql = 'insert into WYDANIE_SAMOCHODU(ID_REZERWACJI, ID_PRACOWNIKA, DATA_WYDANIA_SAMOCHODU)
            values (:ID_REZERWACJI, :ID_PRACOWNIKA, :DATA_WYDANIA_SAMOCHODU)';

    $compiled = oci_parse($con, $sql);

//    oci_bind_by_name($compiled, ':ID_WYDANIA', $ID_WYDANIA);
    oci_bind_by_name($compiled, ':ID_REZERWACJI', $ID_REZERWACJI);
    oci_bind_by_name($compiled, ':ID_PRACOWNIKA', $ID_PRACOWNIKA);
    oci_bind_by_name($compiled, ':DATA_WYDANIA_SAMOCHODU', $DATA_WYDANIA_SAMOCHODU);

    oci_execute($compiled);

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

}else
    echo 'nie podano danych';
