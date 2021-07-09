import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Clients from './ClientsJsonServer/Clients';
import Products from './ProductsGraphicApollo/Products';
function Dashboard() {
    return (
        <div>
            <Switch>
                <Route path="/workbench/clientes" exact>
                    <Clients />
                </Route>
                <Route path="/workbench/productos" exact>
                    <Products />
                </Route>
            </Switch>
        </div>
    );
}

export default Dashboard;
