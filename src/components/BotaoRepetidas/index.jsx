import axios from "axios";
import { useEffect, useState } from "react";


export default function BotaoRepetidas(props) {
    const { figurinha} = props;
    const [qtdRepetida, setQtdRepetida] = useState(figurinha.QtdRepetidas);
    // teste use effect((AI)=>{
    //     setQtdRepetida(figurinha.QtdRepetidas);
    // }, [figurinha.QtdRepetidas]);
    function atualizarNoServidor(novaQuantidade) {
        axios.post("http://localhost/copaauau/api/atualizarquantidade.php", 
        {
            /* conteudo do corpo JSON da requisicão */
            "codigo": figurinha.Codigo,
            "quantidade": novaQuantidade
        },
        {
            withCredentials: true,
        }
        ).then(function (resposta) {
        if (resposta.status === 200 && resposta.data) {
            console.log(resposta.data);
            // A resposta veio SEM erros
            console.log('Quantidade atualizada com sucesso!');
        } 
        })
        .catch(function (error) {
        console.warn(error);
        // O que fazer se der erro na requisição
        })
        .finally(function () {
        // O que fazer independente de ter dado erro ou não
        });
    }

    function diminuirQuantidade(){
        if(qtdRepetida <= 0){
            return;
        } 
        const novaQuantidade = qtdRepetida - 1;
        setQtdRepetida(novaQuantidade);
        atualizarNoServidor(novaQuantidade);
        console.log('Qtd Repetida: ' + novaQuantidade);
    }
    
    function aumentarQuantidade(){
        const novaQuantidade = qtdRepetida + 1;
        setQtdRepetida(novaQuantidade);
        atualizarNoServidor(novaQuantidade);
        console.log('Qtd Repetida: ' + novaQuantidade);
    }

    return (
        <section className="figurinhaRep">
                <p className="numero">{figurinha.Codigo}</p>
                <div>
                    <span className="qtdAtual">{qtdRepetida}</span>
                    <div className="areaBotoesQuantidade">
                        <button onClick={diminuirQuantidade}>-</button>
                        <button onClick={aumentarQuantidade}>+</button>
                    </div>
                </div>
                <p className="nome">{figurinha.Nome}</p>
        </section>
    )

}