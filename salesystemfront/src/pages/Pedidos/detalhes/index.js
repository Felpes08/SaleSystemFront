import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './index.css';
 
export default class DetalhesPedidos extends Component {
    state = {
        pedidos: {},
    };
 
    componentDidMount() {
        const { id } = this.props.match.params;
 
        fetch(`http://localhost:3003/sistema/pedidos/${id}`)
            .then(pedidos =>
                pedidos.json().then(pedidos => this.setState({ pedidos }))
            )
            .catch(erro => this.setState({ erro }));
    }
 
    render() {
        const { pedidos } = this.state;
        return (
            <div className="pedidos-info">
                <h1> {pedidos.cliente} </h1>
                <h1> {pedidos.endereço} </h1>
                <h1> {pedidos.email} </h1>
                <h1> {pedidos.telefone} </h1>
                <h1> {pedidos.produto} </h1>
                <h1> {pedidos.valor} </h1>
                <br />
                <Link to={`/pedidos`}> Voltar </Link> <br />
                <Link to={`/editarPedidos/${pedidos.id}`}> Editar </Link> <br />
                <Link to={`/deletarPedidos/${pedidos.id}`}> Deletar </Link> <br />
            </div >
        );
    }
}
