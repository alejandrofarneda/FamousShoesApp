import { useState } from 'react/cjs/react.development';
import { uuid } from 'uuidv4';
import api from '../api/clients';

export default function AddClient({ closeModal, clients, setClients }) {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const client = { name, email };

    const addClientHandler = async (client) => {
        console.log(client);
        const request = {
            id: uuid(),
            ...client,
        };

        const response = await api.post('/clients', request);
        console.log(response);
        setClients([...clients, response.data]);
    };
    return (
        <div className="modal-bg" onClick={closeModal}>
            <div className="modal-fg" onClick={(e) => e.stopPropagation()}>
                <div className="login">
                    <h1>Datos del Cliente</h1>
                    <form
                        className="login-form"
                        onSubmit={() => addClientHandler(client)}
                    >
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
                            maxLength="40"
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <button className="button-login">
                            Agregar Cliente
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
