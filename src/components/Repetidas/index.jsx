import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BarraFiltro from "../BarraFiltro";
import BotaoRepetidas from "../BotaoRepetidas";

export default function Repetidas() {

    const [carregando, setCarregando] = useState(true);
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

    if (carregando) return;

    return (
        <>
            <h1 className="tituloPagina">Figurinhas Repetidas</h1>

            <BarraFiltro timeSelecionado={timeSelecionado} setTimeSelecionado={setTimeSelecionado}/>

            <section className="areaFigurinhas">
                {
                    figurinhasExibir.length > 0 ? (
                        figurinhasExibir.map((item, indice)=>(
                            <BotaoRepetidas 
                                key={indice} 
                                figurinha={item}
                            />
                        ))
                    ) : null
                }
            </section>
        </>
    );
}