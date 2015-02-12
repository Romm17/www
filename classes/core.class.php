<?php
	abstract class core{
		public function getBody(){
			$tmp = file_get_contents("templates/template.php");
			$tmp = str_replace("%header%", $this->getHeader(), $tmp);
			$tmp = str_replace("%content%", $this->getContent(), $tmp);
			$tmp = str_replace("%meta%", $this->getMeta(), $tmp);
			$sess = "";
			foreach($_SESSION as $ind => $val){
				$sess .= $ind.': ';
				if(isset($val)) $sess .= $val;
				else $sess .= '???';
				$sess .= '<br/>';
			}
			$sess .= '<button onclick="location = \'creator.php\'">Reset</button><br/>';
			$tmp = str_replace("%session%", $sess, $tmp);
			echo $tmp;
		}
		abstract function getContent();
		abstract function getHeader();
		abstract function getMeta();
	}
?>