import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const isLoggedIn = useSelector((s) => !!s.user.info);

    if (!isLoggedIn) {
        return <Redirect to="/landing" />;
    }

    return <>{children}</>;
};
export default PrivateRoute;
