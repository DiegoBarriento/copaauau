<?php 
class Figurinha extends Banco {
	public $Codigo;
	public $Nome;
	public $Time;
	public $Possui;
	public $QtdRepetidas;

	
	public function __construct($codigo = null, $nome = null, $time = null, $possui = false, $qtdRepetidas = 0) {
		$this->Codigo = $codigo;
		$this->Nome = $nome;
		$this->Time = $time;
		$this->Possui = $possui;
		$this->QtdRepetidas = $qtdRepetidas;
	}

	static function ListarRepetidas($cpf){
		$parametros = [
			'pLogin'=>$cpf
		];
		return self::Consultar('listarRepetidas', $parametros);
	}

	static function atualisarQuantidade($cpf, $codigoFigurinha, $qtdFigura){
		$parametros = [
			'pLogin'=>$cpf,
			'pCodigoFigura'=>$codigoFigurinha,
			'pQtdFigura'=>$qtdFigura
		];
		self::Executar('atualizarQuantidade', $parametros);
	}
}
?>