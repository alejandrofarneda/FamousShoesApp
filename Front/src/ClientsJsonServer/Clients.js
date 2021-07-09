import api from '../api/clients';
import { useEffect, useState } from 'react';
import ClientsTable from './ClientsTable';
import AddClient from './AddClient';

export default function Clients() {
    const [clients, setClients] = useState([]);
    const [showAddClientModal, setShowAddClientModal] = useState(false);

    const getClients = async () => {
        const response = await api.get('/clients');
        return response.data;
    };

    useEffect(() => {
        const getAllClients = async () => {
            const allClients = await getClients();
            if (allClients) {
                setClients(allClients);
            }
        };
        getAllClients();
    }, []);

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ textAlign: 'center' }}>CONTROL DE CLIENTES</h3>
            {showAddClientModal && (
                <AddClient
                    closeModal={() => setShowAddClientModal(false)}
                    clients={clients}
                    setClients={setClients}
                />
            )}

            <ClientsTable clients={clients} setClients={setClients} />
            <div
                className="add-client-button"
                onClick={() => setShowAddClientModal(true)}
                style={{ cursor: 'pointer' }}
            >
                Agregar Cliente
            </div>
        </div>
    );
}
