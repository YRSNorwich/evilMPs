<?php

header("Expires: Mon, 26 Jul 1997 05:00:00 GMT");
header("Last-Modified: " . gmdate("D, d M Y H:i:s") . " GMT"); 
header("Cache-Control: no-store, no-cache, must-revalidate"); 
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");

$foxhunting = $_POST["1"];
$abortion = $_POST["2"];
$eu = $_POST["3"];

$pad = "&nbsp;&nbsp;&nbsp;";

echo $foxhunting+$abortion+$eu;

?>