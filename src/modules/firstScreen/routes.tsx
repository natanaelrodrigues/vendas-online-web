import { RouteObject } from "react-router-dom";
import FirstScreen from ".";
import PageNotFound from "./screens/PageNotFound";

export enum FirstScreenEnum {
    FIRST_SCREEN = '/',
}


export const firstScreenRoutes: RouteObject[] = [
    {
        path: FirstScreenEnum.FIRST_SCREEN, 
        element:<FirstScreen/>, 
        errorElement: <PageNotFound />
    }
]