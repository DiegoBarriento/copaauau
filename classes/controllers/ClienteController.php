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

}
?>