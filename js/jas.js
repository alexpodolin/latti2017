function showDiscountTable(el) {
	var i = 0,
		resultTableTr = document.getElementById('result').getElementsByTagName('table')[0].getElementsByClassName('hidden');
	el.className = (el.className + ' hidden').trim();
	for (i; i < resultTableTr.length; i++) {
		resultTableTr[i].className = resultTableTr[i].className.replace('hidden','').trim();
	}
}

function selectKautaForBr() {
	var allChecks = document.getElementsByClassName('check-kauta-br'),
		linkToBr = document.getElementsByClassName('link-to-br')[0],
		i = j = 0;
	for (i; i < allChecks.length; i++) {
		if (!allChecks[i].disabled && allChecks[i].checked) {
			allChecks[i].parentNode.className = 'selected';
			j++;
		} else if (!allChecks[i].disabled && !allChecks[i].checked) {
			allChecks[i].parentNode.className = '';
		}
	}
	if (j > 0) {
		linkToBr.style.display = 'block';
	} else {
		linkToBr.style.display = '';
	}
}

function showAllMarsh() {
	var hiddens = document.getElementById('result').getElementsByClassName('hidden'),
		showAllMarsh = document.getElementsByClassName('show-all-marsh')[0];
	while (hiddens.length) {
		for (var i=0; i < hiddens.length; i++) {
			hiddens[i].className = 'hover';
		}
		var hiddens = document.getElementById('result').getElementsByClassName('hidden');
	}
	showAllMarsh.className = 'hidden';
}

function loadInfoflotPlaces() {
	var teplId = document.getElementById('tepl_id'),
		teplIdInfoflot = document.getElementById('tepl_id_infoflot'),
		url = '/ajax/load_infoflot_places.php?' + new Date().getTime() + '&tepl_id=' + teplId.value + '&tepl_id_infoflot=' + teplIdInfoflot.value,
		pls = document.getElementsByClassName('pls'),
		req = createRequest();
	for (var i=0; i < pls.length; i++) {
		progressInEl(pls[i]);
	}
	req.open("GET", url, true); req.send(null);
	req.onreadystatechange = function() {
		if (req.readyState == 4) {
			if (req.status == 200) {
				placesAndTextArr = request.responseText.split('~');
				for (var i=0; i < placesAndTextArr.length; i++) {
					if (placesAndTextArr[i]) {
						placesAndText = placesAndTextArr[i].split('=>');
						var plsPlace = document.getElementById('pls-'+placesAndText[0]);
						if (plsPlace) {
							plsPlace.innerHTML = placesAndText[1];
						}
					}
				}
			} else {
				console.log("Ошибка на сервере. " + req.status);
			}
		}
	}
}

function progressInEl(el) {
	el.innerHTML = '<img src="/img/other/progress.gif">';
}
function progressInId(id) {
	document.getElementById(id).innerHTML = '<img src="/img/other/progress.gif">';
}
function progressInIdStop(id) {
	document.getElementById(id).innerHTML = '';
}

function getAllMarsh(el, filter) {
	var arr = [], data = '',
		result = document.getElementById('result');
	result.innerHTML = '<br><img src="/img/other/progress.gif">';
	arr['date1'] = document.getElementById('example').value.trim();
	arr['date2'] = document.getElementById('example2').value.trim();
	arr['typeDuration'] = document.getElementById('type_duration').value.trim();
	arr['dateDuration'] = document.getElementById('date_duration').value.trim();
	arr['chWeekday'] = document.getElementById('ch_weekday').checked ? 1 : 0;
	arr['chShcool'] = document.getElementById('ch_shcool').checked ? 1 : 0;
	arr['chPensiya'] = document.getElementById('ch_pensiya').checked ? 1 : 0;
	arr['selectTepl'] = document.getElementById('select_tepl').value.trim();
	arr['selectCity'] = document.getElementById('select_city').value.trim();
	arr['minPrice'] = document.getElementById('minPrice').value.trim();
	arr['maxPrice'] = document.getElementById('maxPrice').value.trim();
	for (var key in arr) { data += '&' + key + '=' + arr[key]; }
    createRequest();
    var url = "/ajax/get_all_marsh.php?dummy="+new Date().getTime() + data + '&filter=' + filter;
    request.open("GET", url, true);
    request.onreadystatechange = function() {
        if (request.readyState == 4) {
            if (request.status == 200) {
				result.innerHTML = request.responseText;
            } else {
                console.log("Ошибка на сервере. " + request.status);
            }
        }
    }
    request.send(null);
}
function getAllMarshNew(el, filter, firstRun) {
	var arr = [], data = '', i = 0,
		stoyanka = document.getElementById('divStoyanka'),
		req = createRequest(),
		result = document.getElementById('result');
	result.innerHTML = '<br><img src="/img/other/progress.gif">';
	arr['date1'] = document.getElementById('from').value.trim();
	arr['date2'] = document.getElementById('to').value.trim();
	arr['date_from'] = document.getElementById('date_from').value.trim();
	arr['date_to'] = document.getElementById('date_to').value.trim();
	chWeekday = document.getElementById('ch_weekday');
	if (chWeekday) { arr['chWeekday'] = chWeekday.checked ? 1 : 0; }
	chShcool = document.getElementById('ch_shcool');
	if (chShcool) { arr['chShcool'] = chShcool.checked ? 1 : 0; }
	chPensiya = document.getElementById('ch_pensiya');
	if (chPensiya) { arr['chPensiya'] = chPensiya.checked ? 1 : 0; }
	selectTepl = document.getElementById('select_tepl');
	if (selectTepl) { arr['selectTepl'] = selectTepl.value.trim(); }
	arr['selectCity'] = document.getElementById('select_city').value.trim();
	arr['minPrice'] = document.getElementById('minPrice').value.trim();
	arr['maxPrice'] = document.getElementById('maxPrice').value.trim();
	arr['firstRun'] = firstRun;
	if (stoyanka) {
		stoyanka = document.getElementById('divStoyanka').getElementsByTagName('input');
		arr['stoyanka'] = '';
		for (i in stoyanka) { arr['stoyanka'] += stoyanka[i].checked ? stoyanka[i].value + ',' : ''; }
	}
	for (var key in arr) { data += '&' + key + '=' + arr[key]; }
    var url = "/ajax/get_all_marsh_new.php?dummy="+new Date().getTime() + data + '&filter=' + filter;
    req.open("GET", url, true); req.send(null);
    req.onreadystatechange = function() {
        if (req.readyState == 4) {
            if (req.status == 200) {
				result.innerHTML = req.responseText;
            } else {
                console.log("Ошибка на сервере. " + req.status);
            }
        }
    }
}

