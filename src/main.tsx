import React from 'react'
import './main.css'
import type { Router as RemixRouter } from '@remix-run/router'
import ReactDOM from 'react-dom/client'
import { RouteObject, RouterProvider, createBrowserRouter } from 'react-router-dom'
import { loginRoutes } from './modules/login/routes'

const mainRoutes: RouteObject[] = [
  {path: '/', 
  element: <div>Principal</div>,
  errorElement: <div>Pagina 404</div>},
]

const router:RemixRouter = createBrowserRouter([...mainRoutes, ...loginRoutes])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
