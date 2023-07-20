import type { Router as RemixRouter } from '@remix-run/router'
import { RouteObject, createBrowserRouter, RouterProvider, useNavigate } from 'react-router-dom'

import { loginRoutes } from './modules/login/routes'
import { useNotification } from './shared/hooks/useNotification'
import { firstScreenRoutes } from './modules/firstScreen/routes'

import { useGlobalContext } from './shared/hooks/useGlobalContext'
import { verifyLoggedIn } from './shared/functions/connections/auth'
import { productRoutes } from './modules/product/routes'



function App() {
  const { contextHolder } = useNotification();
  const { user, setUser } = useGlobalContext();
  
  const routes: RouteObject[] = [...loginRoutes]
  const routesLoggedIn: RouteObject[] = [...productRoutes, ...firstScreenRoutes].map((route) => ({
    ...route,
    loader: () => verifyLoggedIn(setUser, user),
  }));

  const router:RemixRouter = createBrowserRouter([...routes, ...routesLoggedIn])

  return (
    <>
      {contextHolder}
      <RouterProvider router={router}/>
    </>
  )
}

export default App
