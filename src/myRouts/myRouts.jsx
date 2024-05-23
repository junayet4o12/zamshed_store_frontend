import {createBrowserRouter} from 'react-router-dom'
import Home from '../Pages/Home/Home';

export const myRouts = createBrowserRouter([
    {
        path: "/",
        element: <Home/>,
    },
]);