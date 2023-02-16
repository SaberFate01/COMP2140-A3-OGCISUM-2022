import React from 'react';
import { ReactDOM } from 'react-dom/client';
import {createBrowserRouter,} from 'react-router-dom';
import SampleListPage from '../pages/SampleListPage'

//The router
const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <SampleListPage />
        ),
    },
]);

export default router;