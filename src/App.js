import Signup from "./pages/signup/Signup";
import Login from "./pages/login/Login";
import "./App.css";
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Leftbar from "./components/leftbar/Leftbar";
import Rightbar from "./components/rightbar/Rightbar";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import { useContext } from "react";
import { DarkModeContext } from "./Context/DarkModeContext";
import { AuthContext } from "./Context/AuthContext";
import { PersianContext } from "./Context/PersianContext";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
function App() {

const {currentUser} = useContext(AuthContext);

const {darkMode} = useContext(DarkModeContext)

 const { persian } = useContext(PersianContext);

 const queryClient = new QueryClient()

const Layout = () => {
  return (
    <QueryClientProvider client={queryClient}>
    <div className={`theme-${darkMode?'dark':'light'} ${persian?'persian-font':null}`} dir={persian? 'rtl':'ltr'}>
      <Navbar />
      <div style={{ display: "flex" }}>
        <Leftbar />
        <div style={{flex:'6'}}>
        <Outlet />
        </div>
        <Rightbar />
      </div>
    </div>
</QueryClientProvider>
  );
};

const ProtectedRoute = ({ children }) => {
  if (!currentUser) {
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
