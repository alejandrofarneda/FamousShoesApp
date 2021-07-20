import './App.css';
import Helmet from 'react-helmet';
import Navbar from './Navbar';
import Home from './Home';
import Dashboard from './Dashboard';
import ErrorMessage from './ErrorMessage';
import { NavLink, Switch, Route } from 'react-router-dom';
import PrivateRoute from './Helpers';
import Landing from './Landing';
import { useSelector } from 'react-redux';

function App() {
    const isLoggedIn = useSelector((s) => !!s.user.info);
    return (
        <div className="App">
            <Helmet>
                <title>Administración</title>
            </Helmet>
            <ErrorMessage />
            <Navbar />
            <PrivateRoute>
                <div className="aside">
                    <NavLink to="/workbench/clientes">CLIENTES</NavLink>
                    <NavLink to="/workbench/productos">PRODUCTOS</NavLink>
                </div>
            </PrivateRoute>
            <main className="main">
                {!isLoggedIn && <Landing />}
                <Switch>
                    <Route path="/workbench">
                        <PrivateRoute>
                            <Dashboard />
                        </PrivateRoute>
                    </Route>

                    <Route path="/">
                        <PrivateRoute>
                            <Home />
                        </PrivateRoute>
                    </Route>
                </Switch>
            </main>
        </div>
    );
}

export default App;
