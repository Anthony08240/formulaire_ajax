var pos; // variable pour la publication d'informations
function loadXMLPosDoc(url,posData) {
    // branche pour l'objet XMLHttpRequest natif
    if (window.XMLHttpRequest) {
        pos = new XMLHttpRequest();
        pos.onreadystatechange = processPosChange;
        pos.open("POST", url, false);
		pos.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        pos.send(posData);
    // branche pour la version IE / Windows ActiveX
    } else if (window.ActiveXObject) {
        pos = new ActiveXObject("Microsoft.XMLHTTP");
        if (pos) {
            pos.onreadystatechange = processPosChange;
            pos.open("POST", url, false);
			pos.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            pos.send(posData);
        }
    }
}

function grabPosXML (tagName) {
return pos.responseXML.documentElement.getElementsByTagName(tagName)[0].childNodes[0].nodeValue;
}

function processPosChange() {
   
// page chargée "complète"
    if (pos.readyState == 4) {
        // la page est "OK"
        if (pos.status == 200) {
			if ( grabPosXML("posStatus") == 'NOTOK' ) { 
				alert('There were problems Sending Email. Please check back in a couple minutes');
			}
		}
	}
}