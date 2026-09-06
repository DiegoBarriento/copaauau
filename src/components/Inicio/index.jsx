import { useEffect, useState } from "react";
import Carregando from "../Carregando";
import { NavLink, Outlet } from "react-router-dom";

export default function Inicio() {
    
    const [cliente, setCliente] = useState(null);
    const [primeiroNome, setPrimeiroNome] = useState(null);
    const [carregando, setCarregando] =useState(true);

    useEffect(()=>{
        let cliente = JSON.parse(localStorage.getItem('cliente'));
        let nomeCompleto = cliente.Nome;
        let partesNome = nomeCompleto.split(' ');
        setPrimeiroNome(partesNome[0]);
        setCliente(cliente);
        setCarregando(false);
    }, []);
    
    if (carregando) {
        return <Carregando/>;
    }

    return (
        <>
            <header>
                <div>
                    <div>Olá {primeiroNome}</div>
                    <div className="areaBotoesMenu">
                        <button><span className="material-symbols-outlined">lock</span></button>
                        <button><span className="material-symbols-outlined">logout</span></button>
                    </div>
                </div>
                <nav>
                    <NavLink to="/inicio" end>Meu Álbum</NavLink>
                    <NavLink to="/inicio/repetidas">Figurinhas Repetidas</NavLink>
                </nav>
            </header>
            <main>
                <Outlet/>
            </main>
        </>

    );
}