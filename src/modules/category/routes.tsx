import { RouteObject } from "react-router-dom";
import CategoryInsert from "./screens/CategoryInsert";
import Category from ".";

export enum CategoryRoutesEnum{
    CATEGORY = '/category',
    CATEGORY_INSERT = '/category/INSERT',
}

export const categoryRoutes: RouteObject[] = [
    {
        path: CategoryRoutesEnum.CATEGORY, 
        element:<Category />
    },
    {
        path: CategoryRoutesEnum.CATEGORY_INSERT, 
        element:<CategoryInsert />
    },
]