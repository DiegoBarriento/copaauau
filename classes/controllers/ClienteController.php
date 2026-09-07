<?php 
class ClienteController {

    public static function Acessar($login, $senha) {
        $resultado = Cliente::Acessar($login, $senha);
        $cliente = null;

        foreach ($resultado as $linha) {
            $cliente = new Cliente($linha['cd_cpf_cliente'], $linha['nm_cliente']);
        }
        
        return $cliente;
    }

    public static function criarCliente($cpf, $nome, $senha){
        Cliente::criarCliente($cpf,$nome, $senha);
    }

    public static function verificarCliente($cpf){
        $verificar = Cliente::verificarCliente($cpf);
        return $verificar;

    }

    public static function recuperarSenha($cpf){
        $senha = Cliente::recuperarSenha($cpf);
        return $senha; 
    }
}
?>