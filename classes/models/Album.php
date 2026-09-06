<?php 
class Album extends Banco {
	public $Figurinhas;
	public $QtdTotal;
	public $QtdAtual;

	public function __construct($figurinhas = []) {
		$this->Figurinhas = $figurinhas;
		$this->QtdTotal = 0;
		$this->QtdAtual = 0;
	}

	public static function BuscarProgresso($cpf) {
		$parametros = [
			'pLogin'=>$cpf
		];
		return self::Consultar('progresso', $parametros);
	}

	public static function Listar($cpf) {
		$parametros = [
			'pLogin'=>$cpf
		];
		return self::Consultar('listarAlbum',$parametros);
	}

	public static function AlterarSituacaoFigurinha($cpf, $codigoFigurinha, $situacao) {
		$parametros = [
			'pLogin'=>$cpf,
			'pCodigoFigurinha'=>$codigoFigurinha,
			'pSituacao'=>$situacao
		];
		self::Executar('alterarSituacaoFigurinha',$parametros);
	}
}
?>