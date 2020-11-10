import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
 
export default class Main extends Component {
    constructor(props) {
        super(props);
 
        this.state = {
            produtos: [],
            erro: null
        };
    }
 
    componentDidMount() {
        fetch(`http://localhost:3003/sistema/produtos`)
            .then(produtos =>
                produtos.json().then(produtos => this.setState({ produtos }))
            ).then(console.log)
            .catch(erro => this.setState({ erro }));
    }
 
    render() {
        const { produtos } = this.state;
 
        return (
            <div className="produtos-list">
                <Link to={`/criarProdutos`}> <button type="button" class="btn btn-success">Novo</button> </Link>
                <br /><br />
 
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nome</th>
                            <th scope="col">Preço de Custo</th>
                            <th scope="col">Preço de Venda</th>
                            <th scope="col">Estoque</th>
                            <th scope="col">Disponível</th>
                            <th scope="col">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {produtos.map((produtos, index) => (
                            <tr>
                                <th scope="row">{produtos.id}</th>
                                <td>{produtos.nome}</td>
                                <td>{produtos.costPrice}</td>
                                <td>{produtos.salePrice}</td>
                                <td>{produtos.storage}</td>
                                <td>{produtos.ativo ? "Sim" : "Não"}</td>
                                <td> <Link to={`/produtos/${produtos.id}`}> <button type="button" class="btn btn-primary">Detalhes</button> </Link> </td>
                                <td> <Link to={`/editarProdutos/${produtos.id}`}> <button type="button" class="btn btn-warning">Atualizar</button> </Link></td>
                                <td> <Link to={`/deletarProdutos/${produtos.id}`}> <button type="button" class="btn btn-danger">Excluir</button> </Link></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }
}