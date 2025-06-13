import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children }) => {
  // const { user } = useAuthContext();
  
  // if (user) {
  //   // return <Navigate to="/dashboard" replace />;
  // }
  
  return children;
};

export default PublicRoute;