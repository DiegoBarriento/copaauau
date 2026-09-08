import { useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Carregando from "../Carregando";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function CodigoVerificacao() {
    const location = useLocation();
    const [codigoEnviado, setCodigoEnviado] = useState("");
    const [carregando, setCarregando] = useState(false);
    const [mensagem, setMensagem] = useState(null);
    const [codigoVerificacao, setCodigoVerificacao] = useState("");
    const navegador = useNavigate();

    const cliente = location.state.cliente;
    const status = location.state.status;

    console.log(cliente.Email);
    console.log(status);


    useEffect(() => {
        setCarregando(true);
        axios.post("http://localhost/copaauau/api/enviarCodigo.php",
            {
                'email': cliente.Email,
            },
            {
                withCredentials: true,
            }
        ).then(function (resposta) {
            // const dados = typeof resposta.data === "string" ? JSON.parse(resposta.data.trim()) : resposta.data;
            const dados = resposta.data;
            if (dados == null || dados.codigo == null){
                setMensagem("Erro ao enviar o código de verificação. Por favor, tente novamente.");
            }
            console.log(dados);

            const codigoVerifi = String(dados.codigo);
            console.log(codigoVerifi);
            setCodigoVerificacao(codigoVerifi);
            setMensagem('Codigo enviado com Sucesso! Verifique seu e-mail.');
        }).catch(function (erro) {
            setMensagem(erro.response.data.mensagem || erro.message || "Erro ao enviar o código de verificação.");
            console.log(erro);
        }).finally( function () {
            setCarregando(false);
        });
    }, []);


    function txtCodigo_Change(e) {
        setCodigoEnviado(e.target.value);
    }

    function criarNovoCliente() {
        console.log("novo cliente teste botao");
        setCarregando(true);
        axios.post("http://localhost/copaauau/api/criarnovocliente.php", 
        {
            /* conteudo do corpo JSON da requisicão */
            'cpf' : cliente.Cpf,
            'nome' : cliente.Nome,
            'senha' :  cliente.Senha,
        },
        {
            withCredentials: true,
        }
        ).then(function (resposta) {
        if (resposta.status === 200 && resposta.data) {
            console.log(resposta.data);
            // A resposta veio SEM erros
            setMensagem("Conta criada com sucesso! Redirecionando...")
            axios.post("http://localhost/copaauau/api/acessar.php",
            {
                "login": cliente.Cpf,
                "senha": cliente.Senha
            },
            {
                withCredentials: true,
            }
            ).then(function (resposta) {
                if (resposta.status === 200 && resposta.data) {
                    console.log(resposta.data);
                    if ('mensagem' in resposta.data) {
                        setMensagem(resposta.data.mensagem);
                    } else {    
                        localStorage.setItem('cliente', JSON.stringify(resposta.data.cliente));
                        navegador('/inicio');
                    }
                }
            })
                .catch(function (error) {
                    console.warn(error);
                    // O que fazer se der erro na requisição
                    setMensagem("Erro ao redirecionar! Tente Logar Novamente")
                })
                .finally(function () {
                    setCarregando(false);
                });
        } 
        })
        .catch(function (error) {
        console.warn(error);
        // O que fazer se der erro na requisição
            setMensagem(error.response.data.mensagem || "Erro ao se cadastrar! Tente novamente.")
        
        })
        .finally(function () {
        // O que fazer independente de ter dado erro ou não
            setCarregando(false);
        });

    }

    function recuperarSenha() {
        console.log("recuperar senha");
        setCarregando(true);
        navegador('/redefinirSenha', {state: {'cliente':cliente}});
        setCarregando(false);
        // axios.post("http://localhost/copaauau/api/recuperarsenha.php", 
        // {
        //     /* conteudo do corpo JSON da requisicão */
        //     'cpf' : cliente.cpf,
        // },
        // {
        //     withCredentials: true,
        // }
        // ).then(function (resposta) {
        // if (resposta.status === 200 && resposta.data) {
        //     console.log(resposta.data);
        //     // A resposta veio SEM erros
        //     setMensagem("Senha Recuperada! Redirecionando...")
        //     const senha = resposta.data.senha[0];
        //     console.log(senha);

        // } 
        // })
        // .catch(function (error) {
        // console.warn(error);
        // // O que fazer se der erro na requisição
        //     setMensagem(error.response.data.mensagem || "Erro ao Recuperar Senha! Tente novamente.")
        
        // })
        // .finally(function () {
        // // O que fazer independente de ter dado erro ou não
        //     setCarregando(false);
        // });

    }

    function btnVerificar_click() {
        setMensagem(null);

        if (codigoEnviado !== codigoVerificacao) {
            setMensagem("Código de verificação incorreto. Por favor, tente novamente.");
            return;
        }

        if (status === 'novocliente'){
            criarNovoCliente();
        }
        else if (status === 'recuperarsenha'){
            recuperarSenha();
        }
        
    }
    return (
        <>
            <section className="fundoEntrada">
                <section className="telaLogin">
                    <h1>Código de Veriicação</h1>
                    {carregando ? <Carregando/> : null}
                    {mensagem !== null ? <div>{mensagem}</div> : null}
                    <p>
                        <input
                            placeholder="Informe o código enviado para seu E-mail"
                            type="number"
                            value={codigoEnviado}
                            onChange={txtCodigo_Change}
                        />
                    </p>
                    <div className="area_botoes" onClick={btnVerificar_click}>
                        <button className="botao">
                            <span className="material-symbols-outlined iconeBotao">key_vertical</span> Verificar
                        </button>
                    </div>
                </section>
            </section>
        </>
    );
}