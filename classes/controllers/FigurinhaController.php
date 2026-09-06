<?php 
class FigurinhaController {
    static function atualizarQuantidade($cpf, $codigoFigurinha, $qtdFigura){
        Figurinha::atualisarQuantidade($cpf, $codigoFigurinha, $qtdFigura);
    }
}
?>