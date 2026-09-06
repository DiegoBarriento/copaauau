export default function CodigoVerificacao() {
    return (
        <>
            <section className="fundoEntrada">
                <section className="telaLogin">
                    <h1>Código de Veriicação</h1>
                    <p>
                        <input
                            placeholder="Informe o código enviado para seu E-mail"
                            type="number"
                        />
                    </p>
                    <div className="area_botoes">
                        <button className="botao">
                            <span className="material-symbols-outlined iconeBotao">key_vertical</span> Verificar
                        </button>
                    </div>
                </section>
            </section>
        </>
    );
}