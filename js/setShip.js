function setShip() {
	var bukva = document.getElementById('bukva');
	var bukvaStr = bukva.options[bukva.selectedIndex].innerHTML;
	var raw = document.getElementById('raw');
	var rawStr = raw.options[raw.selectedIndex].innerHTML;
	var xmlReq = new XMLHttpRequest();
	xmlReq.open("POST", "..\setShip.php", true);

	xmlReq.onreadystatechange = function() {
		if (xmlReq.readyState == 4) {
			alert('Request has been done');
		}
	}

	xmlReq.send("bukva="+bukvaStr+"&raw="+rawStr);
}