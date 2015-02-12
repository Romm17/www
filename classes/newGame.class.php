<?php
	class newGame extends core{
		public function getContent(){
			return '
				<div><h1>You start a new game</h1></div>
				<div id="findLabel">Finding</div>
			';
		}
		public function getHeader(){
			return 'New game';
		}
		public function getMeta(){
			return '<script src="js/newGame.js"></script>';
		}
	}
?>