import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Home } from './Pages/Home'
import UserProfile from './Pages/UserProfile'
import ReservePage from './Pages/ReservePage'

const router = createBrowserRouter([
  { 
    path: '/', 
    element: <Home/>, 
  },
  // Add the userprofile route
  {
    path: '/userprofile',
    element: <UserProfile />,
  },
  {
    path: '/reservepage',
    element: <ReservePage />,
  },
  
  

]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={ router }></RouterProvider>
  </React.StrictMode>,
)
