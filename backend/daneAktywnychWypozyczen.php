<?php
require 'connect.php';

$daneWypozyczen =[];

$sql = "
select w.ID_WYDANIA, IMIE, NAZWISKO, S.ID_SAMOCHODU, MARKA, MODEL, DATA_POCZATKU_WYPOZYCZENIA, DATA_KONCA_WYPOZYCZENIA
from  WYDANIE_SAMOCHODU w
left join ODBIOR_SAMOCHODU o
on w.ID_WYDANIA = o.ID_WYDANIA
left join REZERWACJA R on w.ID_REZERWACJI = R.ID_REZERWACJI
left join KLIENCI K on R.ID_KLIENTA = K.ID_KLIENTA
left join SAMOCHODY S on R.ID_SAMOCHODU = S.ID_SAMOCHODU
where o.ID_WYDANIA is null

order by DATA_KONCA_WYPOZYCZENIA
";

$stid = oci_parse($con, $sql);

oci_execute($stid);

if(oci_execute($stid)){
    $cr = 0;
    while ($row = oci_fetch_array($stid, OCI_BOTH)){
        $daneWypozyczen[$cr]['ID_WYDANIA'] = $row['ID_WYDANIA'];
        $daneWypozyczen[$cr]['IMIE'] = $row['IMIE'];
        $daneWypozyczen[$cr]['NAZWISKO'] = $row['NAZWISKO'];
        $daneWypozyczen[$cr]['ID_SAMOCHODU'] = $row['ID_SAMOCHODU'];
        $daneWypozyczen[$cr]['MARKA'] = $row['MARKA'];
        $daneWypozyczen[$cr]['MODEL'] = $row['MODEL'];
        $daneWypozyczen[$cr]['DATA_POCZATKU_WYPOZYCZENIA'] = $row['DATA_POCZATKU_WYPOZYCZENIA'];
        $daneWypozyczen[$cr]['DATA_KONCA_WYPOZYCZENIA'] = $row['DATA_KONCA_WYPOZYCZENIA'];

        $cr++;
    }

    echo json_encode(['data' => $daneWypozyczen]);
}else{
    http_response_code(404);
}


