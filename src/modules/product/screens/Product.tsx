import { useEffect } from "react";
import { useDataContext } from "../../../shared/hooks/useDataContext copy";
import { useRequests } from "../../../shared/hooks/useRequests";
import { MethodsEnum } from "../../../shared/enums/methods.enum";
import { ProductType } from "../types/ProductType";
import { URL_PRODUCT } from "../../../shared/constants/urls";

const Product = () => {
    const { products, setProducts } = useDataContext();
    const { request } = useRequests();

    useEffect(()=>{
        request<ProductType[]>(URL_PRODUCT, MethodsEnum.GET, setProducts)
    },[])

 return <h1>{`Produtos ${products.length}`}</h1>
}

export default Product