function addGoCountToSearchStat(key) {
	dummy = new Date();
    createRequest();
    var url = "/ajax/add_gocount_tosearchstat.php?dummy="+dummy.getTime() + "&key=" + key;
    request.open("GET", url, true);
	request.send(null);
}

function checkEmpty(el, check) {
	var check = document.getElementById(check);
	if (check.value.trim().length) {
		el.submit();
	}
}

function clearValue(el) {
	var inputs = el.getElementsByTagName("input");
	for (var i=0; i<inputs.length; i++) {
		inputs[i].value = "";
	}
}

function openQuestShow(id) {
	var splitUrl = location.href.split("#");
	if (splitUrl[1] == "sendZaya") {
		showHideDiv(id);
	}
}

function setfirstcity(ob,id) {
    var codPlace = document.getElementById('teplRasp');
    codPlace.innerHTML = "<img src='/img/other/progress.gif' border=0>";
    var list = document.getElementById('alla').getElementsByTagName('a');
    for (var i=0; i<list.length; i++) {
        list[i].className = "selfPage margin5";
    }
    var alltepl = document.getElementById('alltepl');
    if (ob != "all") {
        ob.className = "cityChecked";
        alltepl.innerHTML = "<a style='padding-left: 15px' href='#setfirstcity' onclick='setfirstcity(\"all\","+id+"); return false;'><img src='/img/other/cross.png' alt='Все города' title='Все города' style='border:0'></a>";
        var firstCity = ob.innerHTML;
    } else {
        var firstCity = "all";
        alltepl.innerHTML = "";
    }
    dummy = new Date();
    createRequest();
    var url = "/ajax/setfirstcity.php?dummy="+dummy.getTime() + "&firstCity=" + firstCity + "&ID=" + id;
    request.open("GET", url, true);
    request.onreadystatechange = function() {
        if (request.readyState == 4) {
            if (request.status == 200) {
                answerRequest = request.responseText;
                codPlace.innerHTML = answerRequest;
                //alert(answerRequest);
            } else {
                alert ("Ошибка на сервере. " + request.status);
            }
        }
    }
    request.send(null);
}

function getSearchCod() {
    var codPlace = document.getElementById('codPlace');
    var teplList = "";
    codPlace.innerHTML = "<img src='img/other/progress.gif' border=0>";
    var allTepl = document.getElementById('alltepl');
    if (allTepl.checked) {
        codPlace.innerHTML = "<h3>Ваш код</h3>";
        codPlace.innerHTML += "<p>Для установки поисковика скопируйте код и вставьте в html-страницу вашего сайта.</p>";
        codPlace.innerHTML += "<textarea cols='100' rows='5'><div>\n    <div id='lattiSearch'></div>\n    <script type='text/javascript' src='https://www.latti.ru/rmjs/search.js.php'></script>\n</div></textarea>";
    } else {
        var list = document.getElementById('teplPlace').getElementsByTagName('input');
        for (var i=0; i<list.length; i++) {
            teplList += list[i].checked ? teplList != "" ? "," + list[i].value : list[i].value : "";
        }
        if (teplList == "") {
            codPlace.innerHTML = "<p style='color:red'>ОШИБКА. Вы не выбрали ни одного теплохода.</p>";
            return;
        }
        dummy = new Date();
        createRequest();
        var url = "/ajax/teplgreed.php?dummy="+dummy.getTime() + "&tepllist=" + teplList;
        request.open("GET", url, true);
        request.onreadystatechange = function() {
            if (request.readyState == 4) {
                if (request.status == 200) {
                    answerRequest = request.responseText;
                    codPlace.innerHTML = answerRequest;
                    //alert(answerRequest);
                } else {
                    alert ("Ошибка на сервере. " + request.status);
                }
            }
        }
        request.send(null);
    }
}

function checkAllTepl() {
    var list = document.getElementById('teplPlace').getElementsByTagName('input');
    for (var i=0; i<list.length; i++) {
        list[i].checked = true;
    }
}

