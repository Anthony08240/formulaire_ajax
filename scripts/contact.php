<?php

// Changer les 4 variables ci-dessous
$yourName = 'Beenen';
$yourEmail = 'beenen@simplon-charleville.fr';
$yourSubject = 'test Ajax';
$referringPage = 'http://beenen.simplon-charleville.fr/formulaire_ajax/index.php';

// Pas besoin d'éditer ci-dessous à moins que vous ne le vouliez vraiment. Il utilise une simple fonction php mail (). Utilisez le vôtre si vous le souhaitez
function cleanPosUrl ($str) {
return stripslashes($str);
}
	if ( isset($_POST['sendContactEmail']) )
	{
	$to = $yourEmail;
	$subject = $yourSubject.': '.$_POST['posRegard'];
	$message = cleanPosUrl($_POST['posText']);
	$headers = "From: ".cleanPosUrl($_POST['posName'])." <".$_POST['posEmail'].">\r\n";
	$headers .= 'To: '.$yourName.' <'.$yourEmail.'>'."\r\n";
	$mailit = mail($to,$subject,$message,$headers);
		if ( @$mailit ) {
		header('Location: '.$referringPage.'?success=true');
		}
		else {
		header('Location: '.$referringPage.'?error=true');
		}
	}
?>