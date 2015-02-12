window.onload = function() {
	var submitBut = document.getElementById('submitBut');

	submitBut.onclick = function() {
		var buts = document.getElementsByName('but');
		var butsValue = -1;
		for (var i=0; i<buts.length; i++) {
			if (buts[i].checked) {
				butsValue = buts[i].value;
				break;
			}
		}

		if (butsValue === -1) {
			alert('Please choose radio button')
			return;
		}
	
		var name = document.getElementsByName('name')[0].value;

		var xmlReq = new XMLHttpRequest();

		xmlReq.open("POST","start.php",true);

		xmlReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

		xmlReq.onreadystatechange = function() {
			if (xmlReq.readyState == 4) {
				if (butsValue === 'new') {
					location = 'index.php?option=newGame';
				} else {
					alert('Now');
					var divMain = document.getElementById('main');
					var mainForm = document.getElementById('mainForm');
					mainForm.remove();
					 
					if (xmlReq.responseText !=='') {
					var games = xmlReq.responseText.split('<br/>');
					for (t=0; t<games.length; t++) {
						var button = document.createElement('button');
						button.innerHTML = games[t];
						button.onclick = function() {
							alert('clickvre');
							var xmlReq = new XMLHttpRequest();

							xmlReq.open('POST','findGame.php', true);

							xmlReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

							xmlReq.onreadystatechange = function () {
								if (xmlReq.readyState == 4) {
									alert(this.responseText);
									location = 'index.php?option=field';
								}
							}

							xmlReq.send('nick='+this.innerHTML);
							
							
						}
						divMain.appendChild(button);
					}
					}
				}
			}
		}

		xmlReq.send('name='+name+'&but='+butsValue);
	}
}