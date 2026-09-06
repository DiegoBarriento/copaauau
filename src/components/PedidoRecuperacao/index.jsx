export default function PedidoRecuperacao() {
    return (
        <>
            <section className="fundoEntrada">
                <section className="telaLogin">
                    <h1>Pedido de recuperação</h1>
                    <p>
                        <input
                            placeholder="Informe seu E-mail"
                            type="email"
                        />
                    </p>
                    <div className="area_botoes">
                        <button className="botao">
                            <span className="material-symbols-outlined iconeBotao">send</span> Enviar pedido de recuperação
                        </button>
                    </div>
                </section>
            </section>
        </>
    );
}