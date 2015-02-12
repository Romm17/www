<?php
	class field extends core{
		public function getContent(){
			return '
			<div id="fieldDiv">

			</div>
			';
		}
		public function getHeader(){
			return 'Fight';
		}
		public function getMeta(){
			return '<script src="js/field.js"></script>';
		}
	}
?>