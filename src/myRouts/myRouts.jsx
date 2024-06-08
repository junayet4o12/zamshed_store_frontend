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
import MyCarts from '../Pages/MyCarts/MyCarts';
import Profile from '../Pages/Profile/Profile';
import AdminRouts from '../AdminRouts/AdminRouts';
import OrderedProduct from '../Pages/OrderedProduct/OrderedProduct';

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
                element: <AdminRouts><AddProduct /></AdminRouts>
            },
            {
                path: '/manageProducts',
                element: <AdminRouts><UpdateProduct /></AdminRouts>
            },
            {
                path: '/updateProduct/:name/:id',
                element: <AdminRouts><UpdateSingleProduct/></AdminRouts>
            },
            {
                path: '/myCarts',
                element: <PrivateRouts><MyCarts/></PrivateRouts>
            },
            {
                path: '/myProfile',
                element: <PrivateRouts><Profile/></PrivateRouts>
            },
            {
                path: '/myOrders',
                element: <PrivateRouts><OrderedProduct/></PrivateRouts>
            },
        ]
    },
]);