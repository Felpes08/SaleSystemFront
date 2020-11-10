import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './index.css';
 
export default class Produtos extends Component {
    state = {
        produto: {},
    };
 
    componentDidMount() {
        const { id } = this.props.match.params;
 
        fetch(`${process.env.REACT_APP_API_URL}/sistema/produtos/${id}`)
            .then(produto =>
                produto.json().then(produto => this.setState({ produto }))
            )
            .catch(erro => this.setState({ erro }));
    }
 
    render() {
        const { produto } = this.state;
 
        if (produto.ativo) {
            produto.ativo = "produto disponível";
        } else {
            produto.ativo = "Produto indisponível";
        }
 
        return (
            <div className="produtos-info">
                <h1> {produto.nome} </h1>
                <h1> {produto.ativo} </h1>
                <h1> {produto.costPrice} </h1>
                <h1> {produto.salePrice} </h1>
                <br />
                <Link to={`/produtos`}> Voltar </Link> <br />
                <Link to={`/editarProdutos/${produto.id}`}> Editar </Link> <br />
                <Link to={`/deletarProdutos/${produto.id}`}> Deletar </Link> <br />
            </div >
        );
    }
}