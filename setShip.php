<?php
	session_start();
	include "base.php";
	$table = "player".$_SESSION['pos'];
	$coo = explode(";", $_POST['coords']);
	foreach($coo as $ind => $val){
		$mas[0] = substr($val, 0, 1);
		$mas[1] = substr($val, 1, strlen($val)-1);
		setShip($table, $mas[0], $mas[1]+($_SESSION['gameId']-1)*10);
		$coo[$ind] = $mas;
	}
	$Pos = $_SESSION['pos'];
	$gameId = $_SESSION['gameId'];
	if($_SESSION['pos'] == 1) $_SESSION['move'] = 1;
	else $_SESSION['move'] = 0;
	print_r($coo);
?>