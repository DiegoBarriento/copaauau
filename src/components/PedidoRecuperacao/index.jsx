import axios from "axios";
import { useState } from "react";
import Carregando from "../Carregando";
import { useNavigate } from "react-router-dom";

export default function PedidoRecuperacao() {
    const [email, setEmail] = useState("");
    const [cpf, setCpf] = useState("")

    const [carregando, setCarregando] = useState(false);
    const [mensagem, setMensagem] = useState(null);

    const navegador = useNavigate();

    function txtCpf_change(e){
        setCpf(e.target.value);
    }

    function txtEmail_change(e){
        setEmail(e.target.value);
    }

    function validarCPF(cpf) {
        if (/^(\d)\1{10}$/.test(cpf)){
            return false;
        }
        let soma = 0;
        let resto = 0;
        for (let i = 0; i < 9; i++) {
            soma += parseInt(cpf.charAt(i)) * (10 - i);
        }
        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11){
            resto = 0;
        } 
        if (resto !== parseInt(cpf.charAt(9))){
            return false;
        } 

        soma = 0;
        for (let i = 0; i < 10; i++) {
            soma += parseInt(cpf.charAt(i)) * (11 - i);
        }
        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11){
            resto = 0;
        } 
        if (resto !== parseInt(cpf.charAt(10))){
            return false;
        }

        return true;
    }

    function btnPedido_click(){
        setMensagem(null)
        if (cpf.trim() === ""){
            setMensagem("O CPF deve ser informado.")
            return;
        }
        
        if (cpf.trim().includes('.') || cpf.trim().includes('-') || cpf.trim().includes(',')){
            setMensagem("O cpf não deve conter virgulas, pontos ou traços.");
            return;
        }

        if (cpf.trim().length !== 11){
            setMensagem("O Cpf deve conter 11 digitos.");
            return;
        }

        if (!validarCPF(cpf.trim())){
            setMensagem("O CPF informado é inválido.");
            return;
        }

        if (email.trim() === ""){
            setMensagem("O E-mail deve ser informado.");
            return;
        }

        if(email.trim().includes('@') === false || email.trim().includes('.') === false){
            setMensagem("O E-mail informado é inválido.");
            return;
        }


        setCarregando(true);
        axios.post("http://localhost/copaauau/api/verificarcliente.php", 
        {
            /* conteudo do corpo JSON da requisicão */
            'cpf' : cpf.trim(),
        },
        {
            withCredentials: true,
        }
        ).then(function (resposta) {
        if (resposta.status === 200 && resposta.data) {
            console.log(resposta.data);
            // A resposta veio SEM erros
            const verificar = resposta.data.verificar || [];
            if (verificar.length <= 0) {
                setMensagem("CPF não emcontrado! Tente Cadastrar Normalmente");
                setCarregando(false);
                return;
            }

            const cliente = {
            "Cpf": cpf.trim(),
            "Email": email.trim()
            };
            navegador('/CodigoVerificacao', {state: {status: 'recuperarsenha', cliente: cliente}});
        } 
        })
        .catch(function (error) {
        console.warn(error);
        // O que fazer se der erro na requisição
            setMensagem('Erro ao verificar Cpf');

        })
        .finally(function () {
        // O que fazer independente de ter dado erro ou não
            setCarregando(false)
        });
    }

    return (
        <>
            <section className="fundoEntrada">
                <section className="telaLogin">
                    <h1>Pedido de recuperação</h1>
                    {carregando ? <Carregando/> : null}
                     {mensagem !== null ? <div className='msg erro'>{mensagem}</div> : null}
                     <p>
                        <input
                            placeholder="Informe seu Cpf"
                            type="number"
                            value={cpf}
                            onChange={txtCpf_change}
                        />
                    </p>
                    <p>
                        <input
                            placeholder="Informe seu E-mail"
                            type="email"
                            value={email}
                            onChange={txtEmail_change}
                        />
                    </p>
                    <div className="area_botoes">
                        <button className="botao" onClick={btnPedido_click}>
                            <span className="material-symbols-outlined iconeBotao">send</span> Enviar pedido de recuperação
                        </button>
                    </div>
                </section>
            </section>
        </>
    );
}