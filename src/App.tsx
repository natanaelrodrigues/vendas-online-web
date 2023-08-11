import { useEffect } from 'react'
import type { Router as RemixRouter } from '@remix-run/router'
import { RouteObject, createBrowserRouter, RouterProvider, useNavigate } from 'react-router-dom'

import { loginRoutes } from './modules/login/routes'
import { useNotification } from './shared/hooks/useNotification'
import { firstScreenRoutes } from './modules/firstScreen/routes'
import { getAuthorizationToken, verifyLoggedIn } from './shared/functions/connections/auth'
import { productRoutes } from './modules/product/routes'
import { useRequests } from './shared/hooks/useRequests'
import { URL_USER } from './shared/constants/urls'
import { MethodsEnum } from './shared/enums/methods.enum'
import { categoryRoutes } from './modules/category/screens/routes'
import { useGlobalReducer } from './store/reducers/globalReducer/useGlobalReducer'



const routes: RouteObject[] = [...loginRoutes]
const routesLoggedIn: RouteObject[] = [...productRoutes, ...categoryRoutes, ...firstScreenRoutes].map((route) => ({
  ...route,
  loader: verifyLoggedIn,
}));

const router:RemixRouter = createBrowserRouter([...routes, ...routesLoggedIn])

function App() {
  const { contextHolder } = useNotification();
  const { setUser } = useGlobalReducer();
  const { request } = useRequests();

  useEffect(()=>{
    const token = getAuthorizationToken();
    if(token){
      request(URL_USER, MethodsEnum.GET, setUser)
    }
  },[])

  return (
    <>
      {contextHolder}
      <RouterProvider router={router}/>
    </>
  )
}

export default App