function uncheckAllTepl() {
    var list = document.getElementById('teplPlace').getElementsByTagName('input');
    for (var i=0; i<list.length; i++) {
        list[i].checked = false;
    }
}

function teplGreed() {
    var allTepl = document.getElementById('alltepl');
    var searchTeplResult = document.getElementById('teplPlace');
    var checkPlace = document.getElementById('checkPlace');
    if (allTepl.checked) {
        searchTeplResult.innerHTML = "";
        checkPlace.innerHTML = "";
    } else {
        searchTeplResult.innerHTML = "<img src='img/other/progress.gif' border=0>";
        dummy = new Date();
        createRequest();
        var url = "/ajax/teplgreed.php?dummy="+dummy.getTime();
        request.open("GET", url, true);
        request.onreadystatechange = function() {
            if (request.readyState == 4) {
                if (request.status == 200) {
                    answerRequest = request.responseText;
                    searchTeplResult.innerHTML = answerRequest;
                    checkPlace.innerHTML = '<span id="checkOnAll" style="padding-left: 35px; font-size: 12px"><a class="selfPage" href="/allon" onclick="checkAllTepl(); return false;">Выбрать все</a></span><span id="checkOffAll" style="padding-left: 15px; font-size: 12px"><a class="selfPage" href="/alloff" onclick="uncheckAllTepl(); return false">Снять все</a></span>';
                    //alert(answerRequest);
                } else {
                    alert ("Ошибка на сервере. " + request.status);
                }
            }
        }
        request.send(null);
    }

}

function selectTeplForSendZaya(flot) {
    var pselect = document.getElementById('pTeplSelect');
    var fselect = document.getElementById('z_flot');
    switch (fselect.value) {
        case "Большой" :
            pselect.innerHTML = "Теплоход<br /><select id='z_tepl' name='z_tepl' class='forma'><option>-- Любой из большого флота --</option><option>Маяковский</option><option>Фурманов</option><option>Белинский</option><option>Попов</option><option>Куйбышев</option></select>";
            break;
        case "Прогулочный" :
            pselect.innerHTML = "Теплоход<br /><select id='z_tepl' name='z_tepl' class='forma'><option>-- Любой прогулочный --</option><option>Москва</option><option>Фонтанка</option><option>Мойка</option><option>ПС</option><option>Метеор</option></select>";
            break;
    }
}

function viborCruiza(el,selected) {
    var progress = document.getElementById('progress');
    progress.innerHTML = "<img src='img/other/progress.gif' border=0 style='padding-top:10px'>";
    var tier0 = document.getElementById('tier0');
    var list = document.getElementById('vibor').getElementsByTagName('td');
    for (var i=0; i<list.length; i++) {
        list[i].style.backgroundColor = "";
        list[i].style.color = "";
    }
    el.style.backgroundColor = "#02b0f0";
    el.style.color = "#ffffff";
    switch (selected) {
        case 1:
            tier0.style.display="block";
            break;

    }
    progress.innerHTML = "";
}

function vibor(step) {
    var progress = document.getElementById('progress');
    var dateStart = document.getElementById('example').value;
    var dateEnd = document.getElementById('example2').value;
    switch (step) {
        case 1:
            var step1 = document.getElementById('step1');
            var step1Result = document.getElementById('step1Result');
            step1.style.display = "none";
            if (dateStart != "" && dateEnd != "") {
                progress.innerHTML = "<img src='img/other/progress.gif' border=0 style='padding-top:10px'>";
                dummy = new Date();
                createRequest();
                var url = "/ajax/podbor.php?dummy=" + dummy.getTime() + "&step=" + step + "&dateStart=" + dateStart + "&dateEnd=" + dateEnd;
                request.open("GET", url, true);
                request.onreadystatechange = function() {
                    if (request.readyState == 4) {
                        if (request.status == 200) {
                            answerRequest = request.responseText;
                            switch (answerRequest) {
                                case "1":
                                    progress.innerHTML = "<p style='color: #ff4500'>Такого диапазона не может быть :)</p>";
                                    break;
                                case "2":
                                    progress.innerHTML = "<p style='color: #ff4500'>Нет рейсов с таким периодом отправления</p>";
                                    break;
                                default:
                                    step1.style.display = "block";
                                    step1Result.innerHTML = answerRequest;
                                    progress.innerHTML = "";
                            }
                            //alert(answerRequest);
                        } else {
                            alert ("Ошибка на сервере. " + request.status);
                        }
                    }
                }
                request.send(null);
            }
            break;
        case 2:
            var step2Result = document.getElementById('step2Result');
            var step2 = document.getElementById('step2');
            progress.innerHTML = "<img src='img/other/progress.gif' border=0 style='padding-top:10px'>";
            var selectDay = document.getElementById('selectDay');
            if (selectDay.options[0].text == "") {
                selectDay.options[0] = null;
            }
            dummy = new Date();
            createRequest();
            var url = "/ajax/podbor.php?dummy=" + dummy.getTime() + "&step=" + step + "&day=" + selectDay.value + "&dateStart=" + dateStart + "&dateEnd=" + dateEnd;
            request.open("GET", url, true);
            request.onreadystatechange = function() {
                if (request.readyState == 4) {
                    if (request.status == 200) {
                        answerRequest = request.responseText;
                        step2.style.display = "block";
                        step2Result.innerHTML = answerRequest;
                        progress.innerHTML = "";
                        //alert(answerRequest);
                    } else {
                        alert ("Ошибка на сервере. " + request.status);
                    }
                }
            }
            request.send(null);
            break;
    }
}

