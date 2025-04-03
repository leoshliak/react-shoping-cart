import { Children } from "react";
import App from "./App";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import NotFound from "./pages/NotFound";
import ProductPage from "./pages/ProductPage";
import Error from "./pages/Error";
import About from "./pages/About";

const routes = [
    {
      path: "/",
      element: <App />,
      errorElement: <Error />,
      children: [  
        { index: true, element: <Home /> },
        { path: 'shop', element: <Shop />},
        {path: 'about', element: <About/>},
        { path: 'shop/:productId', element: <ProductPage /> },
        { path: '*', element: <NotFound /> }  
      ]
    }
  ];

export default routes;
