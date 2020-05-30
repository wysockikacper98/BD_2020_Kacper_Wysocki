<?php
require 'connect.php';

$daneRezerwacji = [];

$sql = "
select k.IMIE,
       k.NAZWISKO,
       r.ID_REZERWACJI,
       r.ID_SAMOCHODU,
       MARKA,
       MODEL,
       DATA_POCZATKU_WYPOZYCZENIA,
       DATA_KONCA_WYPOZYCZENIA
from REZERWACJA r,
     KLIENCI k,
     WYDANIE_SAMOCHODU w,
     SAMOCHODY s
where r.ID_KLIENTA = k.ID_KLIENTA
  and r.ID_SAMOCHODU = s.ID_SAMOCHODU
  and w.ID_REZERWACJI != r.ID_REZERWACJI
order by DATA_POCZATKU_WYPOZYCZENIA";

$stid = oci_parse($con, $sql);

oci_execute($stid);

if(oci_execute($stid)){
    $cr = 0;
    while ($row = oci_fetch_array($stid, OCI_BOTH)){
        $daneRezerwacji[$cr]['IMIE'] = $row['IMIE'];
        $daneRezerwacji[$cr]['NAZWISKO'] = $row['NAZWISKO'];
        $daneRezerwacji[$cr]['ID_REZERWACJI'] = $row['ID_REZERWACJI'];
        $daneRezerwacji[$cr]['ID_SAMOCHODU'] = $row['ID_SAMOCHODU'];
        $daneRezerwacji[$cr]['MARKA'] = $row['MARKA'];
        $daneRezerwacji[$cr]['MODEL'] = $row['MODEL'];
        $daneRezerwacji[$cr]['DATA_POCZATKU_WYPOZYCZENIA'] = $row['DATA_POCZATKU_WYPOZYCZENIA'];
        $daneRezerwacji[$cr]['DATA_KONCA_WYPOZYCZENIA'] = $row['DATA_KONCA_WYPOZYCZENIA'];
        $cr++;
    }

    echo json_encode(['data' => $daneRezerwacji]);

}else{
    http_response_code(404);
}
