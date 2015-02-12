window.onload = function() {
	var fieldAllTable = document.createElement('table');

	var tr = document.createElement('tr');
	for (var t=0; t<11; t++) {
		var td = document.createElement('td');
		td.align="center"
		td.innerHTML = ' ABCDEFGHIK'.charAt(t)
		tr.appendChild(td);
	}
	fieldAllTable.appendChild(tr);
	
	for (var t=1; t<11; t++) {
		var tr = document.createElement('tr');
		var td = document.createElement('td');
		
		td.innerHTML = t;

		tr.appendChild(td);
		fieldAllTable.appendChild(tr);
	}

	var fieldTable = document.createElement('table');
	fieldTable.setAttribute('cellSpacing', '0px');

	var fieldR = wholeRandom(256), fieldG = wholeRandom(256), fieldB = wholeRandom(256);
	var fieldColor = 'RGB('+fieldR+','
							+fieldG+','
							+fieldB+')';
	var fieldBorderColor = 'RGB('+(255-fieldR)+','
							+(255-fieldG)+','
							+(255-fieldB)+')';
	for (var t=0; t<10; t++) {
		var tr = document.createElement('tr');

		for (var t1=0; t1<10; t1++) {
			var td = document.createElement('td');
			td.setAttribute('width', '50px');
			td.setAttribute('height', '50px');
			td.setAttribute('bgColor', fieldColor);
			td.style.setProperty('border', '1px solid '+fieldBorderColor);

			td.onclick = function() {
				if (this.bgColor === fieldColor) {
					this.setAttribute('bgColor',fieldBorderColor);
				} else {
					this.setAttribute('bgColor',fieldColor);
				}
			}

			tr.appendChild(td);
		}
		fieldTable.appendChild(tr);
	}

	var fieldShips = document.createElement('table');

	var predX, predY, curDragEl=0;

	for (var t=4; t>0; t--) {
		var tr = document.createElement('tr');

		for (var t1=0; t1<t; t1++) {
			var td = document.createElement('td');
			td.style.setProperty('width', '50px');
			td.style.setProperty('height', '50px');
			td.setAttribute('bgColor', fieldBorderColor);
			tr.appendChild(td);
		}

		tr.onmousedown = function(e) {
			predX = e.clientX;
			predY = e.clientY;
			curDragEl = document.createElement('table');
			curDragEl.style.setProperty('position','absolute');
			curDragEl.style.setProperty('left', predX-25+'px');
			curDragEl.style.setProperty('top', predY-25+'px');
			var cloneTr = this.cloneNode(true);
			cloneTr.style.setProperty('postion','relative');
			cloneTr.style.setProperty('left','0px');
			cloneTr.style.setProperty('top','0px');
			
			curDragEl.appendChild(cloneTr);

			curDragEl.onmousemove = function(e) {
				curDragEl.style.setProperty('left',parseInt(curDragEl.style.left)+e.clientX-predX+'px');
				curDragEl.style.setProperty('top',+parseInt(curDragEl.style.top)+e.clientY-predY+'px');

				predX = e.clientX;
				predY = e.clientY;	
			}

			curDragEl.onmouseup = function(e) {
				this.onmousemove = undefined;
			}

			document.body.appendChild(curDragEl);
		}

		/*tr.onmousemove = function(e) {
			if (curDragEl === 0) {
				return;
			}

			curDragEl.style.setProperty('left',+curDragEl.style.left+e.clientX-predX);
			curDragEl.style.setProperty('top',+curDragEl.style.top+e.clientY-predY);

			predX = e.clientX;
			predY = e.clientY;
		}*/

		fieldShips.appendChild(tr);

		if (t==1) break;

		var tr = document.createElement('tr');
		var td = document.createElement('td');
		td.style.setProperty('height', '50px');
		tr.appendChild(td);
		fieldShips.appendChild(tr);
	}

	var td = document.createElement('td');
	td.setAttribute('colspan', '10');
	td.setAttribute('rowspan', '10');
	td.appendChild(fieldTable);
	fieldAllTable.rows[1].appendChild(td);

	var td = document.createElement('td');
	td.setAttribute('rowspan', '10');
	td.style.setProperty('width', '50px');
	fieldAllTable.rows[1].appendChild(td);

	var td = document.createElement('td');
	td.setAttribute('rowspan', '10');
	td.appendChild(fieldShips);
	fieldAllTable.rows[1].appendChild(td);

	var tr = document.createElement('tr');
	var td = document.createElement('td');
	td.setAttribute('colspan','10');
	td.setAttribute('align','center');
	
	var button = document.createElement('button');
	button.innerHTML = 'Save and start playing';

	button.onclick = function() {
		var xmlReq = new XMLHttpRequest();

		xmlReq.open("POST", "setShip.php", true);

		xmlReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

		xmlReq.onreadystatechange = function() {
			if (xmlReq.readyState === 4) {
				console.log(xmlReq.responseText);
			}
		}

		var str = 'coords=';

		for (var t=0; t<fieldTable.rows.length; t++) {
			for (var t1=0; t1<fieldTable.rows[t].cells.length; t1++) {
				if (fieldTable.rows[t].cells[t1].bgColor === fieldBorderColor) {
					str+=fieldAllTable.rows[0].cells[t1+1].innerHTML;
					str+=(t+1);
					str+=';';
				}
			}
		}

		str = str.slice(0,-1);
		xmlReq.send(str);
	}

	td.appendChild(button);
	tr.appendChild(td);

	fieldAllTable.appendChild(tr);

	
	var fieldDiv = document.getElementById('fieldDiv');

	fieldDiv.appendChild(fieldAllTable);

	

	
}

function wholeRandom(x) {
	return Math.floor(Math.random()*x);
}
