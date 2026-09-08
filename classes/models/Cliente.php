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

	public static function criarCliente($cpf, $nome, $senha, $email){
		$parametros = [
			'pCpf'=>$cpf,
			'pNome'=>$nome,
			'pSenha'=>$senha,
			'pEmail'=>$email
		];
		self::Executar('criarCliente', $parametros);
	}

	public static function verificarCliente($cpf){
		$parametros = [
			'pCpf'=>$cpf
		];
		return self::Consultar('verificarCliente', $parametros);
	} 

	public static function recuperarSenha($cpf){
		$parametros = [
			'pCpf'=>$cpf
		];
		return self::Consultar('recuperarSenha', $parametros);
	}

	public static function atualisarSenha($cpf,$senha){
		$parametros = [
			'pCpf'=>$cpf,
			'pSenha'=>$senha
		];
		self::Consultar('criarNovaSenha', $parametros);
	}
}
?>