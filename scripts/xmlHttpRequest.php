<?php
// Changer les 4 variables ci-dessous
$yourName = 'Beenen';
$yourEmail = 'beenen@simplon-charleville.fr';
$yourSubject = 'test Ajax';
$referringPage = 'http://beenen.simplon-charleville.fr/formulaire_ajax/index.php';

// Pas besoin d'éditer ci-dessous à moins que vous ne le vouliez vraiment. Il utilise une simple fonction php mail (). Utilisez le vôtre si vous le souhaitez

header('Content-Type: text/xml');
echo '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>';

echo '<resultset>';

function cleanPosUrl ($str) {
$nStr = $str;
$nStr = str_replace("**am**","&",$nStr);
$nStr = str_replace("**pl**","+",$nStr);
$nStr = str_replace("**eq**","=",$nStr);
return stripslashes($nStr);
}
	if ( $_GET['contact'] == true && $_GET['xml'] == true && isset($_POST['posText']) ) {
	$to = $yourName;
	$subject = 'AJAX Mail: '.cleanPosUrl($_POST['posRegard']);
	$message = cleanPosUrl($_POST['posText']);
	$headers = "From: ".cleanPosUrl($_POST['posName'])." <".cleanPosUrl($_POST['posEmail']).">\r\n";
	$headers .= 'To: '.$yourName.' <'.$yourEmail.'>'."\r\n";
	$mailit = mail($to,$subject,$message,$headers);
		
		if ( @$mailit )
		{ $posStatus = 'OK'; $posConfirmation = 'Succès! Votre e mail a été envoyé.'; }
		else
		{ $posStatus = 'NOTOK'; $posConfirmation = 'Votre e-mail n a pas pu être envoyé. Veuillez réessayer '; }
		
		if ( $_POST['selfCC'] == 'send' )
		{
		$ccEmail = cleanPosUrl($_POST['posEmail']);
		@mail($ccEmail,$subject,$message,"From: Yourself <".$ccEmail.">\r\nTo: Yourself");
		}
	
	echo '
		<status>'.$posStatus.'</status>
		<confirmation>'.$posConfirmation.'</confirmation>
		<regarding>'.cleanPosUrl($_POST['posRegard']).'</regarding>
		';
	}
echo'	</resultset>';

?>