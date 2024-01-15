import { Navigate } from 'react-router-dom';
// Redux
import { useSelector } from "react-redux";

export const PrivateUserRoute = ({ children }) => {
	const userAuth = useSelector((state) => state.userAuth);

  if (userAuth.id == null) {
    return <Navigate to='/login' />
  } else {
    return children
  }
}
