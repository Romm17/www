<?php
	session_start();
	include "classes/core.class.php";
	$option = "main";
	if(isset($_GET['option']) && isset($_SESSION['name'])){
		if(file_exists("classes/".$_GET['option'].".class.php")){
			$option = $_GET['option'];
		}
	}
	include "classes/".$option.".class.php";
	$obj = new $option();
	$obj->getBody();
?>