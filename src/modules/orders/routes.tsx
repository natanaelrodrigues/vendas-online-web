import { RouteObject } from "react-router-dom";
import Order from ".";
import OrderDetail from "./screens/OrderDetail";

export enum OrderRoutesEnum{
    ORDER = '/order',
    ORDER_ID = '/order/id',
  //  CATEGORY_INSERT = '/category/INSERT',
}

export const orderRoutes: RouteObject[] = [
    {
        path: OrderRoutesEnum.ORDER, 
        element:<Order />
    },{
        path: OrderRoutesEnum.ORDER_ID, 
        element:<OrderDetail />
    },
    // {
    //     path: CategoryRoutesEnum.CATEGORY_INSERT, 
    //     element:<CategoryInsert />
    // },
]