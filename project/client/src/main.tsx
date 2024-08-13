import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import React from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './Error.tsx';
import Providers from './Providers.tsx';
import Contacts from './Contacts.tsx';
import CheckEligibilityForm from './Eligibility.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Contacts />
      },
      {
        path: "/contacts",
        element: <Contacts />
      },
      {
        path: "/providers",
        element: <Providers />
      },
      {
        path: "/eligibility",
        element: <CheckEligibilityForm />
      }
    ]
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CssBaseline />
    <RouterProvider router={router} />
  </React.StrictMode>,
)
