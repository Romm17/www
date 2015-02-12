<?php
	class main extends core{
		public function getContent(){
			return '
			<form id="mainForm">
				<p> Name <input type="text" name="name"></input><br/></p>
				<p>  New game <input type="radio" name="but" value="new"></input><br/></p>
				<p> Find game <input type="radio" name="but" value="find"></input><br/></p>
				<input type="button" id="submitBut" value="Go"></input>	
			</form>
			';
		}
		public function getHeader(){
			return 'Main';
		}
		public function getMeta(){
			return '<script src="js/index.js"></script>';
		}
	}
?>