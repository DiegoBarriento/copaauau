<?php
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
	$chaves = ['codigo','quantidade'];
	if (!validaChaves($corpo, $chaves)) {
		return;
	}
	$usuario = $_SESSION['logado'];
	$codigo = $corpo['codigo'];
	$quantidade = $corpo['quantidade'];
	FigurinhaController::atualizarQuantidade($usuario->Cpf, $codigo, $quantidade);
	http_response_code(200);
	echo json_encode(['status' => 'true']);
} catch (Exception $erro) {
	http_response_code(500);
	echo json_encode(['status' => 'false']);
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