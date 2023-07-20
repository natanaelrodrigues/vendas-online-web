import { useGlobalContext } from "../../../shared/hooks/useGlobalContext"

const Product = () => {
    const { user } = useGlobalContext();

 return <h1>{`Produtos ${user?.name}`}</h1>
}

export default Product