window.onload = function() {
	

/*	var fieldShips = document.createElement('table');

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

		tr.onmousemove = function(e) {
			if (curDragEl === 0) {
				return;
			}

			curDragEl.style.setProperty('left',+curDragEl.style.left+e.clientX-predX);
			curDragEl.style.setProperty('top',+curDragEl.style.top+e.clientY-predY);

			predX = e.clientX;
			predY = e.clientY;
		}

		fieldShips.appendChild(tr);

		if (t==1) break;

		var tr = document.createElement('tr');
		var td = document.createElement('td');
		td.style.setProperty('height', '50px');
		tr.appendChild(td);
		fieldShips.appendChild(tr);
	}
*/

	
	
	
	/*var td = document.createElement('td');
	td.setAttribute('rowspan', '10');
	td.appendChild(fieldShips);
	fieldAllTable.rows[1].appendChild(td);
	*/
	var yourTurn = 0;

	do
	{
		var fieldR = wholeRandom(128); 
		var fieldG = wholeRandom(128); 
		var fieldB = wholeRandom(128);
	}
	while (Math.abs(fieldR-fieldG)<100 && Math.abs(fieldR-fieldB)<100);
	var fieldColor = 'rgb('+fieldR+', '
							+fieldG+', '
							+fieldB+')';
	var fieldBorderColor = 'rgb('+(255-fieldR)+', '
							+(255-fieldG)+', '
							+(255-fieldB)+')';
	
	var fieldAllTable = createField(fieldColor, fieldBorderColor, 1);
	fieldAllTable.id = 'fieldAllTable';

	var fieldOpponent = createField(fieldColor, fieldBorderColor, 2);
	fieldOpponent.id = 'fieldOpponent';

	
	var fieldDiv = document.getElementById('fieldDiv');
	var fieldTwoFieldsTable = document.createElement('table');
	
	var tr = document.createElement('tr');
	var td = document.createElement('td');
	td.align = "center";
	td.id = 'fieldMess1';
	td.innerHTML = 'Locate your ships :)';
	tr.appendChild(td);
	var td = document.createElement('td');
	td.id = 'fieldMess2';
	td.align = "center";
	td.innerHTML = '';
	tr.appendChild(td);
	fieldTwoFieldsTable.appendChild(tr);

	
	var tr = document.createElement('tr');
	
	var td1 = document.createElement('td');
	td1.appendChild(fieldAllTable);

	var td2 = document.createElement('td');
	td2.appendChild(fieldOpponent);

	tr.appendChild(td1);
	tr.appendChild(td2);

	fieldTwoFieldsTable.appendChild(tr);

	var tr = document.createElement('tr');
	var td = document.createElement('td');
	td.setAttribute('align','center');
	
	

	var button = document.createElement('button');
	button.innerHTML = 'Save and start playing';

	button.onclick = function() {
		var fieldTable = fieldAllTable.rows[1].cells[1].children[0];
		var fieldMess1 = document.getElementById('fieldMess1');
		var fieldMess2 = document.getElementById('fieldMess2');

		var xmlReq = new XMLHttpRequest();

		xmlReq.open("POST", "setShip.php", true);

		xmlReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

		xmlReq.onreadystatechange = function() {
			if (this.readyState === 4) {
				if (this.responseText === '0') {
					yourTurn = 0;
					fieldMess1.innerHTML = 'Wait for the opponent';	
				} else {
					yourTurn = 1;
					fieldMess1.innerHTML = '';
					fieldMess2.innerHTML = 'Make your turn';
				}

				button.remove();
				
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

	fieldTwoFieldsTable.appendChild(tr);


	fieldDiv.appendChild(fieldTwoFieldsTable);	

	//makeTableGray(fieldOpponent.rows[1].cells[1].children[0], 0.25);

	
}

function createField(fieldColor, fieldBorderColor, player) {
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

	for (var t=0; t<10; t++) {
		var tr = document.createElement('tr');

		for (var t1=0; t1<10; t1++) {
			var td = document.createElement('td');
			td.setAttribute('width', '30px');
			td.setAttribute('height', '30px');
			if (player === 1) {
				td.setAttribute('bgColor', fieldColor);
				td.style.setProperty('border', '1px solid '+fieldBorderColor);
			} else {
				td.setAttribute('bgColor', multClr(fieldColor,1));
				td.style.setProperty('border', '1px solid '+multClr(fieldBorderColor,1));
			}
			td.id = fieldAllTable.rows[0].cells[t1+1].innerHTML+
					  fieldAllTable.rows[t+1].cells[0].innerHTML;

			if (player === 1) {
				td.onclick = function() {
					if (this.bgColor === fieldColor) {
						this.setAttribute('bgColor',fieldBorderColor);
					} else {
						this.setAttribute('bgColor',fieldColor);
					}
				}
			} else {
				td.onclick = function() {
					if (!yourTurn)
						alert('It isn`t tour turn! xD'); 

					var xmlReq = new XMLHttpRequest();
					var td = this;
					
					xmlReq.open('POST', 'getCell.php');

					xmlReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

					xmlReq.onreadystatechange = function() {
						if (this.readyState == 4) {
							if (this.responseText == '0') {
								td.innerHTML = 'X';
								td.bgColor = fieldBorderColor;
							} else {
								td.innerHTML = 'O';
								td.bgColor = fieldBorderColor;
							}

							youtTurn = 0;
							var timer = setInterval(function() {
								var xmlReq = new XMLHttpRequest();

								xmlReq.open('POST', 'getCell.php');

								xmlReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

								xmlReq.onreadystatechange = function() {
									if (this.readyState === 4) {
										if (this.responseText !== '') {
											var x = 'ABCDEFGHIK'.indexOf(this.responseText.charAt(0));
											var y = this.responseText.slice(1)-1;

											youtTurn = 1;
											var field = document.getElementById('fieldAllTable');
											field = field.rows[1].cells[1].children[0];
											if (field.rows[y].cells[x].bgColor === fieldColor) {
												field.rows[y].cells[x].innerHTML = 'O';
											} else {
												field.rows[y].cells[x].innerHTML = 'X';
											}
											clearInterval(timer);
										}
									}
								}

								xmlReq.send('');
							}, 1000);
						}
					}	
					xmlReq.send('cell='+this.id);	
				}
			}

			tr.appendChild(td);
		}
		fieldTable.appendChild(tr);
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

	return fieldAllTable;
}

function makeTableGray(table, clrCoef) {
	for (var t=0; t<table.rows.length; t++) {
		for (var t1=0; t1<table.rows[t].cells.length; t1++) {
			var clrs = table.rows[t].cells[t1].bgColor.slice(4,-1).split(', ');
			for (var t2=0; t2<clrs.length; t++) {
				clrs[t2]*=clrCoef;
				clrs[t2] = Math.floor(clrs[t2]);
			}

			table.rows[t].cells[t1].bgColor = 'rgb(' + clrs.join(', ') +')';
		}
	}
}

function multClr(clrStr, coef) {
	var clrInt = clrStr.slice(4,-1).split(', ');
	for (var t=0; t<clrInt.length; t++) {
		clrInt[t] = Math.floor(clrInt[t]*coef);
	}
	return ('rgb('+clrInt.join(', ')+')');
}

function wholeRandom(x) {
	return Math.floor(Math.random()*x);
}
