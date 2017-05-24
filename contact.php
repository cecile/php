<?php

$error = array();


if ($_SERVER["REQUEST_METHOD"] == "GET") {


    if (empty($_GET["nom"])) {

        $error['nom'] = true; //vide

    } else {

        $error['nom'] = false; //correctement rempli

    }


    if (empty($_GET["mail"])) {

        $error['mail'] = true; // vide

    } else {

        $error['mail'] = false; //correctement rempli

    }


    if(empty($_GET['message'])){

        $error['message'] = true; //vide

    }else{

        $error['message'] = false; //correctement rempli
    }

}

    /*if(!in_array(true, $error)){

    //envoyer le mail par PHPMailer car on est en localHost
//le tuto : http://www.connecty.fr/tutoriels/envoyer-un-mail-avec-phpmailer.php

require('PHPMailer/PHPMailerAutoload.php'); 

//Envoyer un mail avec PHP avec une authentification sécurisée 

$mail = new PHPMailer();
$mail->isSMTP();
$mail->Host = 'smtp.laposte.net';
$mail->SMTPAuth = true;
$mail->Port = 465; // Port à utiliser si l'adresse du destinataire est un gmail. Par défaut le port est 25.
$mail->SMTPSecure = 'ssl';

// Authentification
$mail->Username = "reginaphalange088@laposte.net";
$mail->Password = "Facile4deviner";

// Expéditeur
$mail->SetFrom($_GET["mail"], $_GET["nom"]);

// Destinataire
$mail->AddAddress('reginaphalange088@laposte.net', 'Phalange Regina');

// Votre message
$mail->MsgHTML($_GET['message']);

// Envoi du mail avec gestion des erreurs
$mail->Send();
}*/

    

echo json_encode($error); 

?>    


