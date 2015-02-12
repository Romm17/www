window.onload = function() {
	var findSecPlayer = document.getElementById('findLabel');

	var timerID = setInterval(function() {
		if (!findSecPlayer) {
			clearInterval(timeID);
			alert('deleted');
			return;
		}
		var str = findSecPlayer.innerHTML;
		str += '.';
		if (str.length - str.indexOf('.') > 3) {
			str = str.slice(0, str.indexOf('.'));
		}
		findSecPlayer.innerHTML = str;
	}, 500);
	
	setTimeout(checkSecondPlayer, 2000);

}

function checkSecondPlayer() {
	var xmlReq = new XMLHttpRequest();
	xmlReq.open("POST","newGameStarted.php",true);

	xmlReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

	xmlReq.onreadystatechange = function() {
	if (xmlReq.readyState == 4) {
			if (xmlReq.responseText !=='0') {	
				var findSecPlayer = document.getElementById('findLabel');
				findSecPlayer.remove();
					var successCaption = document.createElement('div');
				successCaption.innerHTML = "Finded\nSecond Player`s ID: "+xmlReq.responseText;
				location = 'index.php?option=field';
				document.body.appendChild(successCaption);

			} else {
				setTimeout(checkSecondPlayer, 2000);
			}
		}
	}

	xmlReq.send();
}
