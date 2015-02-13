<?php
	session_start();
	include "base.php";
	if($_POST['but'] == 'new') {
		$boole = 1;
		$_SESSION['pos'] = 1;
	}
		else {
			$boole = 0;
			$_SESSION['pos'] = 2;
		}
	$_SESSION['name'] = $_POST['name'];
	$imja = $_POST['name'];
	$mysqli = connect_db("seawar");
	$mysqli->query("INSERT INTO players 
					(Login, Desire)
					VALUES 
					('$imja', '$boole')
					");
	$var = $mysqli->query("SELECT Id FROM players
								WHERE Login='$imja'");
	$currId = $var->fetch_assoc();
	$curr = $currId['Id'];
	$_SESSION['Id'] = $curr;
	if($boole){
		$games = $mysqli->query("SELECT * FROM games");
		$gameId = 0;
		for($i = 1; $i <= 10; $i++){
			if($tmp = $games->fetch_assoc()){
				if($tmp['Id'] > $i) {
					$gameId = $i;
					break;
				}
				if ($tmp['Id'] == $i) continue;
			}
			else{
				$gameId = $i;
				break;
			}
		}
		if($gameId){
			$mysqli->query("INSERT INTO games
						(Id, P1, P2, Active)
						VALUES ('$gameId', '$curr', 'NULL', 1)
						");
			$_SESSION['gameId'] = $gameId;
		}
	}
	else{
		$res = $mysqli->query("SELECT games.Id, players.Login
							FROM players 
							INNER JOIN games 
							ON players.Id = games.P1
							WHERE games.P2 = 'NULL'
							");
		if($xuxu = $res->fetch_assoc()){
			do{
				foreach($xuxu as $ind => $val) if($ind == "Login") echo $val;
				if(!$xuxu = $res->fetch_assoc()) break;
				echo "<br/>";
			} while(true);
		}
	}
?>