var kdoTimer = {};
function searchTepl() {
	if (kdoTimer.timer) { clearTimeout(kdoTimer.timer); }
	kdoTimer.timer = setTimeout(realySearchTepl, 100);
}

function realySearchTepl() {
	var spanError = document.getElementById("spanError");
    var searchTeplResult = document.getElementById("searchTeplResult");
    var allTeplSpan = document.getElementById("allTepl");
	var param = "";
	var vars = [];
    vars['nameTepl'] = document.getElementById("nameTepl").value.trim();
    vars['projTepl'] = document.getElementById("projTepl").value.trim();
    vars['firstCity'] = document.getElementById("firstCity").value.trim();
	vars['passFrom'] = document.getElementById("passFrom").value.trim();
	vars['passSinse'] = document.getElementById("passSinse").value.trim();
	vars['powFrom'] = document.getElementById("powFrom").value.trim();
	vars['powSinse'] = document.getElementById("powSinse").value.trim();
	vars['speedFrom'] = document.getElementById("speedFrom").value.trim();
	vars['speedSinse'] = document.getElementById("speedSinse").value.trim();
	vars['longFrom'] = document.getElementById("longFrom").value.trim();
	vars['longSinse'] = document.getElementById("longSinse").value.trim();
	vars['widthFrom'] = document.getElementById("widthFrom").value.trim();
	vars['widthSinse'] = document.getElementById("widthSinse").value.trim();
	vars['osadkaFrom'] = document.getElementById("osadkaFrom").value.trim();
	vars['osadkaSinse'] = document.getElementById("osadkaSinse").value.trim();
	for (var ArrVal in vars) {
		if (vars[ArrVal] && vars[ArrVal] != 0) {
			var OK = true;
		}
		param += "&"+ArrVal+"="+vars[ArrVal];
	}
    if (OK) {
		spanError.innerHTML = "";
        searchTeplResult.innerHTML = "<img src='http://www.latti.ru/img/other/progress.gif' border='0'>";
        dummy = new Date();
        createRequest();
        var url = "/ajax/searchtepl.php?dummy="+dummy.getTime()+"&kod=Кодировка"+param;
		console.log(url);
        request.open("GET", url, true);
        request.onreadystatechange = function() {
            if (request.readyState == 4) {
                if (request.status == 200) {
                    answerRequest = request.responseText;
                    searchTeplResult.innerHTML = answerRequest;
                    allTeplSpan.style.display = "inline";
                    //alert(answerRequest);
                } else {
                    alert ("Ошибка на сервере. " + request.status);
                }
            }
        }
        request.send(null);
    } else {
		if (allTeplSpan.style.display == "none") {
			spanError.innerHTML = "Введите критерий поиска";
		} else {
			document.location.href = "http://www.latti.ru/teplox.html";
		}
	}
}

function pressEnter2(page, e) {
    if(e.keyCode == 0xA || e.keyCode == 0xD) {
        switch (page) {
            case "teplox" : console.log(13); searchTepl(); break;
        }
    }
}

function imgView(imgBig,ID,folder,sort,img){
	var overlay = document.getElementById('overlay'),
		modTop = document.getElementById('modTop'),
		alt = '',
		allImages = document.getElementsByTagName('img');
	overlay.innerHTML = "<div id='overlay-inside'></div>";
	modTop.style.display = "none";
	for (i in allImages) {
		if (allImages[i].src == img) { alt = allImages[i].alt; }
	}
	var tabContent = document.getElementById("popupContent");
	tabContent.innerHTML = "<img src='img/other/progress.gif' border=0 style='padding:5px' width='16' height='16'>";
	popup();
	dummy = new Date();
	createRequest();
	var url = "/ajax/imgview.php?dummy="+dummy.getTime()+"&url="+imgBig+"&height="+window.innerHeight+"&width="+window.innerWidth+"&fID="+ID+"&folder="+folder+'&sort='+sort+'&alt='+alt;
	request.open("GET", url, true);
	request.onreadystatechange = answerReturn;
	request.send(null);
	function answerReturn() {
		if (request.readyState == 4) {
			if (request.status == 200) {				
				var divPopup = document.getElementById("modPopUp");
				tabContent.style.maxWidth = "1200px";
				answerRequest = request.responseText;
				tabContent.innerHTML = answerRequest;
                popup();
				overlay.innerHTML = "<img src='/img/other/close.png' onclick='popupMouseClose()' class='closeFotogal' title='Закрыть' alt='Закрыть'>";
			} else {
				alert ("Ошибка на сервере. " + request.status);
			}
		}
	}
}

function okno(uri){
	dummy = new Date();
	createRequest();
	var url = "/okno/"+uri+".inc";
	request.open("GET", url, true);
	request.onreadystatechange = answerReturn;
	request.send(null);
	function answerReturn() {
		if (request.readyState == 4) {
			if (request.status == 200) {
				var tabContent = document.getElementById("popupContent");
                tabContent.style.maxHeight = (window.innerHeight - 30) + "px";
				answerRequest = request.responseText;
				tabContent.innerHTML = answerRequest;
                popup();
			} else {
				alert ("Ошибка на сервере. " + request.status);
			}
		}
	}
}

