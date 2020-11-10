import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import './index.css';
 
class CriarProdutos extends Component {
    constructor(props) {
        super(props);
 
        this.state = {
            produtos: {
                nome: "",
                costPrice: "",
                salePrice: "",
                storage: "",
                ativo: "true"
            },
            erro: null,
            redirect: false
        };
    }
 
    exibeErro() {
        const { erro } = this.state;
 
        if (erro) {
            return (
                <div className="alert alert-danger" role="alert">
                    Erro de conexão com o servidor
                </div>
            );
        }
    }
 
    render() {
        const { redirect } = this.state;
        if (redirect) {
            return <Redirect to="/produtos" />;
        } else {
            return (
                <form className="flex" onSubmit={this.handleSubmit}>
                    <fieldset>
                        <legend>Criar Produto</legend>
                        <div className="produtos-insert">
                            <label htmlFor="nome">Nome </label>
                            <br />
                            <input
                                type="text"
                                id="nome"
                                name="nome"
                                placeholder="Nome"
                                minLength="3"
                                maxLength="100"
                                required
                                value={this.state.produtos.nome}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="produtos-insert">
                            <label htmlFor="endereço">Preço de Custo </label>
                            <br />
                            <input
                                type="text"
                                id="costPrice"
                                name="costPrice"
                                placeholder="costPrice"
                                minLength="3"
                                maxLength="15"
                                required
                                value={this.state.produtos.costPrice}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="produtos-insert">
                            <label htmlFor="email">Preço de Venda </label>
                            <br />
                            <input
                                type="text"
                                id="salePrice"
                                name="salePrice"
                                placeholder="salePrice"
                                minLength="3"
                                maxLength="15"
                                required
                                value={this.state.produtos.salePrice}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="produtos-insert">
                            <label htmlFor="email">Estoque </label>
                            <br />
                            <input
                                type="text"
                                id="storage"
                                name="storage"
                                placeholder="Storage"
                                minLength="0"
                                maxLength="10"
                                required
                                value={this.state.produtos.storage}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="produtos-insert">
                            <label>
                                <input
                                    type="radio"
                                    name="ativo"
                                    value="true"
                                    checked={this.state.produtos.ativo === "true"}
                                    onChange={this.handleInputChange}
                                />
                                Ativo
                        </label>
                            <label>
                                <input
                                    type="radio"
                                    value="false"
                                    name="ativo"
                                    checked={this.state.produtos.ativo === "false"}
                                    onChange={this.handleInputChange}
                                />
                                Inativo
                        </label>
                        </div>
 
 
                        <button type="submit" className="btn btn-primary">
                            Cadastrar
                    </button>
                    </fieldset>
                </form>
            );
        }
    }
 
    handleInputChange = event => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
 
        this.setState(prevState => ({
            produtos: { ...prevState.produtos, [name]: value }
        }));
        console.log(value);
    };
 
    handleSubmit = event => {
        fetch(`${process.env.REACT_APP_API_URL}/sistema/produtos`, {
            method: "post",
            body: JSON.stringify(this.state.produtos),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(storage => {
              if (storage.ok) {
                  this.setState({ redirect: true });
              } else {
                  storage.json().then(storage => {
                      if (storage.error) {
                          this.setState({ erro: storage.error });
                      }
                  });
              }
          })
          .catch(erro => this.setState({ erro: erro }));

        event.preventDefault();
    };
}
 
export default CriarProdutos;
