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

require_once('exemplo.php');

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

try {
	// Código da sua API
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