function popup() {
    function getDocHeight() {
        var D = document;
        return Math.max(
            Math.max(D.body.scrollHeight, D.documentElement.scrollHeight),
            Math.max(D.body.offsetHeight, D.documentElement.offsetHeight),
            Math.max(D.body.clientHeight, D.documentElement.clientHeight)
        );
    }
    var divPopup = document.getElementById("modPopUp");
    var bodyHeight = document.height?document.height:getDocHeight();
    var divOverlay = document.getElementById("overlay");
	var overlayInside = document.getElementById('overlay-inside');
	if (overlayInside) {
		overlayInside.style.height = bodyHeight + "px";
		overlayInside.style.display = "block";
	}
    divOverlay.style.height = bodyHeight + "px";
	divOverlay.style.display = "block";
    divPopup.style.display = "block";
    var l = (window.innerWidth/2) - (divPopup.offsetWidth/2);
    l = l > 0 ? l + "px" : 0 + "px";
    var t = (window.innerHeight/2) - (divPopup.offsetHeight/2);
    t = t > 0 ? t + "px" : 0 + "px";
    divPopup.style.left = l;
    divPopup.style.top = t;
}

function popupMouseClose() {
	var modTop = document.getElementById('modTop');
	modTop.style.display = "";
    popupClose(); 
}

function popupClose() {
    var divPopup = document.getElementById("modPopUp");
    var divOverlay = document.getElementById("overlay");
    divPopup.style.display = "none";
    divOverlay.style.display = "none";
}

function changeTeplTab(id) {
	var tabContent = document.getElementById("vk_cont");
	tabContent.innerHTML = "<img src='img/other/progress.gif' border=0 style='padding-top:10px'>";
	var list = document.getElementById('teplContent').getElementsByTagName('spun');
	for (var i=0; i<list.length; i++) {
		list[i].style.display='none';
	}
	var list = document.getElementById('tableTeplMenu').getElementsByTagName('td');
	for (var i=0; i<list.length; i++) {
		if (list[i].className == "teplox1") {
			list[i].className = "teplox2";
		}
	}
	var tab = document.getElementById(id+"Menu");
	tab.className = "teplox1";
	dummy = new Date();
	createRequest();
	var url = "/ajax/changetepltab.php?dummy="+dummy.getTime()+"&id="+id;
	request.open("GET", url, true);
	request.onreadystatechange = updateVK;
	request.send(null);
}

var globalTopped = 0;
function scrollTop() {
	var modTop = document.getElementById('modTop'),
		modPopUp = document.getElementById("modPopUp"),
		top = (document && document.scrollTop  || document.body && document.body.scrollTop  || document.body && document.documentElement.scrollTop || 0);
	if (top > 1500 && modPopUp.style.display != "block") {
		modTop.innerHTML = "<a href='/top' onclick='getScrollTop("+top+"); return false;'><div class='scrollTop'>&#8593;</div></a>";
	} else {
		if (!globalTopped || top != 0) {
			modTop.innerHTML = "";
			globalTopped = 0;
		} else {
			modTop.innerHTML = "<a href='/top' onclick='getScrollBack("+globalTopped+"); return false;'><div class='scrollTop'>&#8595;</div></a>";
		}
	}
}

function getScrollTop(top) {
	window.scrollTo(0, 0);
	globalTopped = top;
}

function getScrollBack(back) {
	window.scrollTo(0, back);
	globalTopped = 0;
}

function changeTabNoAjax(id) {
	var tabContent = document.getElementById("vk_cont");
	tabContent.innerHTML = "<img src='img/other/progress.gif' border=0 style='padding-top:10px'>";
	var tabTable = document.getElementById("tableTeplMenu");
	var tab = document.getElementById(id);
	var div = document.getElementById("div_"+id);
	var list = document.getElementById('tableTeplMenu').getElementsByTagName('td');
	for (var i=0; i<list.length; i++) {
		list[i].className = list[i].className == "teplox1" ? "teplox2" : list[i].className
	}
	tab.className = "teplox1";
	div.style.display = "block";
	tabContent.innerHTML = "";
}

function changeTab(id) {
	document.getElementById("div_vk_cont_no_ajax_25").style.display = "none";
	var tabContent = document.getElementById("vk_cont");
	tabContent.innerHTML = "<img src='img/other/progress.gif' border=0 style='padding-top:10px'>";
	var tabTable = document.getElementById("tableTeplMenu");
	var tab = document.getElementById(id);
	dummy = new Date();
	createRequest();
	var url = "/ajax/changetab.php?dummy="+dummy.getTime()+"&id="+id;
	request.open("GET", url, true);
	request.onreadystatechange = updateVK;
	request.send(null);
	var list = document.getElementById('tableTeplMenu').getElementsByTagName('td');
	for (var i=0; i<list.length; i++) {
		list[i].className = list[i].className == "teplox1" ? "teplox2" : list[i].className
	}
	tab.className = "teplox1";
}

function updateVK() {
	if (request.readyState == 4) {
		if (request.status == 200) {
			var tabContent = document.getElementById("vk_cont");
			answerRequest = request.responseText;
			tabContent.innerHTML = answerRequest;
		} else {
			alert ("Ошибка на сервере. " + request.status);
		}
	}
}

