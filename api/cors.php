<?php
$ENV = $_SERVER['HTTP_HOST'] === 'https://www.copaauau.com.br'
	? 'production'
	: 'development';

$CORS_ORIGINS = [
	'development' => [
		'http://localhost:5173',
		'http://localhost:4000',
	],
	'production' => [
		'https://www.copaauau.com.br',
	],
];

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';

if (isset($CORS_ORIGINS[$ENV]) && in_array($origin, $CORS_ORIGINS[$ENV])) {
	header("Access-Control-Allow-Origin: $origin");
	header('Access-Control-Allow-Credentials: true');
}
?>