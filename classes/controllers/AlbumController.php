<?php 
class AlbumController {
    
    public static function Listar($cpf) {

        $album = new Album();
        $resultado = Album::Listar($cpf);
        $repetidas = Figurinha::ListarRepetidas($cpf);
        $qtdRep = 0;
        foreach ($resultado as $linha) {
            // aqui preenche as figurinhas
            foreach ($repetidas as $rep) {
                if ($linha['cd_figura'] == $rep['cd_figura']) {
                    $qtdRep = $rep['qt_repetidas'];
                    break;
                } else {
                    $qtdRep = 0;
                }
            }
            $figurinha = new Figurinha(
                $linha['cd_figura'], 
                $linha['nm_figura'], 
                new Time($linha['cd_time'], $linha['nm_time']),
                $linha['ic_possui'],
                $qtdRep
            );
            array_push($album->Figurinhas, $figurinha);
        }
        $resultado = Album::BuscarProgresso($cpf);
        foreach ($resultado as $linha) {
            $album->QtdTotal = $linha['total'];
            $album->QtdAtual = $linha['possui'];
        }
        return $album;
    }

    public static function AlterarSituacaoFigurinha($cpf, $codigoFigurinha, $situacao) {
        Album::AlterarSituacaoFigurinha($cpf, $codigoFigurinha, $situacao);
    }

}
?>