function setStoyanka() {
	var objSelect = document.getElementById("selStoyanka");
	var addStoyanka = objSelect.options[objSelect.selectedIndex].text;
	var indxStoyanka = objSelect.options[objSelect.selectedIndex].value;
	var divStoyanka = document.getElementById("divStoyanka").innerHTML;
	if (indxStoyanka != "no_stoyanka") {
		document.getElementById("divStoyanka").innerHTML = divStoyanka + "<label><input type='checkbox' name='stoyanka[]' checked value='" + addStoyanka + "'>" + addStoyanka + "</label><br>";
	}
	objSelect.options[objSelect.selectedIndex].disabled = true;
	document.getElementById("selStoyanka").options[0].text = '-- добавить еще --';
	document.getElementById("selStoyanka").options[0].selected = true;
}

function show_image(filename, w, h) {
		var heightScr = screen.height;
		var widthScr = screen.width;
		var startImageHeight = ((heightScr - h) / 2) * 0.145;
		var startImageWidth = (widthScr - w) / 2;
		popup = window.open('', '', 'width='+w+', height='+h+',toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no,top='+startImageHeight+',left='+startImageWidth);
		popup.document.write('<html><head><title>Просмотр изображения</title></head><body topmargin="0" leftmargin="0"><img src="'+filename+'"></body></html>');
		popup.window.focus();
}

function showHideDiv(name) {
	if (document.getElementById(name).style.display == 'block') {
		document.getElementById(name).style.display='none';
	} else  {
		document.getElementById(name).style.display='block';
	}
}

function teplMenu(name) {
	var dop_vk = document.getElementById('vk_cont');
	dop_vk.innerHTML = "";
	var list = document.getElementById('teplContent').getElementsByTagName('spun');
	for (var i=0; i<list.length; i++) {
		list[i].style.display='none';
	}
	document.getElementById(name+"Content").style.display='block';
	
	var list = document.getElementById('tableTeplMenu').getElementsByTagName('td');
	for (var i=0; i<list.length; i++) {
		if (list[i].className == "teplox1") {
			list[i].className = "teplox2";
		}
	}
	document.getElementById(name+"Menu").className='teplox1';
}

function view_marsh(id) {
	if (id != "none") {
        location.hash = id;
    }
    var block = document.getElementById("block1"),
		splitUrl = location.href.split("#"),
		allTabs = document.getElementsByClassName('block-tab'),
		blockNum = splitUrl[1].replace('block',''),
		req = createRequest(),
		url = '/ajax/all_cruise/'+splitUrl[1]+'.inc',
		i = 0;
	for (i; i < allTabs.length; i++) {
		allTabs[i].className = allTabs[i].className.replace('block-tab-active','').trim();
	}
	blockActive = document.getElementById('TDblock'+blockNum);
	blockActive.className += ' block-tab-active';
	req.open("GET", url, true); req.send(null);
	req.onreadystatechange = function() {
		if (req.readyState == 4) {
			if (req.status == 200) {
				block.innerHTML = request.responseText;
			} else {
				console.log("Ошибка на сервере. " + req.status);
			}
		}
	}
}

function sendMarshZakaz(id) {
	createRequest();
	var z_name = document.getElementById("z_name").value;
	var z_telephone = document.getElementById("z_telephone").value;
	if (z_telephone != '') {
		dummy = new Date();
		var url = "/ajax/sendmail-marsh-zakaz.php";
	    url = url + "?dummy=" + dummy.getTime() + "&name=" + z_name + "&telephone=" + z_telephone + "&id=" + id;
	    request.open("GET", url, true);
	    request.send(null);
		document.getElementById("z_ms").innerHTML = "<font color=green>Ваше сообщение отправлено</font>";
        document.forms[1].reset();
	} else {
		document.getElementById("z_ms").innerHTML = "<font color=red>Ошибка. Не введена контактная информация</font>";
	}
}

function sendMail() {
	createRequest();
	var z_name = document.getElementById("z_name").value;
	var z_email = document.getElementById("z_email").value;
	var z_telephone = document.getElementById("z_telephone").value;
	if (z_email != '' || z_telephone != '') {
		var url = "/ajax/sendmail.php";
	    url = url + "?name=" + z_name + "&email=" + z_email + "&telephone=" + z_telephone;
	    request.open("GET", url, true);
	    request.send(null);
		document.getElementById("z_ms").innerHTML = "<font color=green>Сообщение отправлено</font>";
                document.forms[0].reset();
	} else {
		document.getElementById("z_ms").innerHTML = "<font color=red>Не введена контактная информация</font>";
	}
}

function sendMail2() {
	createRequest();
	var z_name = document.getElementById("z_name2").value;
	var z_email = document.getElementById("z_email2").value;
	var z_telephone = document.getElementById("z_telephone2").value;
	if (z_email != '' || z_telephone != '') {
		var url = "/ajax/sendmail.php";
	    url = url + "?name=" + z_name + "&email=" + z_email + "&telephone=" + z_telephone;
	    request.open("GET", url, true);
	    request.send(null);
		document.getElementById("z_ms2").innerHTML = "<font color=green>Сообщение отправлено</font>";
  		document.forms[1].reset();
	} else {
		document.getElementById("z_ms2").innerHTML = "<font color=red>Не введена контактная информация</font>";
	}
}

