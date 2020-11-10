import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import './index.css';
 
class DeletarPedidos extends Component {
    constructor(props) {
        super(props);
 
        this.state = {
            pedidos: {},
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
 
        fetch(`${process.env.REACT_APP_API_URL}sistema/pedidos/${id}`)
            .then(telefone => {
                telefone.json().then(telefone => {
                    if (telefone.error) {
                        this.setState({ erro: telefone.error });
                    } else {
                        this.setState({ pedidos: telefone });
                    }
                });
            })
            .catch(erro => this.setState({ erro: erro }));
    }
 
    render() {
        const { redirect } = this.state;
 
        if (redirect) {
            return <Redirect to="/pedidos" />;
        } else {
            return (
                <fieldset>
                    <legend>Deletar Pedido</legend>
                    <div className="pedidos-delete">
                        <label htmlFor="nome">{this.state.pedidos.nome} </label>
                        <p>Tem certeza que deseja deletar este registro?</p>
 
                        <button
                            onClick={this.handleClick}
                        >
                            Remover
                        </button>
                        <br /><br />
                        <Link to={`/pedidos`}>Voltar</Link>
                    </div>
                </fieldset>
            );
        }
    }
 
    handleClick = event => {
        const { id } = this.props.match.params;
 
        fetch(`${process.env.REACT_APP_API_URL}/sistema/pedidos/${id}`, {
            method: "delete"
        })
            .then(telefone => {
                if (telefone.ok) {
                    this.setState({ redirect: true });
                } else {
                    telefone.json().then(telefone => {
                        if (telefone.error) {
                            this.setState({ erro: telefone.error });
                        }
                    });
                }
            })
            .catch(erro => this.setState({ erro: erro }));
 
        event.preventDefault();
    };
}
 
export default DeletarPedidos;