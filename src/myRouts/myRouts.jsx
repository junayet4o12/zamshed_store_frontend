import { createBrowserRouter } from 'react-router-dom'
import Home from '../Pages/Home/Home';
import MainLayout from '../MainLayout/MainLayout';
import AddProduct from '../Pages/AddProduct/AddProduct';
import UpdateProduct from '../Pages/UpdateProduct/UpdateProduct';
import Gallery from '../Pages/Gallery/Gallery';

export const myRouts = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/gallery',
                element: <Gallery />
            },
            {
                path: '/addProduct',
                element: <AddProduct />
            },
            {
                path: '/updateProduct',
                element: <UpdateProduct />
            }
        ]
    },
]);