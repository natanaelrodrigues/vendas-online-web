import type { Router as RemixRouter } from '@remix-run/router'
import { RouteObject, createBrowserRouter, RouterProvider } from 'react-router-dom'

import { loginRoutes } from './modules/login/routes'
import { useNotification } from './shared/hooks/useNotification'
import { firstScreenRoutes } from './modules/firstScreen/routes'
import { productRoutes } from './modules/product/routes'


const router:RemixRouter = createBrowserRouter([...firstScreenRoutes, ...loginRoutes, ...productRoutes])

function App() {
  const { contextHolder } = useNotification();
  return (
    <>
      {contextHolder}
      <RouterProvider router={router}/>
    </>
  )
}

export default App
