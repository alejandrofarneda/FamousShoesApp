import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './Login.css';

function Login({ closeModal }) {
    const history = useHistory();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const dispatch = useDispatch();

    const handleLogin = async (e) => {
        e.preventDefault();

        if (name && email) {
            const data = { name: name, email: email };
            console.log(data);

            dispatch({ type: 'INFO', info: data });

            history.push('/');

            closeModal();
        }
    };

    return (
        <div className="modal-bg" onClick={closeModal}>
            <div className="modal-fg" onClick={(e) => e.stopPropagation()}>
                <div className="login">
                    <h1>Login</h1>
                    <form className="login-form" onSubmit={handleLogin}>
                        <input
                            name="name"
                            placeholder="Nombre"
                            value={name}
                            required
                            onChange={(e) => setName(e.target.value)}
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={email}
                            required
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <button className="button-login">Entrar</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default Login;
