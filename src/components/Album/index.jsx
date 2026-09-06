import axios from "axios";
import { useEffect, useState } from "react";
import Progresso from "../Progresso";
import { useNavigate } from "react-router-dom";
import BotaoFigurinha from "../BotaoFigurinha";
import BarraFiltro from "../BarraFiltro";
import Carregando from "../Carregando";

export default function Album() {

    const [qtdTotal, setQtdTotal] = useState(null);
    const [qtdAtual, setQtdAtual] = useState(null);
    const [figurinhas, setFigurinhas] = useState([]);
    const [figurinhasExibir, setFigurinhasExibir] = useState([]);

    const [timeSelecionado, setTimeSelecionado] = useState(-1);

    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost/copaauau/api/buscarAlbum.php", {
            withCredentials: true,
        })
            .then(function (resposta) {
                if (resposta.status === 200 && resposta.data) {
                    if ('mensagem' in resposta.data) {
                        navigate('/');
                    } else {
                        console.log(resposta.data);
                        setFigurinhas(resposta.data.album.Figurinhas);
                        setQtdTotal(resposta.data.album.QtdTotal);
                        setQtdAtual(resposta.data.album.QtdAtual);
                    }
                }
            })
            .catch(function (error) {
                console.warn(error);
                // O que fazer se der erro na requisição
            })
            .finally(function () {
            });
    }, []);

    useEffect(()=>{
        if (Number(timeSelecionado) === -1) {
            setFigurinhasExibir(figurinhas);
        } else {
            const figurinhasSelecionadas = figurinhas.filter(
                (item)=> item.Time.Codigo === Number(timeSelecionado)
            );
            setFigurinhasExibir(figurinhasSelecionadas);
        }
    }, [figurinhas, timeSelecionado]);

    return (
        <>
        <h1 className="tituloPagina">Meu Álbum</h1>
        <Progresso atual={qtdAtual} total={qtdTotal}/>
        
        <BarraFiltro timeSelecionado={timeSelecionado} setTimeSelecionado={setTimeSelecionado}/>
        
        <section className="areaFigurinhas">
            {
                figurinhasExibir.length > 0 ? (
                    figurinhasExibir.map((item, indice)=>(
                        <BotaoFigurinha 
                            key={indice} 
                            figurinha={item}
                            setFigurinhas={setFigurinhas}
                            setqtdAtual={setQtdAtual}
                        />
                    ))
                ) : null
            }
        </section>
        </>
    );
}