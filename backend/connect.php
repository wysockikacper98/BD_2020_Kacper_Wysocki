<?php

define('DB_HOST', 'localhost/orcl1');
define('DB_USER', 'projekt');
define('DB_PASS', '123');


function connect()
{
    $connect = oci_connect(DB_USER, DB_PASS, DB_HOST);
    if (!$connect) {
        $e = oci_error();
        trigger_error(htmlentities($e['message'], ENT_QUOTES), E_USER_ERROR);
    }

    return $connect;
}

$con = connect();
