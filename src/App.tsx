import { useEffect } from 'react'
import type { Router as RemixRouter } from '@remix-run/router'
import { RouteObject, createBrowserRouter, RouterProvider, useNavigate } from 'react-router-dom'

import { loginRoutes } from './modules/login/routes'
import { useNotification } from './shared/hooks/useNotification'
import { firstScreenRoutes } from './modules/firstScreen/routes'

import { useGlobalContext } from './shared/hooks/useGlobalContext'
import { verifyLoggedIn } from './shared/functions/connections/auth'
import { productRoutes } from './modules/product/routes'
import { useRequests } from './shared/hooks/useRequests'
import { URL_USER } from './shared/constants/urls'
import { MethodsEnum } from './shared/enums/methods.enum'



const routes: RouteObject[] = [...loginRoutes]
const routesLoggedIn: RouteObject[] = [...productRoutes, ...firstScreenRoutes].map((route) => ({
  ...route,
  loader: verifyLoggedIn,
}));

const router:RemixRouter = createBrowserRouter([...routes, ...routesLoggedIn])

function App() {
  const { contextHolder } = useNotification();
  const { setUser } = useGlobalContext();
  const { request } = useRequests();

  useEffect(()=>{
    request(URL_USER, MethodsEnum.GET, setUser)
  },[])

  return (
    <>
      {contextHolder}
      <RouterProvider router={router}/>
    </>
  )
}

export default App
