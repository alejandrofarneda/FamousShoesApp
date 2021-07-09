import { useSelector } from 'react-redux';

export default function Home() {
    const name = useSelector((s) => s.user?.info?.name);

    return (
        <div className="home">
            <div className="welcome">Bienvenido {name}</div>
            <br />
            <div>Selecciona una opción del panel a la izquierda</div>
        </div>
    );
}
