export default function NovoCliente() {
    return (
        <>
            <section className="fundoEntrada">
                <section className="telaLogin">
                    <h1>Novo cliente</h1>
                    <p>
                        <input placeholder="Informe seu Nome Completo" type="text"/>
                    </p>
                    <p>
                        <input placeholder="Informe seu CPF" type="number"/>
                    </p>
                    <p>
                        <input placeholder="Informe seu E-mail" type="email" />
                    </p>
                    <p>
                        <input placeholder="Informe sua Senha" type="password" />
                    </p>
                    <p>
                        <input placeholder="Confirme a Senha" type="password" />
                    </p>

                    <div className="area_botoes">
                        <button className="botao">
                            <span className="material-symbols-outlined iconeBotao">person_add</span> Criar
                        </button>
                    </div>
                </section>
            </section>
        </>
    );
}