import axios from "axios";
import { useState } from "react";
import Carregando from "../Carregando";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [login, setLogin] = useState("");
    const [senha, setSenha] = useState("");

    const [carregando, setCarregando] = useState(false);
    const [mensagem, setMensagem] = useState(null);

    const navegador = useNavigate();

    function txtLogin_Change(e) {
        setLogin(e.target.value);
    }

    function txtSenha_Change(e) {
        setSenha(e.target.value);
    }

    function btnCadastro() {
        navegador('/novoCliente');
    }

    function btnEntrar_Click() {

        setMensagem(null);

        if (login.trim() === "") {
            setMensagem("CPF deve ser informado!");
            return;
        }

        if (senha.trim() === "") {
            setMensagem("Senha deve ser informada!");
            return;
        }

        setCarregando(true);

        axios.post("http://localhost/copaauau/api/acessar.php",
            {
                "login": login,
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
            })
            .finally(function () {
                setCarregando(false);
            });
    }

    return (
        <>
            {carregando ? <Carregando/> : null}
            {mensagem !== null ? <div className='msg erro'>{mensagem}</div> : null}
            
            <section className="fundoEntrada">
                <section className="telaLogin">
                    <div className="area_logo_sistema">
                        <img alt="Logo do Sistema" src="images/logo.png" />
                    </div>

                    <p>
                        <input
                            placeholder="Informe seu CPF"
                            maxLength="100"
                            type="number"
                            value={login}
                            onChange={txtLogin_Change}
                        />
                    </p>

                    <p>
                        <input
                            placeholder="Informe sua Senha"
                            maxLength="64"
                            type="password"
                            value={senha}
                            onChange={txtSenha_Change}
                        />
                    </p>

                    <div className="area_botoes">
                        <button className="linkBotao" onClick={btnCadastro}>Cadastre-se</button>
                        <button className="linkBotao">Esqueci minha senha</button>
                        <button className="botao" onClick={btnEntrar_Click}>
                            <span className="material-symbols-outlined iconeBotao">login</span> Entrar
                        </button>
                    </div>
                </section>
            </section>
        </>
    );
}