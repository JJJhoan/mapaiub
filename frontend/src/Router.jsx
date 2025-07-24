// src/router.jsx
import { createBrowserRouter } from "react-router-dom";
import Login from "./Login";
import App from "./App";
import Registro from "./Registro";
import MapaInteractivo from "./components/PaginaMapa.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/registro",
    element: <Registro />,
  },
  {
    path: "/inicio",
    element: <App />,
  },
  {
    path: "/mapa",
    element: <MapaInteractivo />,
  },
]);

export default router;
