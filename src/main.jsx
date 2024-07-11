import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import 'swiper/css';
import 'swiper/css/bundle';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/a11y';
import 'react-photo-view/dist/react-photo-view.css';
import {
  RouterProvider,
} from "react-router-dom";
import { myRouts } from './myRouts/myRouts.jsx';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import store from './Redux/store.jsx';
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <Toaster />
      <RouterProvider router={myRouts} />
    </React.StrictMode>
  </Provider>,
)
