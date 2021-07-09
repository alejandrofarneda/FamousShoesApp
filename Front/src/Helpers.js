import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const isLoggedIn = useSelector((s) => !!s.user.info);
    const dispatch = useDispatch();

    if (!isLoggedIn) {
        dispatch({
            type: 'NEW_ERROR',
            error: 'Tienes que acceder para ver esta página',
        });
        return <Redirect to="/landing" />;
    }

    return <>{children}</>;
};
export default PrivateRoute;
