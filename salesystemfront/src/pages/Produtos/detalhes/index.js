import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './index.css';
 
export default class Produtos extends Component {
    state = {
        produtos: {},
    };
 
    componentDidMount() {
        const { id } = this.props.match.params;
 
        fetch(`http://localhost:3003/sistema/produtos${id}`)
            .then(produtos =>
                produtos.json().then(produtos => this.setState({ produtos }))
            )
            .catch(erro => this.setState({ erro }));
    }
 
    render() {
        const { produtos, index } = this.state;
 
        if (produtos.ativo) {
            produtos.ativo = "produto disponível";
        } else {
            produtos.ativo = "Produto indisponível";
        }
 
        return (
            <div className="produtos-info">
                <h1> {produtos.nome} </h1>
                <h1> {produtos.ativo} </h1>
                <h1> {produtos.costPrice} </h1>
                <h1> {produtos.salePrice} </h1>
                <br />
                <Link to={`/produtos`}> Voltar </Link> <br />
                <Link to={`/editarProdutos/${produtos.id}`}> Editar </Link> <br />
                <Link to={`/deletarProdutos/${produtos.id}`}> Deletar </Link> <br />
            </div >
        );
    }
}