import React from "react";

function Landing() {
  return (
    <div className="page-landing">
      <div className="container">
        <header>
          <div className="location animate-up">
            <strong>Santos</strong>
            <p>São Paulo</p>
          </div>
        </header>
        <main>
          <h1 className="animate-up">Compre o Melhor armamento do mundo</h1>
          <div className="visit">
            <p class="animate-up">
              Visite nossa loja, temos os melhores preços
            </p>
            <div>
                <div className="buttons">
                <a href="/usuarios" className="animate-up">
                    Clientes
                </a>
                <a href="produtos" className="animate-up">
                    Produtos
                </a>
                <a href="/pedidos" className="animate-up">
                    Pedidos
                </a>
                </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Landing;
