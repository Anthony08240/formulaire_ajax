function validateFields() {
var frmEl = document.getElementById('cForm');
var posName = document.getElementById('posName');
var posEmail = document.getElementById('posEmail');
var posRegard = document.getElementById('posRegard');
var posText = document.getElementById('posText');
var strCC = document.getElementById('selfCC');
var whiteSpace = /^[\s]+$/;
	if ( posText.value == '' || whiteSpace.test(posText.value) ) {
		alert("Vous essayez d'envoyer un e-mail vide. Veuillez taper quelque chose et continuer votre chemin.");
	}
	else if ( posEmail.value == '' && strCC.checked == true ) {
		alert("Pourquoi essayez-vous de vous envoyer une copie sans e-mail?");
		alert("Juste pour ça...");
		alert("Je nettoie tous les champs!");
		frmEl.reset();
		alert("Là. Satisfait.");
		alert("Maintenant recommence!");
		posName.focus();
	}
	else {
		sendPosEmail();
	}
}
function sendPosEmail () {
	var success = document.getElementById('emailSuccess');
	var posName = document.getElementById('posName');
	var posEmail = document.getElementById('posEmail');
	var posRegard = document.getElementById('posRegard');
	var posText = document.getElementById('posText');
	var strCC = document.getElementById('selfCC').value;
	var page = "scripts/xmlHttpRequest.php?contact=true&xml=true";
	
	showContactTimer(); // commence rapidement la barre de charge
	success.style.display = 'none'; // cache la barre de réussite (au cas où il s'agit d'un multi-email
	
// convertit (&, +, =) en équivs de chaîne. Nécessaire pour que le POST encodé par URL ne s'étouffe pas.
	var str1 = posName.value;
	str1 = str1.replace(/&/g,"**am**");
	str1 = str1.replace(/=/g,"**eq**");
	str1 = str1.replace(/\+/g,"**pl**");
	var str2 = posEmail.value;
	str2 = str2.replace(/&/g,"**am**");
	str2 = str2.replace(/=/g,"**eq**");
	str2 = str2.replace(/\+/g,"**pl**");
	var str3 = posRegard.value;
	str3 = str3.replace(/&/g,"**am**");
	str3 = str3.replace(/=/g,"**eq**");
	str3 = str3.replace(/\+/g,"**pl**");
	var str4 = posText.value;
	str4 = str4.replace(/&/g,"**am**");
	str4 = str4.replace(/=/g,"**eq**");
	str4 = str4.replace(/\+/g,"**pl**");
	
	var stuff = "selfCC="+strCC+"&posName="+str1+"&posEmail="+str2+"&posRegard="+str3+"&posText="+str4;
	loadXMLPosDoc(page,stuff)
}
function showContactTimer () {
	var loader = document.getElementById('loadBar');
	loader.style.display = 'block';
	sentTimer = setTimeout("hideContactTimer()",6000);
}

function hideContactTimer () {
	var loader = document.getElementById('loadBar');
	var success = document.getElementById('emailSuccess');
	var fieldArea = document.getElementById('contactFormArea');
	var inputs = fieldArea.getElementsByTagName('input');
	var inputsLen = inputs.length;
	var tAreas = fieldArea.getElementsByTagName('textarea');
	var tAreasLen = tAreas.length;
	// Masque la barre de charge hélas! Chargement a été fait
	loader.style.display = "none";
	success.style.display = "block";
	success.innerHTML = '<strong style="color:green;">'+grabPosXML("confirmation")+'</strong>';
	
// Maintenant détournez les éléments du formulaire
	for ( i=0;i<inputsLen;i++ ) {
		if ( inputs[i].getAttribute('type') == 'text' ) {
			inputs[i].value = '';
		}
	}
	for ( j=0;j<tAreasLen;j++ ) {
		tAreas[j].value = '';
	}
}

function ajaxContact() {
var frmEl = document.getElementById('cForm');
addEvent(frmEl, 'submit', validateFields, false);
frmEl.onsubmit = function() { return false; }
}
addEvent(window, 'load',ajaxContact, false);