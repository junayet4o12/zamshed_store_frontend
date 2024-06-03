import { createBrowserRouter } from 'react-router-dom'
import Home from '../Pages/Home/Home';
import MainLayout from '../MainLayout/MainLayout';
import AddProduct from '../Pages/AddProduct/AddProduct';
import UpdateProduct from '../Pages/UpdateProduct/UpdateProduct';
import Gallery from '../Pages/Gallery/Gallery';
import UpdateSingleProduct from '../Pages/UpdateSingleForm/UpdateSingleProduct';
import PrivateRouts from '../PrivateRouts/PrivateRouts';
import LogIn from '../Pages/LogIn/LogIn';
import Register from '../Pages/Register/Register';

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
                path: '/login',
                element: <LogIn />
            },
            {
                path: '/register',
                element: <Register />
            },
            {
                path: '/gallery',
                element: <Gallery />
            },
            {
                path: '/addProduct',
                element: <PrivateRouts><AddProduct /></PrivateRouts>
            },
            {
                path: '/manageProducts',
                element: <UpdateProduct />
            },
            {
                path: '/updateProduct/:name/:id',
                element: <UpdateSingleProduct/>
            },
        ]
    },
]);