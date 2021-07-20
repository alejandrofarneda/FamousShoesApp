import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Clients from './ClientsJsonServer/Clients';
import Products from './ProductsGraphicApollo/Products';
// import ProductsFake from './ProductsGraphicFAKE/ProductsFake';
function Dashboard() {
    return (
        <div>
            <Switch>
                <Route path="/workbench/clientes" exact>
                    <Clients />
                </Route>
                <Route path="/workbench/productos" exact>
                    <Products />
                    {/* <ProductsFake /> */}
                </Route>
            </Switch>
        </div>
    );
}

export default Dashboard;
