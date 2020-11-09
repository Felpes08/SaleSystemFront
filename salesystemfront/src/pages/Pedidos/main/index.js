import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
 
export default class MainPedidos extends Component {
    constructor(props) {
        super(props);
 
        this.state = {
            pedidos: [],
            erro: null
        };
    }
 
    componentDidMount() {
        fetch(`http://localhost:3003/sistema/pedidos`)
            .then(pedidos =>
                pedidos.json().then(pedidos => this.setState({ pedidos }))
            )
            .catch(erro => this.setState({ erro }));
    }
 
    render() {
        const { pedidos } = this.state;
 
        return (
            <div className="pedidos-list">
                <Link to={`/criarPedidos`}> <button type="button" class="btn btn-success">Novo</button> </Link>
                <br /><br />
 
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Cliente</th>
                            <th scope="col">Endereço</th>
                            <th scope="col">E-mail</th>
                            <th scope="col">Telefone</th>
                            <th scope="col">Produto</th>
                            <th scope="col">Valor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pedidos.map((pedidos, index) => (
                            <tr>
                                <th scope="row">{pedidos.id}</th>
                                <td>{pedidos.cliente}</td>
                                <td>{pedidos.endereço}</td>
                                <td>{pedidos.email}</td>
                                <td>{pedidos.telefone}</td>
                                <td>{pedidos.produto}</td>
                                <td>{pedidos.valor}</td>
                                <td> <Link to={`/usuarios/${pedidos.id}`}> <button type="button" class="btn btn-primary">Detalhes</button> </Link> </td>
                                <td> <Link to={`/editarPedidos/${pedidos.id}`}> <button type="button" class="btn btn-warning">Atualizar</button> </Link></td>
                                <td> <Link to={`/deletarPedidos/${pedidos.id}`}> <button type="button" class="btn btn-danger">Excluir</button> </Link></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }
}
