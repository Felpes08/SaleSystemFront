import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
 
import MainUsuario from './pages/Usuario/main';
import DetalhesUsuario from './pages/Usuario/detalhes';
import CriarUsuario from './pages/Usuario/criar';
import EditarUsuario from './pages/Usuario/editar';
import DeletarUsuario from './pages/Usuario/deletar';

import MainProdutos from './pages/Produtos/main';
import DetalhesProdutos from './pages/Produtos/detalhes';
import CriarProdutos from './pages/Produtos/criar';
import EditarProdutos from './pages/Produtos/editar';
import DeletarProdutos from './pages/Produtos/deletar';

import MainPedidos from './pages/Pedidos/main'
import DetalhesPedidos from './pages/Pedidos/detalhes';
import CriarPedidos from './pages/Pedidos/criar';
import EditarPedidos from './pages/Pedidos/editar';
import DeletarPedidos from './pages/Pedidos/deletar';
import Landing from './pages/Landing'

const Routes = () => (
 
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/usuarios" component={MainUsuario} />
            <Route path="/usuarios/:id" component={DetalhesUsuario} />
            <Route path="/criarUsuario" component={CriarUsuario} />
            <Route path="/editarUsuario/:id" component={EditarUsuario} />
            <Route path="/deletarUsuario/:id" component={DeletarUsuario} />
            
            <Route exact path="/produtos" component={MainProdutos} />
            <Route path="/produtos/:id" component={DetalhesProdutos} />
            <Route path="/criarProdutos" component={CriarProdutos} />
            <Route path="/editarProdutos/:id" component={EditarProdutos} />
            <Route path="/deletarProdutos/:id" component={DeletarProdutos} />

            <Route exact path="/pedidos" component={MainPedidos} />
            <Route path="/pedidos/:id" component={DetalhesPedidos} />
            <Route path="/criarPedidos" component={CriarPedidos} />
            <Route path="/editarPedidos/:id" component={EditarPedidos} />
            <Route path="/deletarPedidos/:id" component={DeletarPedidos} />
        </Switch>
    </BrowserRouter>
)
 
export default Routes;