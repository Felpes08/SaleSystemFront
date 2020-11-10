import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default class MainUsuario extends Component {
  constructor(props) {
    super(props);

    this.state = {
      usuario: [],
      erro: null,
    };
  }

  componentDidMount() {
    fetch(`${process.env.REACT_APP_API_URL}/sistema/usuarios`)
      .then((usuario) =>
        usuario.json().then((usuario) => this.setState({ usuario }))
      )
      .catch((erro) => this.setState({ erro }));
  }

  render() {
    const { usuario } = this.state;

    return (
      <div className="usuario-list">
        <Link to={`/criarUsuario`}>
          {" "}
          <button type="button" class="btn btn-success">
            Novo
          </button>{" "}
        </Link>
        <br />
        <br />

        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nome</th>
              <th scope="col">Endereço</th>
              <th scope="col">E-mail</th>
              <th scope="col">Telefone</th>
              <th scope="col">Ativo</th>
              <th scope="col">Ações</th>
            </tr>
          </thead>
          <tbody>
            {usuario.map((usuario, index) => (
              <tr>
                <th scope="row">{usuario.id}</th>
                <td>{usuario.nome}</td>
                <td>{usuario.endereço}</td>
                <td>{usuario.email}</td>
                <td>{usuario.telefone}</td>
                <td>{usuario.ativo ? "Sim" : "Não"}</td>
                <td>
                  {" "}
                  <Link to={`/usuarios/${usuario.id}`}>
                    {" "}
                    <button type="button" class="btn btn-primary">
                      Detalhes
                    </button>{" "}
                  </Link>{" "}
                </td>
                <td>
                  {" "}
                  <Link to={`/editarUsuario/${usuario.id}`}>
                    {" "}
                    <button type="button" class="btn btn-warning">
                      Atualizar
                    </button>{" "}
                  </Link>
                </td>
                <td>
                  {" "}
                  <Link to={`/deletarUsuario/${usuario.id}`}>
                    {" "}
                    <button type="button" class="btn btn-danger">
                      Excluir
                    </button>{" "}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}