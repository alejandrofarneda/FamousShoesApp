import { useState } from 'react/cjs/react.development';
import api from '../api/clients';

export default function UpdateClient({
    clients,
    setClients,
    closeModal,
    id,
    oldName,
    oldEmail,
}) {
    const [name, setName] = useState(oldName);
    const [email, setEmail] = useState(oldEmail);
    const client = { name, email, id };
    const updateClientHandler = async (client) => {
        const response = await api.put(`/clients/${client.id}`, client);
        const { id } = response.data;
        setClients(
            clients.map((client) => {
                return client.id === id ? { ...response.data } : client;
            })
        );
    };
    return (
        <div className="modal-bg" onClick={closeModal}>
            <div className="modal-fg" onClick={(e) => e.stopPropagation()}>
                <div className="login">
                    <h1>Nuevos Datos</h1>
                    <form
                        className="login-form"
                        onSubmit={() => updateClientHandler(client)}
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
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <button className="button-login">
                            Actualizar Cliente
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
