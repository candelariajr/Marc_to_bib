<?php
/**
 * Created by PhpStorm.
 * User: candelariajr
 * Date: 1/17/2017
 * Time: 1:21 PM
 */
require "dbauth.php";


if(isset($_GET['oclcNumber'])){
    $oclcNum = preg_replace("/\D/", "", $_GET['oclcNumber']);
}

try{
    $connec = new PDO("pgsql:host=$host;dbname=$database;port=$port;sslmode=require", $user, $password);
}catch (PDOException $e) {
    echo "Error : " . $e->getMessage() . "<br/>";
    die();
}
$sql = "
    SELECT 
      'b' || record_num AS bib_record_num 
    FROM 
      sierra_view.bib_view 
    WHERE id = (
        SELECT
		  record_id
	    FROM
		  sierra_view.varfield
	    WHERE
		  marc_tag = '001' AND field_content IN ('$oclcNum')
	LIMIT 1)";
foreach ($connec->query($sql) as $row)
{
    print $row['bib_record_num'] . " ";
}

$connec=null;
