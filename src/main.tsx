import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import Login from './pages/Login.tsx'
import Signup from './pages/Signup.tsx'
import NotFoundPage from './pages/NotFoundPage.tsx'
import Dashboard from './pages/Dashboard.tsx'
import pb, { isUserValid } from './lib/pocketbase.tsx'
import EditData from './components/EditData.tsx'


const router = createBrowserRouter([
  {
    path:'/',
    element: isUserValid ? <Navigate to={`/dashboard/${pb.authStore.record?.id}`} /> : <Navigate to='/login' />,
    errorElement: <NotFoundPage/>
  },
  {
    path:'/login',
    element: <Login />
  },
  {
    path:'/signup',
    element: <Signup />
  },
  {
    path:'/dashboard/:id',
    element: <Dashboard />,
    
  },
  {
    path:'/dashboard/:id/:dataId',
    element: <EditData/>,
    
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
    
  </StrictMode>,
)
