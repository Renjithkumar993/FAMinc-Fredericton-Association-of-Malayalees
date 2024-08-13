<?php

// Allow requests from any origin and define allowed methods and headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// Load PHPMailer classes
require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';
require 'phpmailer/src/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Sanitize and retrieve POST data
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);


    $mail = new PHPMailer(true); 

    try {
        // SMTP configuration
        $mail->isSMTP();
        $mail->Host = 'smtp.hostinger.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'info@famnb.ca'; 
        $mail->Password = '1947@August15'; 
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        $mail->Port = 465;

        // Email setup
        $mail->setFrom('info@famnb.ca', 'FAM');
        $mail->addAddress('info@famnb.ca', 'FAM'); 

        $mail->isHTML(true);
        $mail->Subject = 'New Contact Form Submission';
        $mail->Body = "
            <h1>New Contact Form Submission</h1>
            <p><strong>Name:</strong> {$name}</p>
            <p><strong>Email:</strong> {$email}</p>
            <p><strong>Message:</strong> {$message}</p>";
        $mail->AltBody = "Name: {$name}\nEmail: {$email}\nMessage: {$message}";


        $mail->send();
        echo json_encode(['success' => true, 'message' => 'Message has been sent']);
    } catch (Exception $e) {
        echo json_encode(['success' => false, 'message' => "Mailer Error: {$mail->ErrorInfo}"]);
    }
}
?>
