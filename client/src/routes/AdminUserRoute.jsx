import { Navigate } from 'react-router-dom';
// Redux
import { useSelector } from "react-redux";

export const AdminUserRoute = ({ children }) => {
	const userAuth = useSelector((state) => state.userAuth);

  if (userAuth.id == null) {
    return <Navigate to='/login' />
  } else if(userAuth.cargo !== 'Administrador') {
    return <Navigate to='/' />
  }else {
    return children;
  }
}
