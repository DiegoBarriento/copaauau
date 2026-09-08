import { useEffect, useState } from "react";

export default function Progresso(props) {

    const { total, atual } = props;
    const [porcentagem, setPorcentagem] = useState(0);

    useEffect(()=>{
        setPorcentagem((atual*100)/total);
        if(porcentagem === NaN || porcentagem === null){
            setPorcentagem(0);
        }
    }, [total, atual]); 


    return (
        <section className="areaProgresso">
            <div>
                <p>Progresso</p>
                <p className="destaqueProgresso">{atual}/{total}</p>
            </div>
            <progress className="barraProgresso" value={porcentagem} max="100"></progress>
        </section>
    );
}