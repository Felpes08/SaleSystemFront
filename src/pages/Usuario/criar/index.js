import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import './index.css';
 
class CriarUsuario extends Component {
    constructor(props) {
        super(props);
 
        this.state = {
            usuario: {
                nome: "",
                endereço: "",
                email: "",
                telefone: "",
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
            return <Redirect to="/usuarios" />;
        } else {
            return (
                <form onSubmit={this.handleSubmit}>
                    <fieldset>
                        <legend>Criar Usuário</legend>
                        <div className="usuario-insert">
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
                                value={this.state.usuario.nome}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="usuario-insert">
                            <label htmlFor="endereço">Endereço </label>
                            <br />
                            <input
                                type="text"
                                id="endereço"
                                name="endereço"
                                placeholder="Endereço"
                                minLength="3"
                                maxLength="100"
                                required
                                value={this.state.usuario.endereço}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="usuario-insert">
                            <label htmlFor="email">Email </label>
                            <br />
                            <input
                                type="text"
                                id="email"
                                name="email"
                                placeholder="Email"
                                minLength="3"
                                maxLength="100"
                                required
                                value={this.state.usuario.email}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="usuario-insert">
                            <label htmlFor="telefone">Telefone </label>
                            <br />
                            <input
                                type="text"
                                id="telefone"
                                name="telefone"
                                placeholder="Telefone"
                                minLength="3"
                                maxLength="10"
                                required
                                value={this.state.usuario.telefone}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="usuario-insert">
                            <label>
                                <input
                                    type="radio"
                                    name="ativo"
                                    value="true"
                                    checked={this.state.usuario.ativo === "true"}
                                    onChange={this.handleInputChange}
                                />
                                Ativo
                        </label>
                            <label>
                                <input
                                    type="radio"
                                    value="false"
                                    name="ativo"
                                    checked={this.state.usuario.ativo === "false"}
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
            usuario: { ...prevState.usuario, [name]: value }
        }));
        console.log(value);
    };
 
    handleSubmit = event => {
        fetch(`${process.env.REACT_APP_API_URL}/sistema/usuarios`, {
            method: "post",
            body: JSON.stringify(this.state.usuario),
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
 
export default CriarUsuario;
