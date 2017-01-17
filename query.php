<?php
/**
 * Created by PhpStorm.
 * User: candelariajr
 * Date: 1/17/2017
 * Time: 1:21 PM
 */
require "dbauth.php";
$connectString = "host=$host port=$port dbname=$database user=$user password=$password";

try{
$connec = new PDO("pgsql:host=$host;dbname=$database;port=$port;sslmode=require", $user, $password);
}catch (PDOException $e) {
    echo "Error : " . $e->getMessage() . "<br/>";
    die();
}
$sql = "SELECT
		record_id
	FROM
		sierra_view.varfield
	WHERE
		marc_tag = '001' AND field_content IN ('18948921')
	LIMIT 1";
foreach ($connec->query($sql) as $row)
{
    print $row['record_id'] . " ";
}