<?php
	session_start();
	unset($_SESSION['Id']);
	unset($_SESSION['name']);
	unset($_SESSION['gameId']);
	unset($_SESSION['pos']);
	header("Location: index.php");
?>