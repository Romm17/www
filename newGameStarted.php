<?php
	session_start();
	include "base.php";
	$mysqli = connect_db("seawar");
	$ID = $_SESSION['Id'];
	//$ID = 31;
	$res = $mysqli->query("SELECT P2 FROM games WHERE P1='$ID'");
	$temp = $res->fetch_assoc();
	echo $temp['P2'];
?>