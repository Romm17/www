<?php
	include "base.php";
	$mysqli = connect_db("seawar");
	for($i = 0;$i < 100; $i++){
	$mysqli->query("INSERT INTO player2
					(A,B,C,D,E,F,G,H,I,K)
					VALUES
					(0,0,0,0,0,0,0,0,0,0)");
	}
?>