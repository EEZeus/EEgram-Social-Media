import logo from './logo.svg';
import Signup from './pages/signup/Signup'
import Login from './pages/login/Login'
import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/signup",
    element: <Signup/>,
  }
]);


function App() {
  return (
   <RouterProvider router={router}/>
  );
}

export default App;