function sendMail3(subject,to) {
	createRequest();
	var z_name = document.getElementById("z_name").value;
	var z_email = document.getElementById("z_email").value;
	var z_telephone = document.getElementById("z_telephone").value;
	if (z_email != '' || z_telephone != '') {
		var url = "/ajax/sendmail.php";
	    url = url + "?name=" + z_name + "&email=" + z_email + "&telephone=" + z_telephone + "&subject=" + subject + "&to=" + to;
	    request.open("GET", url, true);
	    request.send(null);
		document.getElementById("z_ms").innerHTML = "<font color=green>Сообщение отправлено</font>";
        document.forms[0].reset();
	} else {
		document.getElementById("z_ms").innerHTML = "<font color=red>Не введена контактная информация</font>";
	}
}

function sendMail4(subject,to) {
	createRequest();
	var z_name = document.getElementById("z_name").value;
	var z_cont = document.getElementById("z_cont").value;
	if (z_cont != '') {
		var url = "/ajax/sendmail2.php";
	    url = url + "?name=" + z_name + "&cont=" + z_cont + "&subject=" + subject + "&to=" + to;
	    request.open("GET", url, true);
	    request.send(null);
		document.getElementById("z_ms").innerHTML = "<font color=green>Сообщение отправлено</font>";
        document.forms[0].reset();
	} else {
		document.getElementById("z_ms").innerHTML = "<font color=red>Не введена контактная информация</font>";
	}
}

function sendZaya() {
    createRequest();
    var z_cont = document.getElementById("z_cont").value;
    if (z_cont != '') {
        document.getElementById("formZaya").submit();
    } else {
        document.getElementById("z_ms").innerHTML = "<font color=red>Не введена контактная информация</font>";
    }
}

function sendMailForm(el, to, subject) {
	var dataForm = el.getElementsByClassName('form-data'),
		url = '/ajax/send_mail_form.php?dummy=' + new Date().getTime() + '&to=' + to + '&subject=' + subject,
		progress = document.getElementById('progress'),
		req = createRequest();
	progressInEl(progress);
	for (var i=0; i < dataForm.length; i++) {
		url += '&' + dataForm[i].getAttribute('data-name') + '=' + dataForm[i].value.trim();
	}
	req.open("GET", url, true); req.send(null);
	req.onreadystatechange = function() {
		if (req.readyState == 4) {
			if (req.status == 200) {
				progress.innerHTML = '<span class="green">Сообщение отправлено</span>';
				el.reset();
			} else {
				console.log("Ошибка на сервере. " + req.status);
			}
		}
	}
}

function test(ms) {
	message = ms ? ms : 'test ok';
	console.log(message);
}

function getID(obj) {
	return document.getElementById(obj);
}
function getXmlHttp(){
  var xmlhttp;
  try {
    xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
  } catch (e) {
    try {
      xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    } catch (E) {
      xmlhttp = false;
    }
  }
  if (!xmlhttp && typeof XMLHttpRequest!='undefined') {
    xmlhttp = new XMLHttpRequest();
  }
  return xmlhttp;
}

var request = null;
function createRequest() {
 try {
   request = new XMLHttpRequest();
 } catch (trymicrosoft) {
   try {
	 request = new ActiveXObject("Msxml2.XMLHTTP");
   } catch (othermicrosoft) {
	 try {
	   request = new ActiveXObject("Microsoft.XMLHTTP");
	 } catch (failed) {
	   request = null;
	 }
   }
 }

 if (request == null) {
	alert("Error creating request object!"); 
 } else {
	 return request;
 }
   
}

function vkGroup() {
	VK.Widgets.Group("vk_groups", {mode: 0, width: "900", height: "250", color1: 'fff', color2: '2B587A', color3: '00829A'}, 7533421);
}

function showHidePosition(positionId, val) {
    var position = document.getElementsByClassName(positionId)[0];
    position.style.display = (position.style.display == 'none' || !position.style.display) ? val : "";
}
function showHidePositionFlow(positionId, val) {
    var position = document.getElementsByClassName(positionId)[0];
    if (position.style.width == '0px' || !position.style.width) {
        position.style.width = '188px';
    } else {
        position.style.width = "0";
    }
	
}

window.onload = function() {
	if (document.body.offsetHeight > 4000) {
		document.onscroll = function() {
			scrollTop();
		};
	}
	vkGroup();
	VK.init({apiId: 3440907, onlyWidgets: true});
	// document.getElementById('LiveInternetCounter').innerHTML = "<a href='http://www.liveinternet.ru/click' "+
					// "target=_blank><img src='//counter.yadro.ru/hit?t41.1;r"+
					// escape(document.referrer)+((typeof(screen)=="undefined")?"":
					// ";s"+screen.width+"*"+screen.height+"*"+(screen.colorDepth?
					// screen.colorDepth:screen.pixelDepth))+";u"+escape(document.URL)+
					// ";"+Math.random()+
					// "' alt='LiveInternet' title='LiveInternet' "+
					// "border='0' width='31' height='31'><\/a>";
	document.getElementsByClassName('MenuMini')[0].onclick = function() { showHidePositionFlow('leftMenu', 'block'); } 
	var checkKautaBr = document.getElementsByClassName('check-kauta-br')[0];
	if (checkKautaBr) { selectKautaForBr(); }
}

