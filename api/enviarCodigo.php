<?php
// use PHPMailer\PHPMailer\PHPMailer;

// include("PHPMailer/src/PHPMailer.php");
// include("PHPMailer/src/Exception.php");
// include("PHPMailer/src/SMTP.php");

// require_once('cors.php');
// require_once('config.php');
// header('Access-Control-Allow-Methods: POST, OPTIONS');
// header('Access-Control-Allow-Headers: Content-Type');
// header('Content-Type: application/json');

// if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
// 	http_response_code(200);
// 	exit();
// }

// $metodo = $_SERVER['REQUEST_METHOD'];

// if ($metodo != 'POST') 
// { 
// 	http_response_code(400); 
// 	echo json_encode(['mensagem' => 'Método Inválido']); 
// 	return;
// }

// function gerarCodigo6Digitos()
// {
//   return str_pad(random_int(0, 999999), 6, '0', STR_PAD_LEFT);
// }

// function EnviarEmailRecuperacao($emailDestinatario, $codigo)
// {
//   $mail = new PHPMailer(true);
//   $mail->IsSMTP();
//   $mail->SMTPAuth = true;
//   $mail->SMTPSecure = 'ssl'; //'tls'; // Use 'ssl' se o servidor SMTP exigir

//   $mail->Host = 'smtp.hostinger.com';
//   $mail->Port = 465;
//   $mail->Username = 'email@copaclubeauau.com.br';
//   $mail->Sender = 'email@copaclubeauau.com.br';
//   $mail->Password = 'Em@il2026';
//   $mail->CharSet = "UTF-8";
//   $mail->SetFrom("email@copaclubeauau.com.br", "Copa Clube Au Au");
//   $mail->addAddress($emailDestinatario);
//   $mail->isHTML(true);
//   $mail->Subject = "Recuperação de Acesso [Copa Clube Au Au]";

//   $conteudoEmail  = "<div style='margin:auto; width: 500px; background-color:#fff; border:thin solid #babaca;border-radius:4px;box-sizing: border-box; padding: 10px; text-align: center;'>";
//   $conteudoEmail .= "    <div style='text-align: center;'>";
//   $conteudoEmail .= "        <img src='https://copaclubeauau.com.br/images/logo.png' style='width: 250px;'>";
//   $conteudoEmail .= "    </div>";
//   $conteudoEmail .= "    <p>Use o código abaixo para criar uma nova senha.</p>";
//   $conteudoEmail .= "    <p><strong style='font-size:28px'>" . $codigo . "</strong></p>";
//   $conteudoEmail .= "</div>";

//   $mail->Body = $conteudoEmail;

//   if (!$mail->send()) {
//     throw new Exception("Erro no envio do e-mail");
//   }
// }

// try {
// 	// Código da sua API
// 	$corpo = json_decode(file_get_contents("php://input"), true);
// 	if (!validaCorpoRequisicao($corpo)) {
// 		return;
// 	}
// 	$chaves = ['email'];
// 	if (!validaChaves($corpo, $chaves)) {
// 		return;
// 	}
// 	$email = $corpo['email'];
// 	$codigo = gerarCodigo6Digitos();
// 	EnviarEmailRecuperacao($email, $codigo);
// 	http_response_code(200);
// 	echo json_encode(['status' => 'true', 'codigo' => $codigo]);
// } catch (Exception $erro) {
// 	http_response_code(500);
// 	echo json_encode(['status' => 'false', 'mensagem' => $erro->getMessage()]);
// }

// function validaCorpoRequisicao($corpo) {
// 	if (is_null($corpo))
// 	{
// 		http_response_code(400);
// 		echo json_encode(['mensagem'=>'Dados Inválidos!']);
// 		return false;
// 	}
// 	return true;
// }

// function validaChaves($corpo, $campos) {
// 	for ($i=0; $i < count($campos); $i++) { 
// 		if (!array_key_exists($campos[$i], $corpo))
// 		{
// 			http_response_code(400);
// 			echo json_encode(['mensagem'=>'Dados incorretos. Verifique a documentação da API e tente novamente!']);
// 			return false;
// 		}
// 		if ($corpo[$campos[$i]] == ''){
// 			http_response_code(400);
// 			echo json_encode(['mensagem'=>'Dados incorretos. Verifique a documentação da API e tente novamente!']);
// 			return false;
// 		}
// 	}
// 	return true;
// }

