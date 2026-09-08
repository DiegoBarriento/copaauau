import { useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Carregando from "../Carregando";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function RedefinirSenha() {
    const location = useLocation();
    const [carregando, setCarregando] = useState(false);
    const [mensagem, setMensagem] = useState(null);
    const [senha, setSenha] = useState("");
    const [senha2, setSenha2] = useState("");

    const cliente = location.state.cliente;

    const navegador = useNavigate();

    function txtSenha_Change(e) {
        setSenha(e.target.value);
    }

    function txtSenha2_Change(e) {
        setSenha2(e.target.value);
    }

    function btnNovaSenha(){
        setMensagem(null)
        if (senha.trim() === "") {
            setMensagem("Senha deve ser informada!");
            return;
        }

        if (senha2.trim() === "") {
            setMensagem("Senha deve ser informada!");
            return;
        }

        if (senha !== senha2){
            setMensagem("Senhas não correspondem! Tente novamente");
            return;
        }

        setCarregando(true);

        axios.post("http://localhost/copaauau/api/atualisarsenha.php", 
        {
            /* conteudo do corpo JSON da requisicão */
            'cpf':cliente.Cpf,
            'senha':senha
        },
        {
            withCredentials: true,
        }
        ).then(function (resposta) {
        if (resposta.status === 200 && resposta.data) {
            console.log(resposta.data);
            // A resposta veio SEM erros
            setMensagem("Senha atualizada com Sucesso! Redirecionar");
            axios.post("http://localhost/copaauau/api/acessar.php",
            {
                "login": cliente.Cpf,
                "senha": senha
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
            setMensagem("Erro ao atualisar senha! Tente Novamente");
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
                    <h1>Redefinir senha</h1>
                    {carregando ? <Carregando/> : null}
                    {mensagem !== null ? <div>{mensagem}</div> : null}
                    <p>
                        <input
                            placeholder="Informe a nova senha"
                            type="password"
                            value={senha}
                            onChange={txtSenha_Change}
                        />
                    </p>
                    <p>
                        <input
                            placeholder="Confirme a nova senha"
                            type="password"
                            value={senha2}
                            onChange={txtSenha2_Change}
                        />
                    </p>

                    <div className="area_botoes">
                        <button className="botao" onClick={btnNovaSenha}>
                            <span className="material-symbols-outlined iconeBotao">save</span> Salvar
                        </button>
                    </div>
                </section>
            </section>
        </>
    );
}