import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';



export { PrivateRoute };

function PrivateRoute({ children }) {
    const isLoggedIn = useSelector(state => state.user.isLoggedIn);
    
    if (!isLoggedIn) {
        // not logged in so redirect to login page with the return url
        return <Navigate to="/login" />
    }

    // authorized so return child components
    return children;
}