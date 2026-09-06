<?php 
class Cliente extends Banco {
	public $Cpf;
	public $Nome;

	public function __construct($cpf = null, $nome = null) {
		$this->Cpf = $cpf;
		$this->Nome = $nome;
	}

	public static function Acessar($login, $senha) {
		$parametros = [
			'pLogin'=>$login,
			'pSenha'=>$senha
		];
		return self::Consultar('acessar', $parametros);
	}
}
?>