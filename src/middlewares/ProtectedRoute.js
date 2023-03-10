import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';


export const ProtectDashboard = ({children}) => {
    const auth = useSelector(state => state.store);
    if(auth.isAuth) {
        return children;
    } else {
        return <Navigate to="/login" replace/>
    }

}

export const ProtectAuth = ({children}) => {
    const auth = useSelector(state => state.store);
    if(auth.isAuth) {
        return <Navigate to="/" replace/>
    } else {
        return children;
    }

}