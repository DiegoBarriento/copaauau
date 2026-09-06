import { useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Carregando from "../Carregando";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function CodigoVerificacao() {
    const location = useLocation();
    const [codigo, setCodigo] = useState("");
    const [carregando, setCarregando] = useState(false);
    const [mensagem, setMensagem] = useState(null);
    const navegador = useNavigate();

    const cliente = location.state?.cliente;
    const status = location.state?.status;
    console.log(cliente.email);
    console.log(status);


    useEffect(() => {
        setCarregando(true);
        axios.post("http://localhost/copaauau/api/enviarCodigo.php",
            {
                'email': cliente.email
            },
            {
                withCredentials: true,
            }
        ).then(function (resposta) {
            // Tratar a resposta
            const codigo = resposta.data.codigo;
            setMensagem('Codigo enviado com Sucesso! Verifique seu e-mail.');
        }).catch(function (erro) {
            // Tratar o erro
            setMensagem("Erro ao enviar o código de verificação. Por favor, tente novamente.");
            console.log(erro);
        }).finally( function () {
            setCarregando(false);
        });
    }, []);


    function txtCodigo_Change(e) {
        setCodigo(e.target.value);
    }

    function btnVerificar_click() {
        setMensagem(null);
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
                            value={codigo}
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