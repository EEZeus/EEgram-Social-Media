import Signup from "./pages/signup/Signup";
import Login from "./pages/login/Login";
import "./App.scss";
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import { useContext, useEffect } from "react";
import { DarkModeContext } from "./Context/DarkModeContext";
import { AuthContext } from "./Context/AuthContext";
import { PersianContext } from "./Context/PersianContext";
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import { makeRequest } from "./axios";
import Loading from "./components/loading/Loading";

function App() {

const {currentUser,getUser} = useContext(AuthContext);

const {darkMode} = useContext(DarkModeContext)

 const { persian } = useContext(PersianContext);

 const userId = currentUser.id


const Layout = () => {

  return (
    <div className={`theme-${darkMode?'dark':'light'} ${persian?'persian-font':null}`} dir={persian? 'rtl':'ltr'}>
      <Navbar />
        <div >
        <Outlet />
      </div>
    </div>
  );
};


const ProtectedRoute = ({ children }) => {

  const { isLoading, error, data } = useQuery({
    queryKey: ['auth'],
    queryFn: () => makeRequest.get('/auth?userId='+userId).then(res => res.data),
    retry:1
  });

  if(isLoading){
    return <Loading/>
  }

  if (!isLoading  && error && error.response.status === 401) {
    
    return <Navigate to={"/login"} />;
  }
  return children;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/profile/:id",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);

  return <RouterProvider router={router} />;
}

export default App;
