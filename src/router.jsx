import { Children } from "react";
import App from "./App";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import NotFound from "./pages/NotFound";
import ProductPage from "./pages/ProductPage";

const routes = [
    {
      path: "/",
      element: <App />,
      children: [  
        { index: true, element: <Home /> },
        { path: 'shop', element: <Shop />},
        { path: 'shop/:productId', element: <ProductPage /> },
        { path: '*', element: <NotFound /> }  
      ]
    }
  ];

export default routes;
