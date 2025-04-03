// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import App from './App.jsx'
// import './index.css'
// import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// import CreateTrip from './create-trip/index.jsx'
// import Header from "./components/custom/Header.jsx"
// import ViewTrip from './view-trip/[tripId]/index.jsx'
// import { Toaster } from 'sonner';
// import MyTrips from './my-trips/index.jsx';
// import { GoogleOAuthProvider } from '@react-oauth/google';

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <App />
//   },
//   {
//     path: '/create-trip',
//     element: <CreateTrip />
//   },
//   {
//     path: '/view-trip/:tripId',
//     element: <ViewTrip />
//   },
//   {
//     path: '/my-trips',
//     element: <MyTrips />
//   },

// ])

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
//     <Header />
//     <Toaster />
//     <RouterProvider router={router} />
//     </GoogleOAuthProvider>
//   </StrictMode>,
// )
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import CreateTrip from './create-trip/index.jsx';
import Header from "./components/custom/Header.jsx";
import ViewTrip from './view-trip/[tripId]/index.jsx';
import { Toaster } from 'sonner';
import MyTrips from './my-trips/index.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';

// Create a layout component that includes Header
const Layout = ({ children }) => (
  <>
    <Header />
    {children}
  </>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout><App /></Layout>
  },
  {
    path: '/create-trip',
    element: <Layout><CreateTrip /></Layout>
  },
  {
    path: '/view-trip/:tripId',
    element: <Layout><ViewTrip /></Layout>
  },
  {
    path: '/my-trips',
    element: <Layout><MyTrips /></Layout>
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="851180519784-ohvo3t8n69hogskdl9k4imhus4epbgl8.apps.googleusercontent.com">
      <Toaster />
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </StrictMode>
);