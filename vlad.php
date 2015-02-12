<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title> Mega game </title>
		<link href="indexS.css" type="text/css" rel="stylesheet">
		<script src="JS\setShip.js"></script>
	</head>
<body>
<div id="header">
	<h1> Морской бой </h1>
</div>
<div id="main">
	<?php
		include "base.php";
		showField(1);
	?>
	<form method="POST" action="null.php">
		<button type="submit"> Null </button>
	</form>
	<form>
		<p> Bukva:
			<select id='bukva'>
				<option> A </option>
				<option> B </option>
				<option> C </option>
				<option> D </option>
				<option> E </option>
				<option> F </option>
				<option> G </option>
				<option> H </option>
				<option> I </option>
				<option> K </option>
			</select>
		</p>
		<p> Bukva:
			<select id='row'>
				<option> 1 </option>
				<option> 2 </option>
				<option> 3 </option>
				<option> 4 </option>
				<option> 5 </option>
				<option> 6 </option>
				<option> 7 </option>
				<option> 8 </option>
				<option> 9 </option>
				<option> 10 </option>
			</select>
		</p>
		<button onclick="setShip();">Submit</button>
	</form>
</div>

</body>
</html>