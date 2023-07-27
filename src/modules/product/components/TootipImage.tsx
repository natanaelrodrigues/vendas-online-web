import { ProductType } from "../../../shared/types/ProductType";

interface TootipImageProps{
    product: ProductType
}

const TootipImage = ({product}: TootipImageProps) => {
    return <p>{product.id}</p>
}

export default TootipImage;