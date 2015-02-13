<?php
	function connect_db($db){
		$mysqli = new mysqli("localhost", "Romm",
							"08041997", $db
							);
		return $mysqli;
	}
	
	function showField($id){
		$mysqli = connect_db("seawar");
		if(!$mysqli->connect_errno){
			$result = $mysqli->query("SELECT * FROM player1 WHERE (Num>($id-1)*10 AND Num<$id*10)");
			echo "№ a b c d e f g h i k"."<br/>";
			while($rows = $result->fetch_assoc()){
				foreach($rows as $ind => $val)	
					if($ind='Num') 
						echo ($val%10)." ";
				else echo $val." ";
				echo "<br/>";
			}
		}
	}
	
	function nullTable($table){
		$mysqli = connect_db("seawar");
		$mysqli->query("UPDATE $table 
						SET A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,K=0");
	}
	
	function checkShip($table, $bukva, $row){
		$mysqli = connect_db("seawar");
		$temp = $mysqli->query("SELECT $bukva FROM player1 WHERE Num=$row")->fetch_assoc();
		if($temp[$bukva]) return 0;
		else return 1; 
	}
	
	function setShip($table, $bukva, $row){
		$nado = checkShip($table, $bukva, $row);
		$mysqli = connect_db("seawar");
		$mysqli->query("UPDATE $table
						SET $bukva=$nado
						WHERE Num=$row");
	}
?>