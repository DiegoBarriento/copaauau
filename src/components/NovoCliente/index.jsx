import { useState} from "react";
import {useNavigate} from "react-router-dom";

export default function NovoCliente() {
    const [nome, setNome] = useState("");
    const [cpf, setCpf] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmaSenha, setConfirmaSenha] = useState("");
    const [mensagem, setMensagem] = useState(null);

    const navegador = useNavigate();

    function txtNome_Change(e){
        setNome(e.target.value);
    }

    function txtCpf_Change(e){
        if (!isNaN(e.target.value)){
            setCpf(e.target.value);
        }
    }

    function txtEmail_Change(e){
        setEmail(e.target.value);
    }

    function txtSenha_Change(e){
        setSenha(e.target.value);
    }

    function txtConfirmaSenha_Change(e){
        setConfirmaSenha(e.target.value);
    }

    function validarCPF(cpf) {
        if (/^(\d)\1{10}$/.test(cpf)){
            return false;
        }
        let soma = 0;
        let resto = 0;
        for (let i = 0; i < 9; i++) {
            soma += parseInt(cpf.charAt(i)) * (10 - i);
        }
        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11){
            resto = 0;
        } 
        if (resto !== parseInt(cpf.charAt(9))){
            return false;
        } 

        soma = 0;
        for (let i = 0; i < 10; i++) {
            soma += parseInt(cpf.charAt(i)) * (11 - i);
        }
        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11){
            resto = 0;
        } 
        if (resto !== parseInt(cpf.charAt(10))){
            return false;
        }

        return true;
    }

    function btnCriar_click(){
        setMensagem(null);
        if (nome.trim() === ""){
            setMensagem("O nome deve ser informado.");
            return;
        }

        if (cpf.trim() === ""){
            setMensagem("O CPF deve ser informado.")
            return;
        }
        
        if (cpf.trim().includes('.') || cpf.trim().includes('-') || cpf.trim().includes(',')){
            setMensagem("O cpf não deve conter virgulas, pontos ou traços.");
            return;
        }

        if (cpf.trim().length !== 11){
            setMensagem("O Cpf deve conter 11 digitos.");
            return;
        }

        if (!validarCPF(cpf.trim())){
            setMensagem("O CPF informado é inválido.");
            return;
        }

        if (email.trim() === ""){
            setMensagem("O E-mail deve ser informado.");
            return;
        }

        if(email.trim().includes('@') === false || email.trim().includes('.') === false){
            setMensagem("O E-mail informado é inválido.");
            return;
        }

        if (senha.trim().length < 6){
            setMensagem("A senha deve ter pelo menos 6 caracteres.");
            return;
        }

        if (senha.trim() !== confirmaSenha.trim()){
            setMensagem("A senha e a confirmação de senha não conferem.");
            return;
        }

        let cliente = {
            "nome": nome.trim(),
            "cpf": cpf.trim(),
            "email": email.trim(),
            "senha": senha.trim()
        };

        navegador('/CodigoVerificacao', {state: {status: 'novoCliente', cliente: cliente}})

    }

    
    return (
        <>
            <section className="fundoEntrada">
                <section className="telaLogin">
                    <h1>Novo cliente</h1>
                    {mensagem !== null ? <div className='msg erro'>{mensagem}</div> : null}
                    <p>
                        <input placeholder="Informe seu Nome Completo" type="text" value={nome} onChange={txtNome_Change}/>
                    </p>
                    <p>
                        <input placeholder="Informe seu CPF" type="number" value={cpf} onChange={txtCpf_Change}/>
                    </p>
                    <p>
                        <input placeholder="Informe seu E-mail" type="email" value={email} onChange={txtEmail_Change} />
                    </p>
                    <p>
                        <input placeholder="Informe sua Senha" type="password" value={senha} onChange={txtSenha_Change} />
                    </p>
                    <p>
                        <input placeholder="Confirme a Senha" type="password" value={confirmaSenha} onChange={txtConfirmaSenha_Change} />
                    </p>

                    <div className="area_botoes">
                        <button className="botao" onClick={btnCriar_click}>
                            <span className="material-symbols-outlined iconeBotao">person_add</span> Criar
                        </button>
                    </div>
                </section>
            </section>
        </>
    );
}