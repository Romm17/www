<?php
	session_start();
	include "base.php";
	if($_SESSION['move']){
		$val = $_POST['cell'];
		$bukva = substr($val, 0, 1);
		$row = substr($val, 1, strlen($val)-1);
		if($_SESSION['pos'] == 1) $id = 2; else $id = 1;
		$table = "player".$id;
		$gameId = $_SESSION['gameId'];
		echo checkShip($table, $bukva, $row+($_SESSION['gameId']-1)*10);
		$mysqli = connect_db("seawar");
		if($_SESSION['pos'] == 1) $pos = 2; else $pos = 1;
		$mysqli->query("
						UPDATE games
						SET Active='$pos', LastShot='$val'
						WHERE Id='$gameId'
						");
	}
	else {
		$mysqli = connect_db("seawar");
		$res = $mysqli->query("
						SELECT Active, LastShot
						FROM games
						WHERE Id='$gameId'
						")->fetch_assoc();
		$active = $res['Active'];
		if($active == $_SESSION['pos']) echo $res['LastShot'];
		else echo "";
	}
?>