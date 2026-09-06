export default function RedefinirSenha() {
    return (
        <>
            <section className="fundoEntrada">
                <section className="telaLogin">
                    <h1>Redefinir senha</h1>
                    <p>
                        <input
                            placeholder="Informe a nova senha"
                            type="password"
                        />
                    </p>
                    <p>
                        <input
                            placeholder="Confirme a nova senha"
                            type="password"
                        />
                    </p>

                    <div className="area_botoes">
                        <button className="botao">
                            <span className="material-symbols-outlined iconeBotao">save</span> Salvar
                        </button>
                    </div>
                </section>
            </section>
        </>
    );
}