// Forçar exibição de erros para diagnosticar o Erro 500
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception as PHPMailerException;
use PHPMailer\PHPMailer\SMTP;

// Validar se os caminhos dos ficheiros estão corretos
if (!file_exists("PHPMailer/src/PHPMailer.php") || !file_exists("PHPMailer/src/Exception.php") || !file_exists("PHPMailer/src/SMTP.php")) {
    http_response_code(500);
    echo json_encode(['status' => 'false', 'mensagem' => 'Erro: Ficheiros do PHPMailer nao foram encontrados no caminho especificado.']);
    exit;
}

include("PHPMailer/src/PHPMailer.php");
include("PHPMailer/src/Exception.php");
include("PHPMailer/src/SMTP.php");

require_once('cors.php');
require_once('config.php');

header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
	http_response_code(200);
	exit();
}

$metodo = $_SERVER['REQUEST_METHOD'];

if ($metodo != 'POST') 
{ 
	http_response_code(400); 
	echo json_encode(['mensagem' => 'Método Inválido']); 
	return;
}

function gerarCodigo6Digitos()
{
  return str_pad(random_int(0, 999999), 6, '0', STR_PAD_LEFT);
}

function EnviarEmailRecuperacao($emailDestinatario, $codigo)
{
  $mail = new PHPMailer(true);
  
  try {
    // Configurações padrão recomendadas para a Hostinger
    $mail->isSMTP();
    $mail->Host       = 'smtp.hostinger.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'email@copaclubeauau.com.br';
    $mail->Password   = 'Em@il2026';
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS; // Certifique-se de usar ENCRYPTION_SMTPS para a porta 465
    $mail->Port       = 465;
    $mail->CharSet    = "UTF-8";

    // Remetente e Destinatário
    $mail->setFrom("email@copaclubeauau.com.br", "Copa Clube Au Au");
    $mail->addAddress($emailDestinatario);
    
    // Conteúdo
    $mail->isHTML(true);
    $mail->Subject = "Recuperação de Acesso [Copa Clube Au Au]";

    $conteudoEmail  = "<div style='margin:auto; width: 500px; background-color:#fff; border:thin solid #babaca;border-radius:4px;box-sizing: border-box; padding: 10px; text-align: center;'>";
    $conteudoEmail .= "    <div style='text-align: center;'>";
    $conteudoEmail .= "        <img src='https://copaclubeauau.com.br' style='width: 250px;'>";
    $conteudoEmail .= "    </div>";
    $conteudoEmail .= "    <p>Use o código abaixo para criar uma nova senha.</p>";
    $conteudoEmail .= "    <p><strong style='font-size:28px'>" . $codigo . "</strong></p>";
    $conteudoEmail .= "</div>";

    $mail->Body = $conteudoEmail;

    $mail->send();
  } catch (PHPMailerException $e) {
    throw new Exception("Erro PHPMailer: " . $mail->ErrorInfo);
  } catch (Exception $e) {
    throw new Exception("Erro Geral: " . $e->getMessage());
  }
}

try {
	$corpo = json_decode(file_get_contents("php://input"), true);
	if (!validaCorpoRequisicao($corpo)) {
		return;
	}
	$chaves = ['email'];
	if (!validaChaves($corpo, $chaves)) {
		return;
	}
	$email = $corpo['email'];
	$codigo = gerarCodigo6Digitos();
	EnviarEmailRecuperacao($email, $codigo);
	http_response_code(200);
	echo json_encode(['status' => 'true', 'codigo' => $codigo]);
} catch (Exception $erro) {
	http_response_code(500);
	echo json_encode(['status' => 'false', 'mensagem' => $erro->getMessage()]);
}

function validaCorpoRequisicao($corpo) {
	if (is_null($corpo))
	{
		http_response_code(400);
		echo json_encode(['mensagem'=>'Dados Inválidos!']);
		return false;
	}
	return true;
}

function validaChaves($corpo, $campos) {
	for ($i=0; $i < count($campos); $i++) { 
		if (!array_key_exists($campos[$i], $corpo))
		{
			http_response_code(400);
			echo json_encode(['mensagem'=>'Dados incorretos. Verifique a documentação da API e tente novamente!']);
			return false;
		}
		if ($corpo[$campos[$i]] == ''){
			http_response_code(400);
			echo json_encode(['mensagem'=>'Dados incorretos. Verifique a documentação da API e tente novamente!']);
			return false;
		}
	}
	return true;
}
?>
