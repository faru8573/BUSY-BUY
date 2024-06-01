import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";
import Cart from "./pages/Cart";
import Purchase from "./pages/Purchase";
import Error from "./pages/Error";
import Auth from "./components/Auth/Auth";
import { useEffect, useState } from "react";

const ProtectedRoute = ({ isAuthorized, children }) => {
  const location = useLocation();
  console.log("location", location);
  return isAuthorized ? (
    children
  ) : (
    <Navigate to="/signin" state={{ from: location }} />
  );
};

const PreventAuthAccess = ({ isAuthorized, children }) => {
  return !isAuthorized ? children : <Navigate to="/" />;
};

function App() {
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const login = localStorage.getItem("loginStatus") || false;
    setIsAuthorized(login);
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Navbar setIsAuthorized={setIsAuthorized} isAuthorized={isAuthorized} />
      ),
      errorElement: <Error />,
      children: [
        { path: "/", element: <Home isAuthorized={isAuthorized} /> },
        {
          path: "cart",
          element: (
            <ProtectedRoute isAuthorized={isAuthorized}>
              <Cart />
            </ProtectedRoute>
          ),
        },
        {
          path: "myorders",
          element: (
            <ProtectedRoute isAuthorized={isAuthorized}>
              <Purchase />
            </ProtectedRoute>
          ),
        },
        {
          path: "signin",
          element: (
            <PreventAuthAccess>
              <Auth setIsAuthorized={setIsAuthorized} />
            </PreventAuthAccess>
          ),
        },
      ],
    },
  ]);
  return (
    <div className="App">
      <Toaster position="top-center" reverseOrder={false} />

      <RouterProvider router={router} />
    </div>
  );
}

export default App;