function initCalendar() {
	$(document).ready(function(){
		$( "#from" ).datepicker({
			defaultDate: "+1w",
			changeMonth: true,
			changeYear: true,
			firstDay: 1,
			monthNames: ['Январь','Февраль','Март','Апрель','Май','Июнь', 'Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'], 
			monthNamesShort:["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"],
			dayNamesMin:["Вс","Пн","Вт","Ср","Чт","Пт","Сб"],
			currentText: 'Сегодня', 
			closeText: 'Закрыть', 
			dateFormat: 'dd.mm.yy',
			showButtonPanel: true,
			onClose: function( selectedDate ) {
				$( "#to" ).datepicker( "option", "minDate", selectedDate );
			}
		});
		$( "#to" ).datepicker({
			defaultDate: "+1w",
			changeMonth: true,
			changeYear: true,
			firstDay: 1,
			monthNames: ['Январь','Февраль','Март','Апрель','Май','Июнь', 'Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'], 
			monthNamesShort:["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"],
			dayNamesMin:["Вс","Пн","Вт","Ср","Чт","Пт","Сб"],
			currentText: 'Сегодня', 
			closeText: 'Закрыть', 
			dateFormat: 'dd.mm.yy',
			showButtonPanel: true,
			onClose: function( selectedDate ) {
				$( "#from" ).datepicker( "option", "maxDate", selectedDate );
			}
		});			
	});
}

//Google Analitics
(function (tos) {
	window.setInterval(function () {
		tos = (function (t) {
			return t[0] == 50 ? (parseInt(t[1]) + 1) + ':00' : (t[1] || '0') + ':' + (parseInt(t[0]) + 10);
		})(tos.split(':').reverse());
		window.pageTracker ? pageTracker._trackEvent('Time', 'Log', tos) : _gaq.push(['_trackEvent', 'Time', 'Log', tos]);
	}, 10000);
})('00');

var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-4509667-2']);
_gaq.push(['_trackPageview']);

(function() {
	var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
	ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
	var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();
//Google Analitics

//Yandex.Metrika counter -->
(function (d, w, c) {
	(w[c] = w[c] || []).push(function() {
		try {
			w.yaCounter18765694 = new Ya.Metrika({
				id:18765694,
				clickmap:true,
				trackLinks:true,
				accurateTrackBounce:true,
				webvisor:true
			});
		} catch(e) { }
	});

	var n = d.getElementsByTagName("script")[0],
		s = d.createElement("script"),
		f = function () { n.parentNode.insertBefore(s, n); };
	s.type = "text/javascript";
	s.async = true;
	s.src = "https://mc.yandex.ru/metrika/watch.js";

	if (w.opera == "[object Opera]") {
		d.addEventListener("DOMContentLoaded", f, false);
	} else { f(); }
})(document, window, "yandex_metrika_callbacks");
//Yandex.Metrika counter -->

(function() { 
	var widget_id = '18078';
	var s = document.createElement('script'); s.type = 'text/javascript'; s.async = true; s.src = '//code.jivosite.com/script/widget/'+widget_id; var ss = document.getElementsByTagName('script')[0]; ss.parentNode.insertBefore(s, ss);
})();

var pageUrlArr = window.location.href.split('#');
pageURL = pageUrlArr[0].split('/').pop();
switch (pageURL) {
	case '':
		initCalendar();
		break;
	case 'valaam-kiji-solovki.html':
		initCalendar();
		var allMarshForm = document.getElementById('allMarshForm');
		getAllMarshNew(allMarshForm, "invalaam", 1);
		break;
	case 'prav_vibor.html':
		initCalendar();
		var allMarshForm = document.getElementById('allMarshForm');
		getAllMarshNew(allMarshForm, false, 1);
		view_marsh('none');
		break;
	case 'marsh.php':
		initCalendar();
		break;
	case 'avtobusnyie-turyi.html':
		initCalendar();
		break;
	case 'skidki.html':
		initCalendar();
		break;
	case 'baykal---jemchujina-sibiri.html':
		initCalendar();
		var allMarshForm = document.getElementById('allMarshForm');
		getAllMarshNew(allMarshForm, 'baikal', 0);
		break;
	case 'teplTab=rasp':
		loadInfoflotPlaces();
		break;
	case 'kiji_kareliya.html':
		initCalendar();
		break;
	case 'solovki.html':
		initCalendar();
		break;
	case 'kruizyi-po-volge.html':
		initCalendar();
		break;
}

var vk_like = document.getElementById('vk_like');
if (vk_like) {
	VK.init({apiId: 3440907, onlyWidgets: true});
	VK.Widgets.Like('vk_like', {type: 'mini'});
}

var photogalBox = document.getElementsByClassName('photogal-box');
for (i in photogalBox) {
	if (typeof(photogalBox[i]) == 'object') {
		var imgForPhotogalBox = photogalBox[i].getElementsByTagName('img');
		for (j in imgForPhotogalBox) {
			imgForPhotogalBox[j].onclick = function() { imgView(this.src.replace(this.src.split('/').pop(), '/big/'+this.src.split('/').pop()), "", this.src.replace(this.src.split('/').pop(), '/big'), 0, this.src); }
		}
	}
}