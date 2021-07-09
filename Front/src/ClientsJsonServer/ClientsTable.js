import { useState } from 'react/cjs/react.development';
import api from '../api/clients';
import UpdateClient from './UpdateClient';
import './ClientsTable.css';

export default function ClientsTable({ clients, setClients }) {
    const [showUpdateModal, setShowUpdateModal] = useState(false);

    const removeClientHandler = async (id) => {
        await api.delete(`/clients/${id}`);
        const newClientList = clients.filter((client) => {
            return client.id !== id;
        });

        setClients(newClientList);
    };

    return (
        <div className="table-container">
            <div className="table-heads">
                <div>Nombre</div>
                <div>Email</div>
                <div>Herramientas</div>
            </div>
            <div className="table-clients-container">
                {clients?.map((client, key) => (
                    <div className="table-clients" key={client.id}>
                        <div className="client-name">{client.name}</div>
                        <div className="client-email">{client.email}</div>
                        <div className="client-tools">
                            <div
                                className="delete-client-button"
                                onClick={() => removeClientHandler(client.id)}
                                title="Eliminar Cliente"
                            />

                            <div
                                className="update-client-button"
                                onClick={() => setShowUpdateModal(true)}
                                style={{ cursor: 'default' }}
                                title="Actualizar datos del cliente"
                            />
                        </div>

                        {showUpdateModal && (
                            <UpdateClient
                                clients={clients}
                                setClients={setClients}
                                closeModal={() => setShowUpdateModal(false)}
                                id={client.id}
                                oldName={client.name}
                                oldEmail={client.email}
                            />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
