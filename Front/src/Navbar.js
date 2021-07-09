import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import Login from './Login';

function Navbar() {
    const isLoggedIn = useSelector((s) => !!s.user.info);
    const name = useSelector((s) => s.user?.info?.name);
    const dispatch = useDispatch();
    const history = useHistory();
    const handleLogout = (e) => {
        e.stopPropagation();
        dispatch({
            type: 'LOGOUT',
        });
        history.push('/landing');
    };

    const [showModal, setShowModal] = useState(false);

    return (
        <header className="header">
            {isLoggedIn && (
                <div
                    className="logo"
                    onClick={() => history.push('/')}
                    style={{ cursor: 'default' }}
                    title="Home"
                ></div>
            )}

            <div className="user-area">
                {!isLoggedIn && (
                    <>
                        <div>{name}</div>
                        <div
                            className="log-button"
                            onClick={() => setShowModal(true)}
                            style={{ cursor: 'default' }}
                        >
                            INICIAR SESION
                        </div>
                    </>
                )}
                {isLoggedIn && (
                    <div
                        style={{
                            display: 'flex',
                            gap: 10,
                            alignItems: 'center',
                        }}
                    >
                        <div
                            title={name}
                            style={{
                                display: 'flex',
                                backgroundColor: 'rgb(48, 24, 24)',
                                borderRadius: '50%',
                                width: '2rem',
                                padding: '0.5rem',
                                justifyContent: 'center',
                                textTransform: 'capitalize',
                                cursor: 'default',
                            }}
                        >
                            {name.slice(0, 1)}
                        </div>

                        <div
                            className="log-button"
                            onClick={handleLogout}
                            style={{ cursor: 'default' }}
                        >
                            SALIR
                        </div>
                    </div>
                )}
                {showModal && <Login closeModal={() => setShowModal(false)} />}
            </div>
        </header>
    );
}

export default Navbar;
