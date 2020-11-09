import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import './index.css';
 
class EditarPedidos extends Component {
    constructor(props) {
        super(props);
 
        this.state = {
            pedidos: {
                cliente: "",
                endereço: "",
                email: "",
                telefone: "",
                produto: "",
                valor: ""
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
 
        fetch(`http://localhost:3003/sistema/pedidos/${id}`)
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
                <form onSubmit={this.handleSubmit}>
                    <fieldset>
                        <legend>Criar Cliente</legend>
                        <div className="pedidos-update">
                            <label htmlFor="cliente">Cliente </label>
                            <br />
                            <input
                                type="text"
                                id="cliente"
                                name="cliente"
                                placeholder="Cliente"
                                minLength="3"
                                maxLength="100"
                                required
                                value={this.state.pedidos.cliente}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="pedidos-update">
                            <label htmlFor="endereço">Endereço </label>
                            <br />
                            <input
                                type="text"
                                id="endereço"
                                name="endereço"
                                placeholder="Endereço"
                                min="1"
                                max="99999"
                                required
                                value={this.state.pedidos.endereço}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="pedidos-update">
                            <label htmlFor="email">E-mail </label>
                            <br />
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="e-mail"
                                required
                                value={this.state.pedidos.email}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="pedidos-update">
                            <label htmlFor="telefone">Telefone </label>
                            <br />
                            <input
                                type="text"
                                id="telefone"
                                name="telefone"
                                placeholder="telefone"
                                min="1"
                                max="15"
                                required
                                value={this.state.pedidos.telefone}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="pedidos-update">
                            <label htmlFor="produto">Produto </label>
                            <br />
                            <input
                                type="text"
                                id="produto"
                                name="produto"
                                placeholder="Produto"
                                minLength="3"
                                maxLength="100"
                                required
                                value={this.state.pedidos.produto}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="pedidos-update">
                            <label htmlFor="valor">Valor </label>
                            <br />
                            <input
                                type="text"
                                id="valor"
                                name="valor"
                                placeholder="Valor"
                                minLength="3"
                                maxLength="10"
                                required
                                value={this.state.pedidos.valor}
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
            pedidos: { ...prevState.pedidos, [name]: value }
        }));
    };
 
    handleSubmit = event => {
        const { id } = this.state.pedidos;
 
        fetch(`http://localhost:3003/sistema/pedidos/${id}`, {
            method: "put",
            body: JSON.stringify(this.state.pedidos),
            headers: {
                "Content-Type": "application/json"
            }
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
 
export default EditarPedidos;