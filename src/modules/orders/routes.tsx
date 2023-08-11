import { RouteObject } from "react-router-dom";
import Order from ".";

export enum OrderRoutesEnum{
    ORDER = '/order',
  //  CATEGORY_INSERT = '/category/INSERT',
}

export const orderRoutes: RouteObject[] = [
    {
        path: OrderRoutesEnum.ORDER, 
        element:<Order />
    },
    // {
    //     path: CategoryRoutesEnum.CATEGORY_INSERT, 
    //     element:<CategoryInsert />
    // },
]