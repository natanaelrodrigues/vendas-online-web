import { RouteObject } from "react-router-dom";
import User from "./screens/User";

export enum UserRoutesEnum{
    USER = '/user',
    USER_INSERT = '/user/insert',

}

export const userRoutes: RouteObject[] = [
    {
        path: UserRoutesEnum.USER, 
        element:<User />
    }
    // {
    //     path: ProductRoutesEnum.PRODUCT_INSERT, 
    //     element:<ProductInsert/>
    // },
]