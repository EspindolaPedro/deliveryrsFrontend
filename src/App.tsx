import { Home } from "./pages/home";
import { Cart } from "./pages/cart";
import { createBrowserRouter } from "react-router-dom"; 
import Layout from "./components/layout";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',  
        element: <Home />
      },
      {
        path: '/carrinho',
        element: <Cart />
      }
    ]
  }
]);

export {router};
