import axios from "axios";
import { useEffect, useState } from "react";

export default function BarraFiltro(props) {

    const { timeSelecionado, setTimeSelecionado } = props;

    const [times, setTimes] = useState([]);

    useEffect(() => {
        axios.get("http://localhost/copaauau/api/listarTimes.php", {
            withCredentials: true,
        })
            .then(function (resposta) {
                if (resposta.status === 200 && resposta.data) {
                    console.log(resposta.data);
                    setTimes(resposta.data.times);
                }
            })
            .catch(function (error) {
                console.warn(error);
                // O que fazer se der erro na requisição
            })
            .finally(function () {
                // O que fazer independente de ter dado erro ou não
            });
    }, []);

    function cmbTime_Change(e) {
        console.log(e.target.value);
        setTimeSelecionado(e.target.value);
    }

    return (
        <section className="areaBarraBusca">
            <select onChange={cmbTime_Change} value={timeSelecionado}>
                <option value="-1">Todos os times</option>
                {
                    times.length > 0 ? (
                        times.map((item, index)=>(<option key={index} value={item.Codigo}>{item.Nome}</option>))
                    ) : null
                }
            </select>
        </section>
    );
}