<?php
	session_start();
	include "base.php";
	$mysqli = connect_db("seawar");
	$login = $_POST['nick'];
	echo $login;
	$myId = $_SESSION['Id'];
	$mysqli->query("UPDATE games
					SET P2='$myId'
					WHERE P1=(
					SELECT Id FROM `players` WHERE Login='$login'
					)
					");
	$res = $mysqli->query("SELECT Id 
							FROM games 
							WHERE P2='$myId'
							")->fetch_assoc();
	$_SESSION['gameId'] = $res['Id'];
?>