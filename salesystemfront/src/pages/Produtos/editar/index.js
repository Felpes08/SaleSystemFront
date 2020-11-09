import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import './index.css';
 
class EditarProdutos extends Component {
    constructor(props) {
        super(props);
 
        this.state = {
            produtos: {
                nome: "",
                salePrice: "",
                costPrice: "",
                storage: "",
                ativo: ""
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
 
    componentDidMount() {
        const { id } = this.props.match.params;
 
        fetch(`http://localhost:3003/sistema/produtos/${id}`)
            .then(storage => {
                storage.json().then(storage => {
                    if (storage.error) {
                        this.setState({ erro: storage.error });
                    } else {
                        this.setState({ produtos: storage });
                    }
                });
            })
            .catch(erro => this.setState({ erro: erro }));
    }
 
    render() {
        const { redirect } = this.state;
 
        if (redirect) {
            return <Redirect to="/produtos" />;
        } else {
            return (
                <form onSubmit={this.handleSubmit}>
                    <fieldset>
                        <legend>Criar Produto</legend>
                        <div className="produtos-update">
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
                        <div className="produtos-update">
                            <label htmlFor="costPrice">Preço de Custo </label>
                            <br />
                            <input
                                type="text"
                                id="costPrice"
                                name="costPrice"
                                placeholder="costPrice"
                                min="1"
                                max="10"
                                required
                                value={this.state.produtos.costPrice}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="produtos-update">
                            <label htmlFor="salePrice">Preço de Venda </label>
                            <br />
                            <input
                                type="salePrice"
                                id="salePrice"
                                name="salePrice"
                                placeholder="salePrice"
                                required
                                value={this.state.produtos.salePrice}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="produtos-update">
                            <label htmlFor="storage">Estoque </label>
                            <br />
                            <input
                                type="text"
                                id="storage"
                                name="storage"
                                placeholder="storage"
                                min="1"
                                max="15"
                                required
                                value={this.state.produtos.storage}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Editar
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
    };
 
    handleSubmit = event => {
        const { id } = this.state.produtos;
 
        fetch(`http://localhost:3003/sistema/produtos/${id}`, {
            method: "put",
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
 
export default EditarProdutos;