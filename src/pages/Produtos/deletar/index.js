import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import './index.css';
 
class DeletarProdutos extends Component {
    constructor(props) {
        super(props);
 
        this.state = {
            produtos: {},
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
 
        fetch(`${process.env.REACT_APP_API_URL}/sistema/produtos/${id}`)
            .then(storage => {
                storage.json().then(storage => {
                    if (storage.error) {
                        this.setState({ erro: storage.error });
                    } else {
                        this.setState({ usuario: storage });
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
                <fieldset>
                    <legend>Deletar Produto</legend>
                    <div className="produtos-delete">
                        <label htmlFor="nome">{this.state.produtos.nome} </label>
                        <p>Tem certeza que deseja deletar este registro?</p>
 
                        <button
                            onClick={this.handleClick}
                        >
                            Remover
                        </button>
                        <br /><br />
                        <Link to={`/produtos`}>Voltar</Link>
                    </div>
                </fieldset>
            );
        }
    }
 
    handleClick = event => {
        const { id } = this.props.match.params;
 
        fetch(`${process.env.REACT_APP_API_URL}/sistema/produtos/${id}`, {
            method: "delete"
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
 
export default DeletarProdutos;