import axios from "axios";
import { useState } from "react";
import Carregando from "../Carregando";

export default function BotaoFigurinha(props) {

    const { figurinha, setFigurinhas, setqtdAtual } = props;
    const [carregando, setCarregando] = useState(false);

    function btnFigurinha_Click() {
        console.log('Código: ' + figurinha.Codigo);
        console.log('Situação está: ' + figurinha.Possui);
        setCarregando(true);

        axios.put("http://localhost/copaauau/api/alterarSituacaoFigurinha.php",
            {
                "codigoFigurinha": figurinha.Codigo,
                "situacao": figurinha.Possui === 1 ? 0 : 1
            },
            {
                withCredentials: true,
            }
        ).then(function (resposta) {
            if (resposta.status === 200 && resposta.data) {
                console.log(resposta.data);
                setqtdAtual((atual) => atual + (figurinha.Possui == 1 ? -1 : 1));
                setFigurinhas((todas)=>
                    todas.map((item)=> item.Codigo === figurinha.Codigo ? 
                    {...item, Possui: figurinha.Possui === 1 ? 0 :1 } : item
                    )
                );
                // setFigurinhas((todas)=> todas.map((item)=> item.Codigo === figurinha.Codigo ?
                //  {
                //     Codigo: item.Codigo,
                //     Nome: item.Nome, 
                //     Possui: item.Possui === 1 ? 0 :1,
                //     Time: {
                //         Codigo: item.Time.Codigo,
                //         Nome: item.Time.Nome
                //     }
                //  }: item));
            }
        })
            .catch(function (error) {
                console.warn(error);
                // O que fazer se der erro na requisição
            })
            .finally(function () {
                // O que fazer independente de ter dado erro ou não
                setCarregando(false);
            });

    }

    return (
        <>
            {carregando ? <Carregando/> : null}

            <button
                className={`figurinha ${figurinha.Possui ? 'possui' : null}`}
                onClick={btnFigurinha_Click}
            >
                <p className="iconeSituacao">
                    <span className="material-symbols-outlined">
                        {figurinha.Possui ? 'check_circle' : 'close_small'}
                    </span>
                </p>
                <p className="numero">{figurinha.Codigo}</p>
                <p className="nome">{figurinha.Nome}</p>
            </button>
        </>
    );
}